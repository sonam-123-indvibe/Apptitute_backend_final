// const axios = require("axios");
// const User = require("../models/User");
// const TestAttempt = require("../models/TestAttempt");
// const sendEmail = require("../utils/sendEmail");

// const LANGUAGE_IDS = { javascript: 63, python: 71 };

// const executeCode = async (code, languageId) => {
//   const key = process.env.JUDGE0_API_KEY;
//   if (!key || key === "your_rapidapi_key_here") {
//     return { output: "", error: "", status: "Skipped" };
//   }
//   try {
//     const { data } = await axios.post(
//       "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
//       { source_code: code, language_id: languageId, stdin: "" },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "X-RapidAPI-Key": key,
//           "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//         },
//         timeout: 15000,
//       }
//     );
//     return {
//       output: data.stdout || "",
//       error: data.stderr || data.compile_output || "",
//       status: data.status?.description || "Unknown",
//     };
//   } catch {
//     return { output: "", error: "Execution service unavailable", status: "Error" };
//   }
// };

// const callGroq = async (prompt) => {
//   const { data } = await axios.post(
//     "https://api.groq.com/openai/v1/chat/completions",
//     {
//       model: "llama-3.3-70b-versatile",
//       messages: [{ role: "user", content: prompt }],
//       temperature: 0.3,
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       timeout: 30000,
//     }
//   );
//   return data.choices[0].message.content;
// };

// exports.aiEvaluate = async (req, res) => {
//   try {
//     const { userId, answers, stream, level } = req.body;

//     if (!answers || answers.length === 0)
//       return res.status(400).json({ error: "No answers provided" });

//     const langId = stream?.toLowerCase().includes("python")
//       ? LANGUAGE_IDS.python
//       : LANGUAGE_IDS.javascript;

//     const executionResults = await Promise.all(
//       answers.map((a) => executeCode(a.userAnswer || "", langId))
//     );

//     const questionsText = answers
//       .map((a, i) => {
//         const exec = executionResults[i];
//         return `Q${i + 1}: ${a.question}
// User Code:
// \`\`\`
// ${a.userAnswer || "(no answer)"}
// \`\`\`
// Execution Status: ${exec.status}
// Output: ${exec.output || "(none)"}
// Error: ${exec.error || "(none)"}`;
//       })
//       .join("\n\n---\n\n");

//     const prompt = `You are an expert ${stream} technical evaluator (${level} level).
// Evaluate each answer. For each question give:
// - Q<number>: verdict (Correct / Partially Correct / Wrong)
// - Score: X/10 (score out of 10 for that question)
// - Reason: 1-line reason

// At the end give overall average as: TOTAL_SCORE: X/10

// ${questionsText}`;

//     const aiResponse = await callGroq(prompt);

//     const scoreMatch = aiResponse.match(/TOTAL_SCORE:\s*(\d+(\.\d+)?)\s*\/\s*10/i);
//     const aiScore = scoreMatch ? parseFloat(scoreMatch[1]) : 0;

//     // Parse per-question scores
//     const perQuestionScores = answers.map((a, i) => {
//       const qMatch = aiResponse.match(new RegExp(`Q${i + 1}[^\\n]*\\n.*?Score:\\s*(\\d+(?:\\.\\d+)?)\\s*\\/\\s*10`, "is"));
//       return {
//         question: a.question,
//         userAnswer: a.userAnswer || "(no answer)",
//         score: qMatch ? parseFloat(qMatch[1]) : 0,
//       };
//     });

//     const attempt = new TestAttempt({
//       userId,
//       stream,
//       level,
//       answers: answers.map((a) => ({
//         questionText: a.question,
//         userAnswer: a.userAnswer,
//         isCorrect: null,
//         type: "written",
//       })),
//       score: aiScore,
//       status: "evaluated",
//     });
//     await attempt.save();

//     const user = userId ? await User.findById(userId) : null;
//     if (user?.email) {
//       // written marks: aiScore >= 5 = 1, else 0
//       const writtenMarks = perQuestionScores.reduce((sum, q) => sum + (q.score >= 5 ? 1 : 0), 0);
//       await sendEmail(
//         user.email,
//         `${aiScore} / 10`,
//         `Your ${stream} (${level}) written test has been AI-evaluated!`,
//         { userName: user.name, aiFeedback: aiResponse, isAiResult: true, perQuestionScores, totalScore: aiScore }
//       );
//     }

//     return res.status(200).json({
//       score: aiScore,
//       total: 10,
//       feedback: aiResponse,
//       perQuestionScores,
//       message: "Evaluation complete. Result sent to your email.",
//     });
//   } catch (err) {
//     console.error("AI Evaluate Error:", err.response?.data || err.message);
//     res.status(500).json({ error: err.response?.data?.error?.message || err.message });
//   }
// };


const axios = require("axios");
const User = require("../models/User");
const TestAttempt = require("../models/TestAttempt");
const sendEmail = require("../utils/sendEmail");

