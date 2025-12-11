
import { MessageCircle } from 'lucide-react'; // Icône WhatsApp

const Contact1 = () => {
  const handleWhatsApp = () => {
    // Remplacez par votre numéro WhatsApp
    window.open('https://wa.me/33612345678', '_blank');
  };

  const handleQuoteRequest = () => {
    // Logique pour demander un devis
    alert('Formulaire de devis à implémenter');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 lg:p-16">
          {/* En-tête */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Prêt à lancer votre projet ?
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Parlez-nous de vos besoins et recevez une première proposition dans les 24 heures.
            </p>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button
              onClick={handleQuoteRequest}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex-1 sm:flex-none"
            >
              Demander un devis
            </button>
            
            <button
              onClick={handleWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg flex items-center justify-center gap-3 flex-1 sm:flex-none"
            >
              <MessageCircle size={24} />
              Nous contacter sur WhatsApp
            </button>
          </div>

          {/* Texte de conclusion */}
          <div className="text-center">
            <p className="text-gray-600 text-lg md:text-xl italic max-w-2xl mx-auto">
              Que vous ayez un projet précis ou juste une idée à clarifier, nous sommes là pour vous conseiller.
            </p>
          </div>

          {/* Éléments décoratifs */}
          <div className="mt-16 flex justify-center">
            <div className="flex space-x-4">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse delay-150"></div>
              <div className="w-3 h-3 bg-blue-300 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </div>

        {/* Note en bas de page */}
        <p className="text-center text-gray-500 mt-8 text-sm">
          Réponse garantie sous 24h • Support personnalisé • Devis gratuit
        </p>
      </div>
    </div>
  );
};

export default Contact1;