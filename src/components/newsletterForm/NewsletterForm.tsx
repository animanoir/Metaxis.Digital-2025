'use client'

import { useForm, ValidationError } from "@formspree/react";
import styles from './NewsletterForm.module.css';

export default function NewsletterForm() {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM || '');

  if (state.succeeded) {
    return (
      <div className="p-6 bg-green-50 rounded-xl border border-green-200">
        <p className="text-green-800 text-center font-medium">
          Thanks for your submission! We&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <div className="py-40 text-end md:p-20 sm:p-2 sm:pb-12 sm:flex sm:flex-col sm:text-left">

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl">
        <h2 className={`${styles.skewFloat} font-karla text-2xl text-gray-800 mb-4 font-bold text-shadow`}>
          Suscríbete al boletín:
        </h2>
        <div className="space-y-2">
          {/* <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-200 font-karla text-2xl mb-4"
          >
            Correo Electrónico
          </label> */}
          <input
            id="email"
            type="email"
            name="email"
            className="w-full md:max-w-[300px] sm:w-full text-gray-800 px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-400 transition-all duration-200 font-lora"
            placeholder="Tu correo electrónico"
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className="text-red-400 text-sm mt-1"
          />
        </div>

        {/* <div className="space-y-2">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-200"
          >
            Mensaje
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
        </div> */}

        <button
          type="submit"
          disabled={state.submitting}
          className={`
            w-full md:w-auto sm:w-full px-10 py-3
            bg-black text-white
            font-karla text-sm
            border border-black rounded
            shadow-[4px_4px_0_0_#fff,_4px_4px_0_1px_#000]
            hover:shadow-[2px_2px_0_0_#fff,_2px_2px_0_1px_#000]
            hover:translate-x-[2px] hover:translate-y-[2px]
            active:shadow-[inset_0_3px_5px_rgba(0,0,0,0.125)]
            transition-all duration-200
            ${state.submitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {state.submitting ? 'Enviando...' : 'Suscribirse'}
        </button>

        <ValidationError
          errors={state.errors}
          className="text-red-400 text-sm mt-2 font-karla"
        />
      </form>
    </div >
  );
}