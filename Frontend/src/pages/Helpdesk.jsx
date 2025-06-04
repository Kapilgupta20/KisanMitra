import React from "react";
import HeaderCmp from "../components/headercmp.jsx"; // Update the path as per your project structure
import FooterCmp from "../components/footercmp.jsx"; // Update the path as per your project structure
import ContactForm from "../components/contactcmp.jsx"; // Update the path as per your project structure

const Helpdesk = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <HeaderCmp />

      {/* Main Content */}
      <main className="flex-grow bg-white text-[#2A2A2A] px-4 py-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">Helpdesk</h1>
          <p className="text-lg text-[#555] mb-8">
            Welcome to the Helpdesk! We're here to assist you with any issues or questions you may have.
          </p>

          {/* FAQ Section */}
          <div className="text-left space-y-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold">Q1: How can I contact support?</h2>
              <p className="text-[#555]">
                You can contact us through the contact form on our website or email us at support@example.com.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Q2: What are your support hours?</h2>
              <p className="text-[#555]">
                Our support team is available Monday to Friday from 9 AM to 6 PM IST.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Q3: How do I reset my password?</h2>
              <p className="text-[#555]">
                You can reset your password by clicking on "Forgot Password" on the Sign In page.
              </p>
            </div>
          </div>

          {/* Query Section */}
          <div className="text-center mt-8">
            <h2 className="text-2xl font-bold mb-4">For any further queries..</h2>
          </div>

          {/* Contact Component */}
          <ContactForm />
        </div>
      </main>

      {/* Footer */}
      <FooterCmp />
    </div>
  );
};

export default Helpdesk;
