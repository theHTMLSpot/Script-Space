'use client'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-32 text-gray-800">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">About</h1>

        <p className="mb-4 text-lg">
          For years, I struggled with disorganized ideas, half-finished
          projects, and messy workflows. Whether I was coding, designing, or
          planning a new venture, I could never find a system that truly worked
          for me.
        </p>

        <p className="mb-4 text-lg">
          {"That's"} why I created my own Notion planning templates — tailored
          specifically for developers, designers, and creative minds who need
          structure without friction. These templates {"aren't"} just pages with
          boxes — {"they're"} systems built to help you stay focused,
          consistent, and creative.
        </p>

        <p className="mb-4 text-lg">
          From game development pipelines to startup launch maps and daily task
          trackers, each template has been refined through real-world use. My
          goal is to share tools that actually make your workflow easier — not
          more bloated.
        </p>

        <h2 className="mb-3 mt-10 text-2xl font-semibold">
          What You’ll Find Here
        </h2>
        <ul className="list-inside list-disc space-y-2 text-lg">
          <li>Clean, minimalistic Notion templates made for real-world use</li>
          <li>Systems built for coders, creatives, and entrepreneurs</li>
          <li>Helpful resources to improve your productivity and planning</li>
          <li>A no-BS approach — nothing here is overly complicated</li>
        </ul>

        <h2 className="mb-3 mt-10 text-2xl font-semibold">Why Notion?</h2>
        <p className="mb-4 text-lg">
          I chose Notion because {"it's"} flexible, beautiful, and doesn’t lock
          you into a rigid workflow. My templates are built to adapt to the way
          you think — not the other way around.
        </p>

        <h2 className="mb-3 mt-10 text-2xl font-semibold">Get in Touch</h2>
        <p className="mb-4 text-lg">
          Have questions or suggestions? Reach out via the{' '}
          <a
            href="/contact"
            className="text-blue-600 underline hover:text-blue-800"
          >
            contact page
          </a>{' '}
          or DM me on social media. {"I'm"} always open to feedback and love
          hearing how people are using the templates in the wild.
        </p>
      </div>
    </div>
  )
}
