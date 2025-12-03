import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpClient } from "../../services/httpClient";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Dados Pessoais
    full_name: "",
    cpf: "",
    birth_date: "",
    phone_whatsapp: "",
    email: "",
    password: "",
    confirm_password: "",
    // Endereço
    street: "",
    number: "",
    neighborhood: "",
    city: "Macaé",
    state: "RJ",
    zip_code: "",
    // Logística
    t_shirt_size: "",
    boot_size: "",
    food_restrictions: "",
    invited_by: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirm_password) {
      alert("As senhas não coincidem!");
      return;
    }

    setLoading(true);
    try {
      // Preparar dados no formato esperado pela API
      const topCandidateData = {
        personal_info: {
          full_name: formData.full_name,
          cpf: formData.cpf.replace(/\D/g, ""),
          birth_date: formData.birth_date,
          phone_whatsapp: formData.phone_whatsapp.replace(/\D/g, ""),
          email: formData.email,
          password: formData.password,
          address: {
            street: formData.street,
            number: formData.number,
            neighborhood: formData.neighborhood,
            city: formData.city,
            state: formData.state,
            zip_code: formData.zip_code.replace(/\D/g, ""),
          },
        },
        logistics: {
          t_shirt_size: formData.t_shirt_size,
          boot_size: formData.boot_size ? parseInt(formData.boot_size) : null,
          food_restrictions: formData.food_restrictions || null,
          invited_by: formData.invited_by || null,
        },
      };

      const response = await httpClient.post("/api/tops/register", {
        top_candidate: topCandidateData,
      });

      // Redirecionar para pagamento externo
      const paymentUrl = `https://seu-gateway.com/pagamento?user_id=${response.data.uuid}`;
      window.location.href = paymentUrl;
    } catch (error: any) {
      console.error("Registration error:", error);
      alert(
        error.response?.data?.error ||
          "Erro ao cadastrar. Verifique os dados e tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="bg-legendarios-charcoal text-white min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-legendarios-orange">
            Pré-Cadastro
          </span>
          <h1 className="mt-4 font-display text-4xl uppercase md:text-5xl">
            Quero ser um TOP
          </h1>
          <p className="mt-4 text-sm text-white/70 md:text-base">
            Preencha seus dados para participar do Desafio REC
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 flex gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-1 flex-1 rounded ${
                step <= currentStep
                  ? "bg-legendarios-orange"
                  : "bg-white/10"
              }`}
            />
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Dados Pessoais */}
          {currentStep === 1 && (
            <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold uppercase">
                Dados Pessoais
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    required
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                    CPF *
                  </label>
                  <input
                    type="text"
                    name="cpf"
                    required
                    value={formData.cpf}
                    onChange={handleInputChange}
                    placeholder="000.000.000-00"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Data de Nascimento *
                  </label>
                  <input
                    type="date"
                    name="birth_date"
                    required
                    value={formData.birth_date}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                    WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone_whatsapp"
                    required
                    value={formData.phone_whatsapp}
                    onChange={handleInputChange}
                    placeholder="(00) 00000-0000"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Senha *
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Confirmar Senha *
                  </label>
                  <input
                    type="password"
                    name="confirm_password"
                    required
                    value={formData.confirm_password}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Endereço */}
          {currentStep === 2 && (
            <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold uppercase">Endereço</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Rua/Avenida *
                  </label>
                  <input
                    type="text"
                    name="street"
                    required
                    value={formData.street}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Número *
                  </label>
                  <input
                    type="text"
                    name="number"
                    required
                    value={formData.number}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                    CEP *
                  </label>
                  <input
                    type="text"
                    name="zip_code"
                    required
                    value={formData.zip_code}
                    onChange={handleInputChange}
                    placeholder="00000-000"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Bairro *
                  </label>
                  <input
                    type="text"
                    name="neighborhood"
                    required
                    value={formData.neighborhood}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Estado *
                  </label>
                  <select
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
                  >
                    <option value="RJ">RJ</option>
                    <option value="SP">SP</option>
                    <option value="MG">MG</option>
                    <option value="ES">ES</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Logística */}
          {currentStep === 3 && (
            <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-xl font-semibold uppercase">Logística</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Tamanho da Camiseta *
                  </label>
                  <select
                    name="t_shirt_size"
                    required
                    value={formData.t_shirt_size}
                    onChange={handleInputChange}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
                  >
                    <option value="">Selecione</option>
                    <option value="P">P</option>
                    <option value="M">M</option>
                    <option value="G">G</option>
                    <option value="GG">GG</option>
                    <option value="XG">XG</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Tamanho da Bota
                  </label>
                  <input
                    type="number"
                    name="boot_size"
                    value={formData.boot_size}
                    onChange={handleInputChange}
                    placeholder="35-54"
                    min="35"
                    max="54"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Restrições Alimentares
                  </label>
                  <textarea
                    name="food_restrictions"
                    value={formData.food_restrictions}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        food_restrictions: e.target.value,
                      }))
                    }
                    rows={3}
                    placeholder="Ex: Intolerância a lactose, vegetariano..."
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                    Quem te convidou? (Padrinho)
                  </label>
                  <input
                    type="text"
                    name="invited_by"
                    value={formData.invited_by}
                    onChange={handleInputChange}
                    placeholder="Nome do seu padrinho"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-legendarios-orange"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white/80 transition hover:border-legendarios-orange hover:text-legendarios-orange"
              >
                Voltar
              </button>
            )}
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex-1 rounded-full bg-legendarios-orange px-6 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-white"
              >
                Próximo
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-full bg-legendarios-orange px-6 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-white disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Finalizar Cadastro"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