// ===============================
// GROQ AI CALL
// ===============================
const callGroq = async (prompt) => {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is missing in .env file");
  }

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "openai/gpt-oss-20b",

      messages: [
        {
          role: "system",
          content:
            "You are an expert technical interviewer and evaluator. Evaluate answers fairly and strictly.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.3,
      max_tokens: 2000,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      timeout: 30000,
    }
  );

  const content = response?.data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Empty response received from Groq AI");
  }

  return content;
};

// ===============================
// AI EVALUATE
// ===============================
exports.aiEvaluate = async (req, res) => {
  try {
    const { userId, answers, stream, level } = req.body;

    // ===============================
    // VALIDATION
    // ===============================

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        success: false,
        error: "No answers provided",
      });
    }

    // ===============================
    // QUESTIONS + ANSWERS
    // ===============================

    const questionsText = answers
      .map((a, i) => {
        return `
Q${i + 1}: ${a.question || "Question not available"}

User Answer:
\`\`\`
${a.userAnswer || "(no answer)"}
\`\`\`
`;
      })
      .join("\n---\n");

    // ===============================
    // AI PROMPT
    // ===============================

    const prompt = `
You are an expert ${stream || "technical"} interviewer.

Evaluate the following candidate answers for a ${level || "beginner"} level test.

For every question provide exactly:

Q<number>: Correct / Partially Correct / Wrong
Score: X/10
Reason: one short line explaining the score.

At the end provide:

TOTAL_SCORE: X/10

Rules:
- Give 10/10 only for a fully correct answer.
- Give 5-9 for partially correct answers.
- Give 0-4 for mostly wrong answers.
- Give 0 if there is no answer.
- Do not give negative scores.
- Be fair and consistent.

Questions and answers:

${questionsText}
`;

    // ===============================
    // CALL GROQ
    // ===============================

    const aiResponse = await callGroq(prompt);

    console.log("AI Response:");
    console.log(aiResponse);

    // ===============================
    // OVERALL SCORE
    // ===============================

    const scoreMatch = aiResponse.match(
      /TOTAL_SCORE\s*:\s*(\d+(?:\.\d+)?)\s*\/\s*10/i
    );

    let aiScore = scoreMatch ? parseFloat(scoreMatch[1]) : 0;

    // Make sure score is between 0 and 10
    aiScore = Math.max(0, Math.min(10, aiScore));

    // ===============================
    // PER QUESTION SCORES
    // ===============================

    const perQuestionScores = answers.map((a, i) => {
      const qNumber = i + 1;

      const qMatch = aiResponse.match(
        new RegExp(
          `Q${qNumber}\\s*:\\s*(?:Correct|Partially Correct|Wrong)[\\s\\S]*?Score\\s*:\\s*(\\d+(?:\\.\\d+)?)\\s*\\/\\s*10`,
          "i"
        )
      );

      let score = qMatch ? parseFloat(qMatch[1]) : 0;

      score = Math.max(0, Math.min(10, score));

      return {
        question: a.question || "",
        userAnswer: a.userAnswer || "(no answer)",
        score,
      };
    });

    // ===============================
    // SAVE TEST ATTEMPT
    // ===============================

    const attempt = new TestAttempt({
      userId: userId || null,

      stream: stream || "Technical",

      level: level || "Beginner",

      answers: answers.map((a) => ({
        questionText: a.question || "",
        userAnswer: a.userAnswer || "",
        isCorrect: null,
        type: "written",
      })),

      score: aiScore,

      status: "evaluated",
    });

    await attempt.save();

    // ===============================
    // FIND USER
    // ===============================

    const user = userId ? await User.findById(userId) : null;

    // ===============================
    // SEND EMAIL
    // ===============================

    if (user?.email) {
      const writtenMarks = perQuestionScores.reduce(
        (sum, q) => sum + (q.score >= 5 ? 1 : 0),
        0
      );

      await sendEmail(
        user.email,

        `${aiScore} / 10`,

        `Your ${stream || "Technical"} (${
          level || "Beginner"
        }) written test has been AI-evaluated!`,

        {
          userName: user.name || "Candidate",

          aiFeedback: aiResponse,

          isAiResult: true,

          perQuestionScores,

          totalScore: aiScore,

          writtenMarks,
        }
      );
    }

    // ===============================
    // SUCCESS RESPONSE
    // ===============================

    return res.status(200).json({
      success: true,

      score: aiScore,

      total: 10,

      feedback: aiResponse,

      perQuestionScores,

      message: user?.email
        ? "Evaluation complete. Result sent to your email."
        : "Evaluation complete.",
    });
  } catch (err) {
    console.error("=================================");
    console.error("AI Evaluate Error:");
    console.error(err.response?.data || err.message);
    console.error("=================================");

    return res.status(500).json({
      success: false,

      error:
        err.response?.data?.error?.message ||
        err.message ||
        "AI evaluation failed",
    });
  }
};