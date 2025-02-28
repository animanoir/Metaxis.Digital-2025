const AcercaPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black py-8 sm:py-12 md:py-16 overflow-x-hidden w-full">
        <div className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6 sm:mb-8 md:mb-10 break-words">
            Acerca de <span className="bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-800 dark:from-white dark:to-gray-300">metaxis.digital</span>
          </h1>

          <div className="space-y-4 sm:space-y-6 md:space-y-8 text-left sm:text-center">
            <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed break-words">
              El espacio de <span className="font-semibold">metaxis.digital</span> se erige como un portal al pensamiento metamoderno,
              combinando elementos del futurismo, filosofía, matemáticas, y la espiritualidad
              oriental.
            </p>

            <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed break-words">
              Nuestra misión es difundir ideas que expandan los horizontes de conciencia y{' '}
              <span className="font-semibold bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">promover diálogos que retan las normas establecidas</span>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcercaPage;