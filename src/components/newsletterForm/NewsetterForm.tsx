'use client'

import { useForm, ValidationError } from "@formspree/react";

export default function NewsletterForm() {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM || '');

  if (state.succeeded) {
    return (
      <div className="p-6 bg-green-50 rounded-xl border border-green-200">
        <p className="text-green-800 text-center font-medium">
          Thanks for your submission! We'll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl">
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-200"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-400 transition-all duration-200"
          placeholder="your@email.com"
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className="text-red-400 text-sm mt-1"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-200"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-400 transition-all duration-200"
          placeholder="Your message..."
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="text-red-400 text-sm mt-1"
        />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className={`
          w-full px-6 py-3 
          bg-gradient-to-r from-blue-500 to-blue-600 
          hover:from-blue-600 hover:to-blue-700 
          text-white font-medium rounded-lg 
          transform transition-all duration-200 
          ${state.submitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}
        `}
      >
        {state.submitting ? 'Sending...' : 'Send Message'}
      </button>

      <ValidationError
        errors={state.errors}
        className="text-red-400 text-sm mt-2"
      />
    </form>
  );
}