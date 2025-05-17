"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In production, replace with real submission logic (e.g. Formspree/API)
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-32 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-6">Contact Me</h1>
        <p className="text-lg mb-6 text-gray-700">
          Got a question, suggestion, or just want to say hello? {"I'm"} always
          open to hearing from you. Use the form below to send me a message.
        </p>

        {submitted ? (
          <div className="text-green-600 text-lg font-semibold">
            Thanks for your message! I’ll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow-md transition-colors"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
