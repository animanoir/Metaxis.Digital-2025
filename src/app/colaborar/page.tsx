import * as React from 'react';

const ColaboraPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black py-8 sm:py-12 md:py-16 overflow-x-hidden w-full">
        <div className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6 sm:mb-8 md:mb-10 break-words text-left sm:text-center">
            Colabora con <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-300">nosotr∞s</span>
          </h1>

          <div className="space-y-4 sm:space-y-6 md:space-y-8 text-left sm:text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-2 sm:mb-3">Expresiones Artísticas y Literarias:</h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed break-words">
              Si tienes la habilidad de plasmar pensamientos en palabras a través de ensayos,
              artículos y poemas, o capturar emociones y visiones en medios visuales, ya sea pintura,
              dibujo, arte generativo o incluso música, escultura, etc. <span className="font-semibold bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">te invitamos a ser parte de nuestro espacio</span>.
            </p>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mt-4 sm:mt-6 md:mt-8 mb-2 sm:mb-3">Colaboración Técnica:</h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed break-words">
              Si tu habilidad radica en el mundo del código, te invitamos a colaborar en el núcleo de
              <span className="font-semibold"> metaxis.digital</span>. Nuestro sitio está construido con Next.js y React, y buscamos mentes habilidosas que nos ayuden a mejorar, innovar y
              evolucionar nuestra plataforma.
            </p>

            <div className="mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm sm:text-base italic text-gray-600 dark:text-gray-400">
                Para colaborar, contacta a través de nuestras redes sociales o envía un correo a <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">contacto@metaxis.digital</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColaboraPage;