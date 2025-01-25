const http = require("http");
const nlp = require("compromise");

const PORT = 5000;

const questions = [
  { question: "What are AR products?", answer: "AR products are items that you can visualize in augmented reality." },
  { question: "How accurate is the AR visualization?", answer: "AR visualizations are approximately 95% accurate to real-world sizes." },
  { question: "How to visualize a product in AR?", answer: "Add a product to your cart and click 'Visualize in AR'." },
  { question: "Is AR supported on all devices?", answer: "AR is supported on most modern devices with WebXR." },
  { question: "How can I contact support?", answer: "You can contact support via the chatbot or email us at support@arshop.com." },
  { question: "Is there a tutorial for AR?", answer: "Yes, we have video tutorials available under the 'Help' section." },
  { question: "What is augmented reality?", answer: "Augmented reality blends virtual content with the real world, providing interactive experiences." },
  { question: "How do I install the AR application?", answer: "Visit the app store on your device, search for 'ARShop App', and click install." },
  { question: "How do I try a product in AR?", answer: "First, add the product to your cart, then click 'Visualize in AR' from your cart." },
  { question: "Can I visualize multiple products?", answer: "Yes, you can visualize any number of products that are added to your cart." },
  { question: "What is the return policy?", answer: "Our return policy allows you to return products within 30 days if unsatisfied." },
];

// Create a trie data structure for fast prefix matching
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
    this.question = null;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word, question) {
    let node = this.root;
    for (const char of word.toLowerCase()) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
    node.question = question;
  }

  search(prefix) {
    let node = this.root;
    for (const char of prefix.toLowerCase()) {
      if (!node.children[char]) {
        return [];
      }
      node = node.children[char];
    }
    return this.collectWords(node, prefix);
  }

  collectWords(node, prefix) {
    const result = [];
    if (node.isEndOfWord) {
      result.push(node.question);
    }
    for (const char in node.children) {
      result.push(...this.collectWords(node.children[char], prefix + char));
    }
    return result;
  }
}

// Build the trie
const trie = new Trie();
questions.forEach((q) => {
  const words = q.question.split(/\s+/);
  words.forEach((word) => trie.insert(word, q));
});

// Function to generate a response based on user input
function generateResponse(userInput) {
  const doc = nlp(userInput);
  const keywords = doc
    .terms()
    .out("array")
    .filter(
      (term) =>
        term.match(/\w+/) &&
        !term.match(/^(and|the|is|a|to|of|in|for|on|with|as|at|by|this|that|it|are|was|were|be|have|has)$/i)
    );

  if (keywords.length === 0) {
    return {
      question: "I couldn't extract any keywords from your message. Could you please rephrase your question?",
      answer: "I'm here to help, but I need a bit more information. Feel free to ask about our AR products, shopping process, or any specific features you're curious about."
    };
  }

  const relevantQuestions = [];
  keywords.forEach((keyword) => {
    relevantQuestions.push(...trie.search(keyword));
  });

  if (relevantQuestions.length > 0) {
    const uniqueQuestions = Array.from(new Set(relevantQuestions));
    const randomIndex = Math.floor(Math.random() * uniqueQuestions.length);
    const selectedQuestion = uniqueQuestions[randomIndex];

    // Rephrase the answer based on the user's question
    const answer = rephraseAnswer(selectedQuestion.answer, userInput);

    return { question: selectedQuestion.question, answer };
  } else {
    return {
      question: "I'm not sure I fully understand. Could you please provide more details?",
      answer: "While I don't have a specific answer, I'd be happy to help you with information about our AR products, shopping experience, or any other aspect of our service. Feel free to ask about a particular topic you're interested in."
    };
  }
}

// Function to rephrase the answer based on the user's question
function rephraseAnswer(originalAnswer, userInput) {
  const userDoc = nlp(userInput);
  const answerDoc = nlp(originalAnswer);

  const keyVerbs = answerDoc.verbs().out('array');

  // Attempt to incorporate user's phrasing
  let rephrased = originalAnswer;
  userDoc.sentences().forEach((sentence) => {
    const userVerb = sentence.verbs().out('array')[0];
    if (userVerb && !keyVerbs.includes(userVerb)) {
      rephrased = rephrased.replace(/^(You can|We have)/, `You can ${userVerb}`);
    }
  });

  // Add a personalized touch
  rephrased += " Is there anything else you'd like to know about this?";

  return rephrased;
}

// Create the server
const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/get-response") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const userInput = JSON.parse(body).message;

      if (!userInput || typeof userInput !== "string") {
        return res
          .writeHead(400, { "Content-Type": "application/json" })
          .end(JSON.stringify({ responses: [{ question: "Please provide a valid question or message." }] }));
      }

      const response = generateResponse(userInput);
      res
        .writeHead(200, { "Content-Type": "application/json" })
        .end(JSON.stringify({ responses: [response] }));
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" }).end(JSON.stringify({ message: "Not Found" }));
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the generateResponse function
module.exports = { generateResponse };
