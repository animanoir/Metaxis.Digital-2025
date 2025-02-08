const Eventos = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-2xl container mx-auto px-4 py-8 text-center">
        <title>Eventos</title>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">¡Próximamente!</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Esperamos tener <b>círculos de lectura</b>, <b>conferencias</b>,{' '}
          <b>sesiones de estudio</b>, etc. tanto presenciales como virtuales.{' '}
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Si quieres mantenerte al tanto, puedes suscribirte a nuestro boletín:
        </p>
      </div>
    </div>
  );
}

export default Eventos;