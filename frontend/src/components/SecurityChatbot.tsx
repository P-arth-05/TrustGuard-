import React, { useState } from 'react';
import { MessageCircle, X, Shield, Lock, Eye, AlertTriangle, HelpCircle } from 'lucide-react';

const SecurityChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const securityQuestions = [
    {
      id: 1,
      question: "How do you protect my personal data?",
      answer: "We use industry-standard encryption (AES-256) to protect your data both in transit and at rest. All personal information is stored in secure, SOC 2 compliant data centers with multi-factor authentication and regular security audits.",
      icon: <Shield className="w-4 h-4" />
    },
    {
      id: 2,
      question: "Is my payment information secure?",
      answer: "Yes, we never store your payment information on our servers. All transactions are processed through PCI DSS compliant payment processors like Stripe or PayPal, ensuring your financial data is handled with the highest security standards.",
      icon: <Lock className="w-4 h-4" />
    },
    {
      id: 3,
      question: "Do you share my data with third parties?",
      answer: "We never sell your personal data. We only share information with trusted service providers who help us operate our platform (like hosting providers) and only when necessary. All third parties are bound by strict confidentiality agreements.",
      icon: <Eye className="w-4 h-4" />
    },
    {
      id: 4,
      question: "How often do you update your security measures?",
      answer: "We continuously monitor and update our security measures. Our systems undergo regular security audits, vulnerability assessments, and penetration testing. We also maintain a bug bounty program to identify potential security issues.",
      icon: <AlertTriangle className="w-4 h-4" />
    },
    {
      id: 5,
      question: "What should I do if I suspect a security breach?",
      answer: "If you suspect unauthorized access to your account, immediately change your password and contact our security team at security@company.com. We have a 24/7 incident response team ready to assist with any security concerns.",
      icon: <HelpCircle className="w-4 h-4" />
    },
    {
      id: 6,
      question: "How can I make my account more secure?",
      answer: "Enable two-factor authentication (2FA), use a strong unique password, regularly review your account activity, keep your contact information updated, and never share your login credentials with others.",
      icon: <Lock className="w-4 h-4" />
    }
  ];

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    setShowAnswer(true);
  };

  const handleBackToQuestions = () => {
    setShowAnswer(false);
    setSelectedQuestion(null);
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowAnswer(false);
      setSelectedQuestion(null);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Sphere Button */}
      <div
        onClick={toggleChatbot}
        className={`w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg cursor-pointer flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-110 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <MessageCircle className="w-8 h-8 text-white animate-pulse" />
      </div>

      {/* Chatbot Popup */}
      {isOpen && (
        <div className="absolute bottom-0 right-0 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <h3 className="font-semibold">Security Assistant</h3>
              </div>
              <button
                onClick={toggleChatbot}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm opacity-90 mt-1">
              {showAnswer ? 'Security Answer' : 'How can I help with security questions?'}
            </p>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {!showAnswer ? (
              /* Questions List */
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-4">
                  Click on any question below to get detailed information about our security practices:
                </p>
                {securityQuestions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleQuestionClick(item)}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors border border-gray-100 hover:border-blue-200 group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-blue-500 group-hover:text-blue-600 mt-0.5">
                        {item.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                        {item.question}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              /* Answer Display */
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="text-blue-500 mt-0.5">
                    {selectedQuestion.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-2">
                      {selectedQuestion.question}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {selectedQuestion.answer}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={handleBackToQuestions}
                  className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  ← Back to Questions
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Need more help? Contact our security team at{' '}
              <a href="mailto:security@company.com" className="text-blue-500 hover:underline">
                security@company.com
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityChatbot;