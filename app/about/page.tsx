"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8 pt-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About</h1>

        <p className="text-lg mb-4">
          For years, I struggled with disorganized ideas, half-finished
          projects, and messy workflows. Whether I was coding, designing, or
          planning a new venture, I could never find a system that truly worked
          for me.
        </p>

        <p className="text-lg mb-4">
          {"That's"} why I created my own Notion planning templates — tailored
          specifically for developers, designers, and creative minds who need
          structure without friction. These templates {"aren't"} just pages with
          boxes — {"they're"} systems built to help you stay focused,
          consistent, and creative.
        </p>

        <p className="text-lg mb-4">
          From game development pipelines to startup launch maps and daily task
          trackers, each template has been refined through real-world use. My
          goal is to share tools that actually make your workflow easier — not
          more bloated.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-3">
          What You’ll Find Here
        </h2>
        <ul className="list-disc list-inside space-y-2 text-lg">
          <li>Clean, minimalistic Notion templates made for real-world use</li>
          <li>Systems built for coders, creatives, and entrepreneurs</li>
          <li>Helpful resources to improve your productivity and planning</li>
          <li>A no-BS approach — nothing here is overly complicated</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-3">Why Notion?</h2>
        <p className="text-lg mb-4">
          I chose Notion because {"it's"} flexible, beautiful, and doesn’t lock
          you into a rigid workflow. My templates are built to adapt to the way
          you think — not the other way around.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-3">Get in Touch</h2>
        <p className="text-lg mb-4">
          Have questions or suggestions? Reach out via the{" "}
          <a
            href="/contact"
            className="text-blue-600 underline hover:text-blue-800"
          >
            contact page
          </a>{" "}
          or DM me on social media. {"I'm"} always open to feedback and love
          hearing how people are using the templates in the wild.
        </p>
      </div>
    </div>
  );
}
