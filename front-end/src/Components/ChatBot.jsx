import { useState } from 'react';
import { Transition } from '@headlessui/react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [responses, setResponses] = useState([]);
  const [step, setStep] = useState(0); // Step to track the state of conversation

  const handleSendMessage = async () => {
    if (userMessage.trim()) {
      try {
        const response = await fetch('http://localhost:5000/get-response', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        if (data.responses && data.responses.length > 0) {
          setResponses((prev) => [
            ...prev,
            { question: userMessage, answer: data.responses[0]?.answer || "I couldn't find a response." },
          ]);
        } else {
          // If no responses were found, provide fallback suggestions
          setResponses((prev) => [
            ...prev,
            { question: userMessage, answer: 'I don\'t have your exact answer, but hope these problems solve your doubt:\n1. What are AR products?\n2. How accurate is the AR visualization?\n3. Can I use AR on mobile devices?' },
          ]);
        }
        setUserMessage(''); // Clear input after sending
      } catch (error) {
        console.error('Error fetching response:', error);
        // Provide fallback suggestions even in case of an error
        setResponses((prev) => [
          ...prev,
          { question: userMessage, answer: 'I don\'t have your exact answer, but hope these problems solve your doubt:\n1. What are AR products?\n2. How accurate is the AR visualization?\n3. Can I use AR on mobile devices?' },
        ]);
      }
    }
  };
  

  const handleNameSubmit = () => {
    if (userName.trim()) {
      setResponses([{ question: `Hello ${userName}, how can I assist you today?` }]);
      setStep(1); // Move to the next step after name is provided
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-purple-500 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 neon-icon"
      >
        <span className="text-white text-2xl">&#128172;</span>
      </button>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-500 transform"
        enterFrom="translate-y-5 opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition ease-in duration-500 transform"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="translate-y-5 opacity-0"
      >
        <div className="bg-gradient-to-r from-transparent to-transparent via-purple-500 p-4 rounded-lg shadow-lg w-80 sm:w-96 mt-2 text-left border border-gray-200 neon-border text-black relative h-96 overflow-auto">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-black hover:text-red-400"
          >
            &#10006;
          </button>

          <h2 className="text-lg font-bold mb-4 text-white">VisiARise Support</h2>

          {/* User Name Input */}
          {step === 0 && (
            <div>
              <p className="text-white">What is your name?</p>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
                placeholder="Enter your name..."
              />
              <button onClick={handleNameSubmit} className="w-full bg-blue-500 hover:bg-blue-700 p-2 rounded text-white">
                Submit
              </button>
            </div>
          )}

          {/* User Input for Messages */}
          {step === 1 && (
            <div>
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                className="w-full p-2 mb-2 border border-gray-300 rounded"
                placeholder="Type your question..."
              />
              <button onClick={handleSendMessage} className="w-full bg-blue-500 hover:bg-blue-700 p-2 rounded text-white">
                Send
              </button>
            </div>
          )}

          {/* Display responses */}
          {responses.length > 0 && (
            <div className="mt-4">
              {responses.map((resp, index) => (
                <div key={index} className={`mb-2 p-2 rounded bg-black bg-opacity-50`}>
                  <strong className="text-white">{resp.question}</strong>
                  <p className="text-pink-300">{resp.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Transition>
    </div>
  );
};

export default ChatBot;
