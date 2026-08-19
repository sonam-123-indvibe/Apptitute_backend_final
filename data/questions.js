// const htmlQuestions = {
//   easy: [
//     { id: 1, type: "coding", question: "Move All Zeroes to End\nInput: [0,1,0,3,12] -> Output: [1,3,12,0,0]\nWrite a function moveZeroes(arr)." },
//     { id: 2, type: "mcq", question: "What is the output of: console.log(typeof null)?", options: ["null", "undefined", "object", "string"], correctAnswer: "object" },
//     { id: 3, type: "mcq", question: "Which method adds an element at the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], correctAnswer: "push()" },
//     { id: 4, type: "mcq", question: "What does '===' mean in JavaScript?", options: ["Equal value only", "Equal value and type", "Assignment", "Not equal"], correctAnswer: "Equal value and type" },
//     { id: 5, type: "mcq", question: "Which keyword declares a constant in JavaScript?", options: ["var", "let", "const", "static"], correctAnswer: "const" }
//   ],
//   medium: [
//     { id: 6, type: "coding", question: "Valid Parentheses\nInput: \"()[]{}\" -> Output: true\nWrite a function isValid(s)." },
//     { id: 7, type: "coding", question: "Check Almost Sorted Array\nInput: [1,3,2,4,5] -> Output: true\nWrite a function isAlmostSorted(arr)." },
//     { id: 8, type: "coding", question: "Find All Elements Equal\nInput: [5,5,5,5] -> Output: true\nWrite a function allEqual(arr)." },
//     { id: 9, type: "coding", question: "Find First Unsorted Index\nInput: [1,2,6,4,5] -> Output: 2\nWrite a function firstUnsortedIndex(arr)." },
//     { id: 10, type: "coding", question: "Longest Palindromic Substring\nInput: \"babad\" -> Output: \"bab\" or \"aba\"\nWrite a function longestPalindrome(s)." },
//     { id: 11, type: "coding", question: "Word Break Problem\nInput: s = \"leetcode\", wordDict = [\"leet\",\"code\"] -> Output: true\nWrite a function wordBreak(s, wordDict)." },
//     { id: 12, type: "coding", question: "Product of Array Except Self (no division)\nInput: [1,2,3,4] -> Output: [24,12,8,6]\nWrite a function productExceptSelf(nums)." },
//     { id: 13, type: "coding", question: "Two Sum\nInput: nums = [2,7,11,15], target = 9 -> Output: [0,1]\nWrite a function twoSum(nums, target)." },
//     { id: 14, type: "coding", question: "Find Missing Number\nInput: [3,0,1] -> Output: 2\nWrite a function missingNumber(nums)." },
//     { id: 15, type: "coding", question: "Move All Zeroes to End\nInput: [0,1,0,3,12] -> Output: [1,3,12,0,0]\nWrite a function moveZeroes(arr)." },
//     { id: 16, type: "mcq", question: "What does the map() method do in JavaScript?", options: ["Filters array elements", "Creates a new array by applying a function to each element", "Reduces array to a single value", "Sorts the array"], correctAnswer: "Creates a new array by applying a function to each element" },
//     { id: 17, type: "mcq", question: "What is a Promise in JavaScript?", options: ["A loop", "An object representing eventual completion or failure of async operation", "A function", "A variable type"], correctAnswer: "An object representing eventual completion or failure of async operation" },
//     { id: 18, type: "mcq", question: "What is the purpose of useEffect hook in React?", options: ["To manage state", "To perform side effects in functional components", "To create components", "To handle events"], correctAnswer: "To perform side effects in functional components" },
//     { id: 19, type: "written", question: "Write a JavaScript function to reverse a string without using built-in reverse()." },
//     { id: 20, type: "written", question: "Create a React functional component that fetches and displays a list of users from an API." },
//     { id: 21, type: "mcq", question: "What does MERN stand for?", options: ["MongoDB, Express, React, Node", "MySQL, Express, React, Node", "MongoDB, Ember, React, Node", "MongoDB, Express, Redux, Node"], correctAnswer: "MongoDB, Express, React, Node" },
//     { id: 22, type: "mcq", question: "Which HTTP method is used to update a resource in REST API?", options: ["GET", "POST", "PUT", "DELETE"], correctAnswer: "PUT" },
//     { id: 23, type: "mcq", question: "What is the purpose of useState hook in React?", options: ["To fetch data from API", "To manage component state", "To handle routing", "To connect to database"], correctAnswer: "To manage component state" },
//     { id: 24, type: "mcq", question: "Which method in Mongoose is used to find all documents in a collection?", options: ["findAll()", "find()", "getAll()", "fetchAll()"], correctAnswer: "find()" },
//     { id: 25, type: "mcq", question: "What does res.json() do in Express?", options: ["Reads JSON from request", "Parses JSON body", "Sends a JSON response to client", "Connects to MongoDB"], correctAnswer: "Sends a JSON response to client" }
//   ],
//   hard: [
//     { id: 21, type: "written", question: "Implement a debounce function in JavaScript from scratch." },
//     { id: 22, type: "written", question: "Create a Node.js Express REST API with GET and POST routes for a todo list with MongoDB." },
//     { id: 23, type: "written", question: "Write a JavaScript program to implement a deep clone of an object without using JSON methods." },
//     { id: 24, type: "written", question: "Build a React custom hook useLocalStorage that syncs state with localStorage." },
//     { id: 25, type: "written", question: "Implement JWT authentication middleware in Node.js Express." }
//   ]
// };

