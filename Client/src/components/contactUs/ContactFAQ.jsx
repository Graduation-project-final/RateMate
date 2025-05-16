import React, { useState } from "react";

const ContactFAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How can I pay for my appointment?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eum quae. Harum officiis reprehenderit ex quia ducimus minima id provident molestias optio nam vel, quidem iure voluptatem, repellat et ipsa.",
    },
    {
      question: "What can I expect at my first consultation?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eum quae. Harum officiis reprehenderit ex quia ducimus minima id provident molestias optio nam vel, quidem iure voluptatem, repellat et ipsa.",
    },
    {
      question: "What are your opening hours?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eum quae. Harum officiis reprehenderit ex quia ducimus minima id provident molestias optio nam vel, quidem iure voluptatem, repellat et ipsa.",
    },
    {
      question: "Do I need a referral?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eum quae. Harum officiis reprehenderit ex quia ducimus minima id provident molestias optio nam vel, quidem iure voluptatem, repellat et ipsa.",
    },
    {
      question:
        "Is the cost of the appointment covered by private health insurance?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eum quae. Harum officiis reprehenderit ex quia ducimus minima id provident molestias optio nam vel, quidem iure voluptatem, repellat et ipsa.",
    },
  ];

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">
            FAQ's
          </h1>
          <hr className="my-6 border-gray-200 dark:border-gray-700" />
          <div>
            {faqs.map((faq, index) => (
              <div key={index}>
                <button
                  className="flex items-center focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={openFAQ === index ? "M20 12H4" : "M12 4v16m8-8H4"}
                    />
                  </svg>
                  <h1 className="mx-4 text-xl text-gray-700 dark:text-white">
                    {faq.question}
                  </h1>
                </button>
                {openFAQ === index && (
                  <div className="flex mt-8 md:mx-10">
                    <span className="border border-blue-500" />
                    <p className="max-w-3xl px-4 text-gray-500 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                )}
                <hr className="my-8 border-gray-200 dark:border-gray-700" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactFAQ;
