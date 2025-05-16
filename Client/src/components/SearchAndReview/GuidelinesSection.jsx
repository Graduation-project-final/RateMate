import React from "react";

const GuidelinesSection = () => {
  return (
    <div className="bg-gray-100 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-[#060640] mb-4">
        Review Guidelines
      </h2>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">
          Tips for Writing Helpful Reviews:
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li>Be specific and provide details about your experience</li>
          <li>Highlight both positive and negative aspects</li>
          <li>Mention any standout features or services</li>
          <li>Keep your review concise and to the point</li>
          <li>Use proper grammar and check for spelling errors</li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Community Guidelines:</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li>Be respectful and courteous in your language</li>
          <li>Don't include personal information about yourself or others</li>
          <li>Avoid using profanity or offensive content</li>
          <li>Don't post fake or biased reviews</li>
          <li>Respect copyright and don't post content that isn't yours</li>
        </ul>
      </div>
    </div>
  );
};

export default GuidelinesSection;
