/* import Layout from '../components/Layout'; */
/* import * as acercaStyles from '../css/Acerca.module.css'; */
/* import pulpoFlores from '../images/metaxis-digital-pulpo.jpg';
import pulpoFloresTw from '../images/metaxis-digital-pulpo-tw.jpg'; */
/* import NewsletterForm from '../components/NewsletterForm'; */

const AcercaPage = () => {

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-2xl  container mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Acerca de <b>metaxis.digital</b></h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            El espacio de <b>metaxis.digital</b> se erige como un portal al pensamiento metamoderno,
            combinando elementos del futurismo, filosofía, matemáticas, y la espiritualidad
            oriental. Nuestra misión es difundir ideas que expandan los horizontes de conciencia y{' '}
            <b>promover diálogos que retan las normas establecidas</b>.
          </p>
        </div>
      </div>
    </>
  );
};

export default AcercaPage;
