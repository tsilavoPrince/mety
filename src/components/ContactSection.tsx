import React, { useState, useRef, useEffect } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";

// Types
interface FormData {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
}

// Composant principal
const CTASection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isServicePrefilled, setIsServicePrefilled] = useState(false);
  const [selectedService, setSelectedService] = useState({ label: "Non spécifié" });
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      await new Promise((res) => setTimeout(res, 1500)); // Simulation d'appel API
      setIsModalOpen(false);
    } catch (error) {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  // Animation d’apparition des champs
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisibleItems(new Set([0, 1, 2, 3, 4, 5]));
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="cta-section bg-gradient-to-br from-black-700 to-gray-400 text-white text-center py-20 px-4" id="contact">
      <div className="container mx-auto max-w-4xl">
  <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-orange-200 to-yellow-300 text-transparent bg-clip-text">
    Prêt à lancer votre projet ?
  </h1>

  <p className="text-lg opacity-90 mb-8">
    Parlez-nous de vos besoins et recevez une première proposition dans les 24 heures.
  </p>

  <div className="flex justify-center gap-4">
    <button
      onClick={() => setIsModalOpen(true)}
      className="btn btn-primary bg-gradient-to-r from-orange-500 to-yellow-300 text-black font-semibold px-6 py-3 rounded-full hover:from-yellow-400 hover:to-orange-500 hover:text-black transition transform hover:scale-[1.03]"
    >
      Demander un devis
    </button>

    <a
      href="https://wa.me/261340000000"
      className="btn btn-secondary border border-orange-400 text-orange-300 px-6 py-3 rounded-full hover:bg-gradient-to-r hover:from-orange-500 hover:to-yellow-400 hover:text-black transition"
    >
      Nous contacter sur WhatsApp
    </a>
  </div>

  <p className="mt-8 opacity-90">
    Que vous ayez un projet précis ou juste une idée à clarifier, nous sommes là pour vous conseiller.
  </p>
</div>


      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 px-4"
          onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
        >
          <div className="bg-slate-900 text-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
            >
              ✕
            </button>

            <form onSubmit={handleSubmit} ref={containerRef} className="space-y-6">
              {/* Informations du projet pré-sélectionné */}
              {isServicePrefilled && (
                <div className="p-3 rounded-xl border border-orange-400/40 bg-orange-600/15 animate-fade-in">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-300" />
                      <div>
                        <p className="text-xs text-orange-200">Type de projet pré-sélectionné</p>
                        <p className="text-sm font-semibold text-white">{selectedService.label}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsServicePrefilled(false)}
                      className="text-xs text-gray-400 hover:text-white"
                    >
                      Changer
                    </button>
                  </div>
                </div>
              )}

              {/* Champs du formulaire */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Nom complet"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                  required
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                  required
                  icon={<Mail className="w-4 h-4 mr-2" />}
                />
                <InputField
                  label="Entreprise"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />
                <div>
                  <label className="block text-orange-200 text-sm mb-2">Type de projet</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-black/60 border border-slate-700 rounded-xl focus:ring focus:ring-orange-500 text-white text-sm"
                  >
                    <option value="">Sélectionnez un type</option>
                    <option value="Site web / E-commerce">Site web / E-commerce</option>
                    <option value="Application mobile">Application mobile</option>
                    <option value="Design UI/UX">Design UI/UX</option>
                    <option value="Marketing digital">Marketing digital</option>
                    <option value="Autre projet">Autre projet</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-orange-200 text-sm mb-2">Décrivez votre projet</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  required
                  className="w-full p-3 bg-black/60 border border-slate-700 rounded-xl text-white text-sm focus:ring focus:ring-orange-500 resize-none"
                  placeholder="Parlez-nous de votre vision, vos objectifs, vos défis..."
                />
              </div>

              {/* Erreur */}
              {submitError && (
                <p className="text-red-400 text-center text-sm">
                  ❌ Erreur de réseau. Veuillez réessayer plus tard.
                </p>
              )}

              {/* Bouton d’envoi */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 py-3 rounded-xl text-white font-semibold hover:scale-[1.02] transition disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    Envoi en cours...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" /> Lancer le projet
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

// Champ de saisie réutilisable
interface InputProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  icon?: React.ReactNode;
  focusedField: string | null;
  setFocusedField: React.Dispatch<React.SetStateAction<string | null>>;
}

const InputField: React.FC<InputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  required,
  icon,
  focusedField,
  setFocusedField,
}) => (
  <div>
    <label className="block text-orange-200 text-sm mb-2 flex items-center">
      {icon}
      <span>{label}</span>
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onFocus={() => setFocusedField(name)}
      onBlur={() => setFocusedField(null)}
      placeholder={`Votre ${label.toLowerCase()}`}
      required={required}
      className={`w-full p-3 bg-black/60 border border-slate-700 rounded-xl text-white placeholder-gray-500 text-sm focus:ring focus:ring-orange-500 ${
        focusedField === name ? "ring-2 ring-orange-500" : ""
      }`}
    />
  </div>
);

export default CTASection;
