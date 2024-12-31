import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const FAQs = [
  {
    question: "What is VisiARise?",
    answer: "VisiARise is an AR SaaS platform designed to transform customer experiences by merging the digital and physical worlds.",
  },
  {
    question: "What services does VisiARise offer?",
    answer: "VisiARise provides Augmented Reality solutions for visualizing products like furniture, decor, and electronics in your space.",
  },
  {
    question: "How does AR technology benefit customers?",
    answer: "AR enables customers to visualize products in real-world environments before purchasing, enhancing confidence and satisfaction.",
  },
  {
    question: "How can I use the AR feature?",
    answer: "Simply select a product and click on the 'Visualize in AR' option to see how it looks in your home.",
  },
  {
    question: "Is there a mobile app for VisiARise?",
    answer: "Currently, our platform is web-based, but we are exploring mobile solutions in the future.",
  },
  {
    question: "Are there any additional fees?",
    answer: "No, the prices listed include all fees, and you will not encounter any hidden charges.",
  },
  {
      question: "How can I provide feedback?",
      answer: "We appreciate feedback! You can share your thoughts through the contact form or by emailing us.",
  },
  {
      question: "Do you have a newsletter?",
      answer: "Yes, you can subscribe to our newsletter at the bottom of our homepage to stay updated on offers and news.",
  },
];

const FAQsComp = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <section className="py-12 px-6 lg:px-20 bg-black text-white">
        <h2 className="text-3xl lg:text-6xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 max-w-4xl mx-auto">
          {FAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <motion.div
                className="p-6 flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-normal text-white">
                  {faq.question}
                </h3>
                <motion.span
                  className={`transform transition-transform duration-300 ${
                    expandedFAQ === index ? 'rotate-180' : ''
                  }`}
                >
                  &#x25B6; {/* Triangle icon */}
                </motion.span>
              </motion.div>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={
                  expandedFAQ === index
                    ? { height: 'auto', opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-gray-700 text-gray-200">
                  <p>{faq.answer}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default FAQsComp;
