const htmlQuestions = {
  easy: [
    {
      id: 1,
      type: "mcq",
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks Text Language"
      ],
      correctAnswer: "Hyper Text Markup Language"
    },
    {
      id: 2,
      type: "mcq",
      question: "Which tag is used to create a hyperlink?",
      options: ["<a>", "<link>", "<href>", "<url>"],
      correctAnswer: "<a>"
    },
    {
      id: 3,
      type: "mcq",
      question: "Which tag is used to insert an image?",
      options: ["<img>", "<image>", "<pic>", "<src>"],
      correctAnswer: "<img>"
    },
    {
      id: 4,
      type: "mcq",
      question: "Which tag is used for the largest heading?",
      options: ["<h1>", "<h6>", "<head>", "<heading>"],
      correctAnswer: "<h1>"
    },
    {
      id: 5,
      type: "mcq",
      question: "Which attribute provides alternate text for an image?",
      options: ["alt", "src", "title", "href"],
      correctAnswer: "alt"
    }
  ],

  medium: [
    {
      id: 6,
      type: "mcq",
      question: "Which HTML tag defines a client-side image map?",
      options: ["<map>", "<area>", "<img>", "<canvas>"],
      correctAnswer: "<map>"
    },
    {
      id: 7,
      type: "mcq",
      question: "Which attribute makes an input field mandatory?",
      options: ["required", "validate", "placeholder", "autofocus"],
      correctAnswer: "required"
    },
    {
      id: 8,
      type: "mcq",
      question: "Which HTML5 element is used to draw graphics using JavaScript?",
      options: ["<canvas>", "<svg>", "<draw>", "<graphics>"],
      correctAnswer: "<canvas>"
    },
    {
      id: 9,
      type: "written",
      question: "Create an HTML form with name, email, and password fields."
    },
    {
      id: 10,
      type: "written",
      question: "Create a webpage layout using semantic tags."
    }
  ],

  hard: [
    {
      id: 11,
      type: "written",
      question: "Design a registration form using HTML5 validation attributes."
    },
    {
      id: 12,
      type: "written",
      question: "Create a responsive webpage structure using semantic HTML."
    },
    {
      id: 13,
      type: "written",
      question: "Embed audio and video with fallback content in HTML."
    },
    {
      id: 14,
      type: "written",
      question: "Create an HTML table using rowspan and colspan."
    },
    {
      id: 15,
      type: "written",
      question: "Explain and implement HTML accessibility features."
    }
  ]
};

const pythonQuestions = {
  easy: [
    {
      id: 1,
      type: "mcq",
      question: "What is the correct way to create a function in Python?",
      options: ["function myFunc():", "def myFunc():", "create myFunc():", "func myFunc():"],
      correctAnswer: "def myFunc():"
    },
    {
      id: 2,
      type: "mcq",
      question: "Which of the following is the correct way to create a list in Python?",
      options: ["list = (1, 2, 3)", "list = [1, 2, 3]", "list = {1, 2, 3}", "list = <1, 2, 3>"],
      correctAnswer: "list = [1, 2, 3]"
    },
    {
      id: 3,
      type: "mcq",
      question: "What is the output of print(2 ** 3)?",
      options: ["5", "6", "8", "9"],
      correctAnswer: "8"
    },
    {
      id: 4,
      type: "mcq",
      question: "Which keyword is used to import a module in Python?",
      options: ["include", "require", "import", "using"],
      correctAnswer: "import"
    },
    {
      id: 5,
      type: "mcq",
      question: "What data type is the object below? L = [1, 23, 'hello', 1]",
      options: ["tuple", "dictionary", "list", "array"],
      correctAnswer: "list"
    }
  ],

  medium: [
    {
      id: 6,
      type: "mcq",
      question: "What does the len() function do?",
      options: ["Returns the type of object", "Returns the length of object", "Returns the value of object", "Returns the memory address"],
      correctAnswer: "Returns the length of object"
    },
    {
      id: 7,
      type: "mcq",
      question: "Which of the following is used to create an empty dictionary?",
      options: ["{}", "[]", "()", "dict()"],
      correctAnswer: "{}"
    },
    {
      id: 8,
      type: "mcq",
      question: "What is a decorator in Python?",
      options: ["A function that modifies another function", "A design pattern", "A class method", "A variable type"],
      correctAnswer: "A function that modifies another function"
    },
    {
      id: 9,
      type: "written",
      question: "Write a Python function to check if a number is prime."
    },
    {
      id: 10,
      type: "written",
      question: "Create a Python class representing a Car with attributes like make, model, and year."
    }
  ],

  hard: [
    {
      id: 11,
      type: "written",
      question: "Implement a Python function that sorts a list of dictionaries by a specific key."
    },
    {
      id: 12,
      type: "written",
      question: "Create a Python decorator that measures the execution time of a function."
    },
    {
      id: 13,
      type: "written",
      question: "Write a Python script to read a CSV file and process its data."
    },
    {
      id: 14,
      type: "written",
      question: "Implement a context manager in Python for file handling."
    },
    {
      id: 15,
      type: "written",
      question: "Create a Flask API with endpoints for CRUD operations."
    }
  ]
};

