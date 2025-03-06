'use client'

import { useForm, ValidationError } from "@formspree/react";
// import styles from './NewsletterForm.module.css';
import { useState } from 'react';
import FloatingText from '@/components/FloatingText/FloatingText';
import NewsletterModal from '@/components/newsletterModal/NewsletterModal';

const FLOATING_TEXTS_COUNT = 20;

export default function NewsletterForm() {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM || '');
  const [inputValue, setInputValue] = useState('');
  const [floatingTexts, setFloatingTexts] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Create new floating texts
    if (value) {
      setFloatingTexts(Array(FLOATING_TEXTS_COUNT).fill(value));
      // Remove floating texts after 3 seconds (increased from 1.5s)
      setTimeout(() => {
        setFloatingTexts([]);
      }, 50000); // Increased timeout to allow for smooth fade out
    }
  };

  if (state.succeeded) {
    return (
      <div className="p-6 bg-green-50 rounded-xl border border-green-200">
        <p className="text-green-800 text-center font-medium">
          Thank you for your subscription! We'll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <div className="py-40 text-end md:p-20 sm:p-2 sm:pb-12 sm:flex sm:flex-col sm:text-left">
      {floatingTexts.map((text, index) => (
        <FloatingText key={`${text}-${index}`} text={text} />
      ))}
      <form
        onSubmit={handleSubmit} className="space-y-4 mx-auto w-100 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl">
        <h2 className={` font-karla text-2xl text-gray-800 mb-4 font-bold`}>
          Subscribe to the newsletter:
        </h2>
        <div className="space-y-2">
          <input
            id="email"
            type="email"
            name="email"
            value={inputValue}
            onChange={handleInputChange}
            className="
                w-full 
                md:max-w-[300px] 
                sm:w-full 
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
            placeholder="Your email"
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className="text-red-400 text-sm mt-1"
          />
        </div>

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
          {state.submitting ? 'Sending...' : 'Subscribe'}
        </button>

        <ValidationError
          errors={state.errors}
          className="text-red-400 text-sm mt-2 font-karla"
        />
      </form>
      <NewsletterModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />
    </div >
  );
}