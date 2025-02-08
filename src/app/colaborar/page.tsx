import * as React from 'react';
// import Layout from '../components/Layout';
// import Seo from '../components/SEO';
// import NewsletterForm from '../components/NewsletterForm';

const ColaboraPage = () => {
  return (
    <>
      {/*       <Seo
        title="Colabora"
        image={amalgalmas}
        imageTwitter={amalgalmasTw}
        description="metaxis.digital - Colaboraciones"
        metaurl="https://metaxis.digital/Colabora"
        type="website"
        author="Óscar A. Montiel"
      /> */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-2xl container mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Colabora con nosotr∞s</h1>
          <h3 className="text-xl text-gray-800 mb-2">Expresiones Artísticas y Literarias:</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Si tienes la habilidad de plasmar pensamientos en palabras a través de ensayos,
            artículos y poemas, o capturar emociones y visiones en medios visuales, ya sea pintura,
            dibujo, arte generativo o incluso música, escultura, etc. te invitamos a ser parte de
            nuestro espacio.
          </p>

          <h3 className="text-xl text-gray-800 mt-4 mb-2">Colaboración Técnica:</h3>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Si tu habilidad radica en el mundo del código, te invitamos a colaborar en el núcleo de
            metaxis.digital. Nuestro sitio está construido sobre Gatsby con React (próximamente
            migrado a Next.js), y buscamos mentes habilidosas que nos ayuden a mejorar, innovar y
            evolucionar nuestra plataforma.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            {/*             Consulta el repositorio aquí:{' '}
            <a
              className="underline"
              href="https://github.com/animanoir/metaxisdigital2023"
              target="_blank"
              rel="noopener noreferrer"
            >
              metaxisdigital2023
            </a> */}
          </p>
        </div>
      </div>
    </>
  );
};

export default ColaboraPage;