// const pythonQuestions = {
//   easy: [
//     { id: 1, type: "mcq", question: "What is the correct way to create a function in Python?", options: ["function myFunc():", "def myFunc():", "create myFunc():", "func myFunc():"], correctAnswer: "def myFunc():" },
//     { id: 2, type: "mcq", question: "Which of the following creates a list in Python?", options: ["list = (1, 2, 3)", "list = [1, 2, 3]", "list = {1, 2, 3}", "list = <1, 2, 3>"], correctAnswer: "list = [1, 2, 3]" },
//     { id: 3, type: "mcq", question: "What is the output of print(2 ** 3)?", options: ["5", "6", "8", "9"], correctAnswer: "8" },
//     { id: 4, type: "mcq", question: "Which keyword imports a module in Python?", options: ["include", "require", "import", "using"], correctAnswer: "import" },
//     { id: 5, type: "mcq", question: "What data type is L = [1, 23, 'hello', 1]?", options: ["tuple", "dictionary", "list", "array"], correctAnswer: "list" }
//   ],
//   medium: [
//     { id: 6, type: "coding", question: "Check Almost Sorted Array\nInput: [1,3,2,4,5] -> Output: True\nWrite a function is_almost_sorted(arr)." },
//     { id: 7, type: "coding", question: "Longest Palindromic Substring\nInput: \"babad\" -> Output: \"bab\" or \"aba\"\nWrite a function longest_palindrome(s)." },
//     { id: 8, type: "coding", question: "Print all prime numbers between 1 to 1000.\nWrite a Python function print_primes()." },
//     { id: 9, type: "coding", question: "Print Fibonacci series up to 1000.\nWrite a Python function fibonacci()." },
//     { id: 10, type: "coding", question: "Find the largest palindrome between 100 and 999.\nWrite a Python function largest_palindrome()." },
//     { id: 11, type: "coding", question: "Count vowels, consonants, digits, and special characters.\nInput: \"Hello World! 123\"\nWrite a Python function count_chars(s)." },
//     { id: 12, type: "coding", question: "Find the longest substring without repeating characters.\nInput: \"abcabcbb\" -> Output: 3\nWrite a Python function length_of_longest_substring(s)." },
//     { id: 13, type: "coding", question: "Move All Zeroes to End\nInput: [0,1,0,3,12] -> Output: [1,3,12,0,0]\nWrite a Python function move_zeroes(arr)." },
//     { id: 14, type: "coding", question: "Two Sum\nInput: nums = [2,7,11,15], target = 9 -> Output: [0,1]\nWrite a Python function two_sum(nums, target)." },
//     { id: 15, type: "coding", question: "Find Missing Number\nInput: [3,0,1] -> Output: 2\nWrite a Python function missing_number(nums)." }
//   ],
//   hard: [
//     { id: 16, type: "written", question: "Implement a Python function that sorts a list of dictionaries by a specific key." },
//     { id: 17, type: "written", question: "Create a Python decorator that measures the execution time of a function." },
//     { id: 18, type: "written", question: "Write a Python script to read a CSV file and process its data." },
//     { id: 19, type: "written", question: "Implement a context manager in Python for file handling." },
//     { id: 20, type: "written", question: "Create a Flask API with endpoints for CRUD operations." }
//   ]
// };

// const javaQuestions = {
//   easy: [
//     { id: 1, type: "mcq", question: "What is the correct way to declare a main method in Java?", options: ["public static void main(String[] args)", "public void main(String[] args)", "static void main(String[] args)", "public static main(String[] args)"], correctAnswer: "public static void main(String[] args)" },
//     { id: 2, type: "mcq", question: "Which keyword creates a class in Java?", options: ["class", "Class", "createClass", "new"], correctAnswer: "class" },
//     { id: 3, type: "mcq", question: "What is the size of an int in Java?", options: ["16 bits", "32 bits", "64 bits", "8 bits"], correctAnswer: "32 bits" },
//     { id: 4, type: "mcq", question: "Which is NOT a Java primitive type?", options: ["int", "String", "boolean", "char"], correctAnswer: "String" },
//     { id: 5, type: "mcq", question: "How to create an object in Java?", options: ["ClassName obj = new ClassName();", "ClassName obj = create ClassName();", "new ClassName obj;", "ClassName obj = ClassName();"], correctAnswer: "ClassName obj = new ClassName();" }
//   ],
//   medium: [
//     { id: 6, type: "mcq", question: "What is method overloading in Java?", options: ["Same method name with different parameters", "Same method name with same parameters", "Different method names", "Creating a new method"], correctAnswer: "Same method name with different parameters" },
//     { id: 7, type: "mcq", question: "Which keyword is used for inheritance in Java?", options: ["inherits", "extends", "implements", "super"], correctAnswer: "extends" },
//     { id: 8, type: "mcq", question: "What is an interface in Java?", options: ["A class with private methods", "A reference type with only constants and method signatures", "A constructor", "A variable type"], correctAnswer: "A reference type with only constants and method signatures" },
//     { id: 9, type: "written", question: "Write a Java program to check if a string is a palindrome." },
//     { id: 10, type: "written", question: "Create a Java class hierarchy for Animals with Dog and Cat subclasses." }
//   ],
//   hard: [
//     { id: 11, type: "written", question: "Implement a generic Stack class in Java with push and pop operations." },
//     { id: 12, type: "written", question: "Create a Spring Boot REST controller with CRUD endpoints." },
//     { id: 13, type: "written", question: "Implement multithreading in Java using the Runnable interface." },
//     { id: 14, type: "written", question: "Write a Java program to connect to a MySQL database using JDBC." },
//     { id: 15, type: "written", question: "Implement a custom exception in Java and use it in a program." }
//   ]
// };

// const dataScienceQuestions = {
//   easy: [
//     { id: 1, type: "mcq", question: "What does AI stand for?", options: ["Artificial Intelligence", "Automated Integration", "Advanced Interface", "Automated Intelligence"], correctAnswer: "Artificial Intelligence" },
//     { id: 2, type: "mcq", question: "Which Python library is used for data manipulation?", options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"], correctAnswer: "Pandas" },
//     { id: 3, type: "mcq", question: "What is a DataFrame in Pandas?", options: ["A 1D array", "A 2D labeled data structure", "A dictionary", "A list of lists"], correctAnswer: "A 2D labeled data structure" },
//     { id: 4, type: "mcq", question: "Which library is used for machine learning in Python?", options: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib"], correctAnswer: "Scikit-learn" },
//     { id: 5, type: "mcq", question: "Which is a supervised learning algorithm?", options: ["K-Means", "Linear Regression", "DBSCAN", "PCA"], correctAnswer: "Linear Regression" }
//   ],
//   medium: [
//     { id: 6, type: "mcq", question: "What is overfitting?", options: ["Model performs well on training but poorly on test data", "Model performs poorly on both", "Model performs well on both", "Model has too few parameters"], correctAnswer: "Model performs well on training but poorly on test data" },
//     { id: 7, type: "mcq", question: "What is the purpose of normalization?", options: ["To remove outliers", "To scale features to a similar range", "To fill missing values", "To encode categorical data"], correctAnswer: "To scale features to a similar range" },
//     { id: 8, type: "mcq", question: "Which algorithm is used for classification?", options: ["Linear Regression", "K-Means", "Random Forest", "PCA"], correctAnswer: "Random Forest" },
//     { id: 9, type: "written", question: "Write Python code to load a CSV file using Pandas and display basic statistics." },
//     { id: 10, type: "written", question: "Write Python code to train a Linear Regression model using scikit-learn." }
//   ],
//   hard: [
//     { id: 11, type: "written", question: "Implement a complete data preprocessing pipeline in Python." },
//     { id: 12, type: "written", question: "Build and evaluate a Random Forest classifier on the Iris dataset." },
//     { id: 13, type: "written", question: "Write Python code to implement K-Means clustering and visualize clusters." },
//     { id: 14, type: "written", question: "Explain and implement feature engineering techniques for a real-world dataset." },
//     { id: 15, type: "written", question: "Build a ne y joural network using TensorFlow/Keras for binary classification." }
//   ]
// };

// module.exports = {
//   htmlQuestions,
//   pythonQuestions,
//   javaQuestions,
//   dataScienceQuestions
// };
