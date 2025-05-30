/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

export default function ContactPage() {
  const SITE_KEY = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY!

  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!acceptedPrivacyPolicy) {
      setError('Please accept the privacy policy before submitting.')
      return
    }

    if (!recaptchaRef.current) {
      setError('reCAPTCHA not loaded. Please try again later.')
      return
    }

    setLoading(true)

    try {
      // Get the token directly into a local variable
      const token = await recaptchaRef.current.executeAsync()
      recaptchaRef.current.reset()

      if (!token) {
        throw new Error('Failed to verify reCAPTCHA. Please try again.')
      }

      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: `${name} <${email}>`,
          subject,
          body: message,
          captchaToken: token,
        }),
      })

      let responseData: any

      try {
        responseData = await res.json()
        setSubmitted(true)
      } catch (err) {
        console.error('Failed to parse response JSON:', err)
        const raw = await res.text()
        console.error('Raw response:', raw)
        throw new Error('Server returned an invalid response.')
      }

      if (!res.ok) {
        console.error('Error response:', responseData)
        throw new Error(responseData.error || 'Something went wrong.')
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      )
      recaptchaRef.current?.reset()
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-8">
        <div className="max-w-xl rounded bg-white p-8 shadow">
          <h1 className="mb-4 text-3xl font-bold text-green-600">
            Thanks for your message!
          </h1>
          <p>I’ll get back to you soon.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-32">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-4xl font-bold">Contact Me</h1>
        <p className="mb-6 text-lg text-gray-700">
          Got a question, suggestion, or just want to say hello? {"I'm"} always
          open to hearing from you. Use the form below to send me a message.
        </p>

        {error && <div className="mb-4 font-medium text-red-600">{error}</div>}

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
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="accept-privacy-policy"
              checked={acceptedPrivacyPolicy}
              onChange={(e) => setAcceptedPrivacyPolicy(e.target.checked)}
              className="form-checkbox text-blue-600"
            />
            <label
              htmlFor="accept-privacy-policy"
              className="text-sm text-gray-700"
            >
              I accept the{' '}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                privacy policy
              </a>
              .
            </label>
          </div>

          {/* Invisible reCAPTCHA widget */}
          <ReCAPTCHA sitekey={SITE_KEY} size="invisible" ref={recaptchaRef} />

          <button
            type="submit"
            disabled={loading}
            className={`rounded bg-blue-600 px-6 py-2 font-semibold text-white shadow-md transition-colors hover:bg-blue-700 ${
              loading ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  )
}
