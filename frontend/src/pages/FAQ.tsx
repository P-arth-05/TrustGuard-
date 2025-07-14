
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ = () => {
  const faqs = [
    {
      question: "How do I place an order?",
      answer: "To place an order, simply browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping information and payment details to complete your purchase."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All payments are processed securely through our encrypted payment system."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-7 business days. Express shipping options are available for 1-2 day delivery. International shipping may take 7-14 business days depending on the destination."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Some restrictions apply to electronics and personal care items. Return shipping is free for defective items."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's website. You can also log into your account to view order status."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 100 countries worldwide. International shipping costs and delivery times vary by destination. Customs fees and duties may apply and are the responsibility of the customer."
    },
    {
      question: "How do I contact customer service?",
      answer: "You can reach our customer service team by phone at 1-800-SHOPWEB, email at support@shopweb.com, or through our live chat feature. We're available Monday-Friday 9AM-6PM EST."
    },
    {
      question: "Can I modify or cancel my order?",
      answer: "Orders can be modified or cancelled within 1 hour of placement. Contact customer service immediately if you need to make changes. Once an order has been shipped, it cannot be cancelled but can be returned."
    },
    {
      question: "Do you have a price matching policy?",
      answer: "Yes, we offer price matching for identical products sold by authorized retailers. The item must be in stock and the price must be current. Contact customer service with the competitor's information."
    },
    {
      question: "How do I create an account?",
      answer: "Click the 'Account' button in the top navigation and select 'Sign Up'. You'll need to provide your email address and create a password. Creating an account allows you to track orders and save your preferences."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we use industry-standard SSL encryption to protect your personal and payment information. We never share your data with third parties without your consent. Read our Privacy Policy for more details."
    },
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes, we offer volume discounts for bulk purchases. Contact our sales team at bulk@shopweb.com with your requirements for a custom quote. Minimum quantities and terms may apply."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onCartClick={() => {}} cartItemCount={0} />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about shopping, shipping, returns, and more. 
              Can't find what you're looking for? Contact our support team.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                    <AccordionTrigger className="text-left hover:text-blue-600 py-4">
                      <span className="font-semibold text-gray-900">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Contact Section */}
            <div className="mt-12 text-center">
              <div className="bg-blue-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Still have questions?
                </h2>
                <p className="text-gray-600 mb-6">
                  Our customer service team is here to help. Get in touch with us and we'll respond as soon as possible.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Contact Support
                  </a>
                  <a
                    href="mailto:support@shopweb.com"
                    className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
