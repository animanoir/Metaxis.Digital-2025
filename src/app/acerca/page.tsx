const AcercaPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-8 sm:py-12 md:py-16 overflow-x-hidden w-full">
        <div className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-600 mb-6 sm:mb-8 md:mb-10 break-words text-left sm:text-center">
            Acerca de <span>metaxis.digital</span>
          </h1>

          <div className="space-y-4 sm:space-y-6 md:space-y-8 text-left sm:text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-600 mb-2 sm:mb-3">Portal al Pensamiento Metamoderno:</h3>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed break-words text-gray-500">
              El espacio de <span className="font-semibold">metaxis.digital</span> se erige como un portal al pensamiento metamoderno,
              combinando elementos del futurismo, filosofía, matemáticas, y la espiritualidad
              oriental.
            </p>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-600 mt-4 sm:mt-6 md:mt-8 mb-2 sm:mb-3">Nuestra Misión:</h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 leading-relaxed break-words">
              Difundir ideas que expandan los horizontes de conciencia y{' '}
              <span className="font-semibold">promover diálogos que retan las normas establecidas</span>.
            </p>

            <div className="mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm sm:text-base italic text-gray-600 dark:text-gray-400">
                Para colaborar, únete a nuestro <a href="https://t.me/+0ViSuNGeQ-JmZTcx" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">grupo en Telegram</a> o envía un correo a <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">etherealflux94@gmail.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcercaPage;