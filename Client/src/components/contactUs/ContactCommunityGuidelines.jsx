import React from "react";

const ContactCommunityGuidelines = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 py-12">
        <div className="container px-6 mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Community Guidelines
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-lg bg-blue-50 shadow-md dark:bg-gray-800">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Welcome to Our Community!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We strive to create a welcoming environment for everyone. Please
                follow these guidelines to ensure a positive experience for all
                members:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Be respectful to others.</li>
                <li>Use appropriate language.</li>
                <li>No spam or self-promotion.</li>
                <li>Report any inappropriate content.</li>
                <li>Follow all applicable laws and regulations.</li>
              </ul>
            </div>

            <div className="p-8 rounded-lg bg-blue-50 shadow-md dark:bg-gray-800">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Consequences of Violating Guidelines
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Failure to adhere to these guidelines may result in content
                removal, account suspension, or other disciplinary actions as
                deemed appropriate by our moderation team.
              </p>
            </div>

            <div className="p-8 rounded-lg bg-blue-50 shadow-md dark:bg-gray-800">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                How to Report Issues
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                If you encounter any issues or see someone violating these
                guidelines, please report it to our moderation team through the
                following channels:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                <li>Contact form on our website.</li>
                <li>Email us at support@example.com.</li>
                <li>Use the report button available on our platform.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactCommunityGuidelines;
