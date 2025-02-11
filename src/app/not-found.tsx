export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-2xl container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          El identificador en la URL que has utilizado no corresponde a ninguna página en este sitio.
        </h1>
      </div>
    </div>
  );
}