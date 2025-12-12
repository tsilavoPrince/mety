import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  // Log de l'erreur 404
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Envoyer l'erreur à un service de monitoring (optionnel)
    if (window._paq) {
      window._paq.push(['trackEvent', 'Error', '404', location.pathname]);
    }
  }, [location.pathname]);

  // Compte à rebours pour la redirection automatique
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate("/");
    }
  }, [countdown, navigate]);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="text-center max-w-2xl w-full">
        {/* Icône d'alerte */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-100 rounded-full">
            <AlertTriangle className="w-16 h-16 text-red-500" />
          </div>
        </div>

        {/* Code d'erreur */}
        <h1 className="text-9xl font-bold text-gray-800 mb-2 tracking-tighter">
          404
        </h1>
        
        {/* Titre principal */}
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Page non trouvée
        </h2>
        
        {/* Message d'explication */}
        <p className="text-lg text-gray-600 mb-6">
          La page <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">"{location.pathname}"</code> 
          que vous recherchez n'existe pas ou a été déplacée.
        </p>

        {/* Suggestions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-left">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Suggestions :
          </h3>
          <ul className="list-disc pl-5 text-blue-800 space-y-1">
            <li>Vérifiez l'URL pour d'éventuelles erreurs de frappe</li>
            <li>La page a peut-être été supprimée ou renommée</li>
            <li>Contactez-nous si vous pensez qu'il s'agit d'une erreur</li>
          </ul>
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
          
          <button
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            <Home className="w-5 h-5" />
            Page d'accueil
          </button>
          
          <button
            onClick={handleReload}
            className="flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
          >
            <RefreshCw className="w-5 h-5" />
            Recharger
          </button>
        </div>

        {/* Compte à rebours */}
        <div className="text-gray-500 text-sm">
          <p>
            Redirection automatique vers la page d'accueil dans{" "}
            <span className="font-bold text-gray-700">{countdown}</span> secondes
          </p>
        </div>

        {/* Lien de contact */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-500">
            Vous avez besoin d'aide ?{" "}
            <a 
              href="/contact" 
              className="text-blue-600 hover:text-blue-800 font-medium underline"
            >
              Contactez notre support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;