import React, { useState } from "react";

const Question = () => {
  const [open, setOpen] = useState(null);

  const toggleAnswer = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center sm:text-left">
        RFQ Management Software - Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {/* Question 1 */}
        <div>
          <button
            onClick={() => toggleAnswer(1)}
            className="w-full text-left bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600"
          >
            How can I ensure the accuracy of data entered into the RFQ system?
          </button>
          {open === 1 && (
            <div className="p-4 mt-2 bg-gray-100 border-l-4 border-blue-500 rounded-lg">
              <p>
                Ensure that validation checks are in place to verify required
                fields, data types, and consistency before submission. Implement
                dropdowns or predefined options where possible, and use error
                messages to guide the user.
              </p>
            </div>
          )}
        </div>

        {/* Question 2 */}
        <div>
          <button
            onClick={() => toggleAnswer(2)}
            className="w-full text-left bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600"
          >
            How do I integrate the RFQ software with our existing ERP or CRM
            system?
          </button>
          {open === 2 && (
            <div className="p-4 mt-2 bg-gray-100 border-l-4 border-blue-500 rounded-lg">
              <p>
                Consult with your IT team to set up API connections or data
                export/import tools to sync data between the RFQ software and
                your ERP or CRM systems. Most RFQ tools offer integration guides
                for popular platforms.
              </p>
            </div>
          )}
        </div>

        {/* Question 3 */}
        <div>
          <button
            onClick={() => toggleAnswer(3)}
            className="w-full text-left bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600"
          >
            How can I track the status of my RFQs in real-time?
          </button>
          {open === 3 && (
            <div className="p-4 mt-2 bg-gray-100 border-l-4 border-blue-500 rounded-lg">
              <p>
                Use the RFQ software’s dashboard to monitor the status of all
                active RFQs. It should display the submission, approval, and
                vendor response stages in real-time, allowing for easy tracking
                of each RFQ's progress.
              </p>
            </div>
          )}
        </div>

        {/* Question 4 */}
        <div>
          <button
            onClick={() => toggleAnswer(4)}
            className="w-full text-left bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600"
          >
            How does the software ensure the confidentiality of our pricing and
            vendor information?
          </button>
          {open === 4 && (
            <div className="p-4 mt-2 bg-gray-100 border-l-4 border-blue-500 rounded-lg">
              <p>
                The software should implement encryption protocols for data in
                transit and at rest. Additionally, user permissions should be
                configured to limit access to sensitive data based on roles and
                responsibilities.
              </p>
            </div>
          )}
        </div>

        {/* Question 5 */}
        <div>
          <button
            onClick={() => toggleAnswer(5)}
            className="w-full text-left bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600"
          >
            How can I compare quotations from multiple vendors side by side?
          </button>
          {open === 5 && (
            <div className="p-4 mt-2 bg-gray-100 border-l-4 border-blue-500 rounded-lg">
              <p>
                Most RFQ tools provide a comparison table feature that displays
                the vendor quotations side by side, allowing you to filter and
                compare prices, terms, and other relevant details to help you
                make an informed decision.
              </p>
            </div>
          )}
        </div>

        {/* Question 6 */}
        <div>
          <button
            onClick={() => toggleAnswer(6)}
            className="w-full text-left bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600"
          >
            How can I automate responses and create reusable templates for RFQs?
          </button>
          {open === 6 && (
            <div className="p-4 mt-2 bg-gray-100 border-l-4 border-blue-500 rounded-lg">
              <p>
                Check if the software offers automation rules and templates to
                streamline your RFQ process. You can configure automated
                responses for certain actions, such as acknowledging receipt or
                confirming an RFQ submission, and create reusable templates for
                common RFQs.
              </p>
            </div>
          )}
        </div>

        {/* Question 7 */}
        <div>
          <button
            onClick={() => toggleAnswer(7)}
            className="w-full text-left bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600"
          >
            What types of reports can I generate from the RFQ data?
          </button>
          {open === 7 && (
            <div className="p-4 mt-2 bg-gray-100 border-l-4 border-blue-500 rounded-lg">
              <p>
                Reports typically include vendor performance, RFQ status, quote
                comparisons, and historical trends. These reports help analyze
                your RFQ process, identify bottlenecks, and make better
                data-driven decisions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
