import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        import.meta.env.VITE_EMAIL_SERVICEID,
        import.meta.env.VITE_EMAIL_TEMPID,
        formData,
        import.meta.env.VITE_EMAIL_PUBKEY
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setSuccessMessage("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (err) => {
          console.error("FAILED...", err);
          setSuccessMessage("Failed to send message. Please try again later.");
        }
      );
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-[#2A2A2A]">Contact Us</h2>
      <form onSubmit={sendEmail}>
        <div className="mb-4">
          <label className="block mb-2 text-[#2A2A2A]">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-[#A8CBB5] rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-[#2A2A2A]">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-[#A8CBB5] rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-[#2A2A2A]">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-2 border border-[#A8CBB5] rounded-md"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-[#2A2A2A] text-white py-2 rounded-md hover:bg-[#A8CBB5] transition-colors"
        >
          Send Message
        </button>
      </form>
      {successMessage && (
        <p className="mt-4 text-sm text-center text-[#2A2A2A]">{successMessage}</p>
      )}
    </div>
  );
};

export default ContactForm;
