'use client'

import React, { useState } from 'react';
import { useForm, ValidationError } from "@formspree/react";

type NewsletterFormInPageProps = {
  hasTitle?: boolean;
  compactWidth?: boolean;
  halfWidth?: boolean;
}

const NewsletterFormInPage = ({
  hasTitle = false,
  compactWidth = false,
  halfWidth = false
}: NewsletterFormInPageProps) => {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM || '');
  const [email, setEmail] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  if (state.succeeded) {
    return (
      <div className={`p-6 bg-green-50 rounded-xl border border-green-200 my-12 ${halfWidth ? 'w-1/2 mx-auto' : 'w-full'} ${compactWidth ? 'max-w-md mx-auto' : ''}`}>
        <p className="text-green-800 text-center font-medium">
          ¡Gracias por tu suscripción! Estaremos en contacto pronto.
        </p>
      </div>
    );
  }

  return (
    <div className={`my-12 ${halfWidth ? 'w-1/2 mx-auto' : 'w-full'} ${compactWidth ? 'max-w-md mx-auto' : ''}`}>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl"
      >
        {hasTitle && (
          <h2 className="font-karla text-2xl text-gray-800 mb-4 font-bold">
            Suscríbete al boletín:
          </h2>
        )}

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="
              flex-grow
              text-gray-800
              px-4 
              py-3 
              bg-white/10 
              border-2 
              border-gray-800/40 
              rounded-lg 
              focus:ring-2 
              focus:ring-blue-500 
              focus:border-transparent 
              outline-none 
              placeholder-gray-400 
              transition-all 
              duration-200 
              font-lora
            "
            placeholder="Tu correo electrónico"
            required
          />

          <button
            type="submit"
            disabled={state.submitting}
            className={`
              px-6 py-3
              bg-black text-white
              font-karla text-sm
              border border-black rounded
              shadow-[4px_4px_0_0_#fff,_4px_4px_0_1px_#000]
              hover:shadow-[2px_2px_0_0_#fff,_2px_2px_0_1px_#000]
              hover:translate-x-[2px] hover:translate-y-[2px]
              active:shadow-[inset_0_3px_5px_rgba(0,0,0,0.125)]
              transition-all duration-200
              ${state.submitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              whitespace-nowrap
            `}
          >
            {state.submitting ? 'Enviando...' : 'Suscribirse'}
          </button>
        </div>

        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className="text-red-400 text-sm mt-1"
        />
      </form>
    </div>
  );
};

export default NewsletterFormInPage;