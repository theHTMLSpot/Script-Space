import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Scripted Spaces</title>
        <meta
          name="description"
          content="Privacy Policy for Scripted Spaces by Ethan Lagden"
        />
      </Head>
      <main className="flex flex-col items-center justify-center  w-[100vw] px-6 py-12 text-gray-800 font-sans pt-20 bg-gray-200">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">
          Effective Date: May 17, 2025
        </p>

        <p className="mb-6">
          At <strong>Scripted Spaces</strong>, your privacy is important to us.
          This Privacy Policy outlines how we collect, use, and protect the
          information you provide when contacting us through our website.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          When you use the contact form on our website, we collect:
        </p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Your name</li>
          <li>Your email address</li>
          <li>The content of your message</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">
          2. How We Use Your Information
        </h2>
        <p className="mb-6">
          We use your information solely to respond to your inquiry. Your email
          address is used as the <span className="italic">“Reply-To”</span>{" "}
          address in the message we receive, allowing us to reply to your
          message via email. We do not store this data in any database or use it
          for marketing.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">
          3. Legal Basis for Processing
        </h2>
        <p className="mb-6">
          In accordance with the General Data Protection Regulation (GDPR), our
          lawful basis for processing your information is:
        </p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Your consent (provided when submitting the contact form)</li>
          <li>Our legitimate interest in responding to your inquiry</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">4. Data Retention</h2>
        <p className="mb-6">
          Messages sent via the contact form are delivered directly to our email
          inbox. We do not store this data elsewhere. Emails may be retained
          temporarily for follow-up purposes and then deleted when no longer
          needed.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">5. Your Rights</h2>
        <p className="mb-6">Under the GDPR, you have the right to:</p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Access your data</li>
          <li>Request correction or deletion</li>
          <li>Withdraw your consent at any time</li>
        </ul>
        <p className="mb-6">
          To exercise your rights, please contact us using the information
          below.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">6. Contact</h2>
        <p className="mb-6">
          If you have any questions or concerns about this Privacy Policy, you
          can reach us at:
        </p>
        <p className="mb-2">Ethan Lagden</p>
        <p className="mb-2">
          Email:{" "}
          <a
            href="mailto:lagdenethan@gmail.com"
            className="text-blue-600 hover:underline"
          >
            lagdenethan@gmail.com
          </a>
        </p>
        <p className="mb-12">
          Website: <span className="text-gray-700">Scripted Spaces</span>
        </p>
      </main>
    </>
  );
}