const javaQuestions = {
  easy: [
    {
      id: 1,
      type: "mcq",
      question: "What is the correct way to declare a main method in Java?",
      options: ["public static void main(String[] args)", "public void main(String[] args)", "static void main(String[] args)", "public static main(String[] args)"],
      correctAnswer: "public static void main(String[] args)"
    },
    {
      id: 2,
      type: "mcq",
      question: "Which keyword is used to create a class in Java?",
      options: ["class", "Class", "createClass", "new"],
      correctAnswer: "class"
    },
    {
      id: 3,
      type: "mcq",
      question: "What is the size of an int in Java?",
      options: ["16 bits", "32 bits", "64 bits", "8 bits"],
      correctAnswer: "32 bits"
    },
    {
      id: 4,
      type: "mcq",
      question: "Which of the following is NOT a Java primitive type?",
      options: ["int", "String", "boolean", "char"],
      correctAnswer: "String"
    },
    {
      id: 5,
      type: "mcq",
      question: "What is the correct way to create an object in Java?",
      options: ["ClassName obj = new ClassName();", "ClassName obj = create ClassName();", "new ClassName obj;", "ClassName obj = ClassName();"],
      correctAnswer: "ClassName obj = new ClassName();"
    }
  ],

  medium: [
    {
      id: 6,
      type: "mcq",
      question: "What is method overloading in Java?",
      options: ["Having same method name with different parameters", "Having same method name with same parameters", "Having different method names", "Creating a new method"],
      correctAnswer: "Having same method name with different parameters"
    },
    {
      id: 7,
      type: "mcq",
      question: "Which keyword is used for inheritance in Java?",
      options: ["inherits", "extends", "implements", "super"],
      correctAnswer: "extends"
    },
    {
      id: 8,
      type: "mcq",
      question: "What is an interface in Java?",
      options: ["A class with private methods", "A reference type in Java, similar to a class that can contain only constants, method signatures, default methods, static methods, and nested types", "A constructor", "A variable type"],
      correctAnswer: "A reference type in Java, similar to a class that can contain only constants, method signatures, default methods, static methods, and nested types"
    },
    {
      id: 9,
      type: "written",
      question: "Write a Java program to check if a string is a palindrome."
    },
    {
      id: 10,
      type: "written",
      question: "Create a Java class hierarchy for Animals with Dog and Cat subclasses."
    }
  ],

  hard: [
    {
      id: 11,
      type: "written",
      question: "Implement a generic Stack class in Java with push and pop operations."
    },
    {
      id: 12,
      type: "written",
      question: "Create a Spring Boot REST controller with CRUD endpoints."
    },
    {
      id: 13,
      type: "written",
      question: "Implement multithreading in Java using the Runnable interface."
    },
    {
      id: 14,
      type: "written",
      question: "Write a Java program to connect to a MySQL database using JDBC."
    },
    {
      id: 15,
      type: "written",
      question: "Implement a custom exception in Java and use it in a program."
    }
  ]
};

module.exports = { htmlQuestions, pythonQuestions, javaQuestions };
