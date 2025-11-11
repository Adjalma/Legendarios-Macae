export const PrivacyPage = () => {
  return (
    <div className="bg-legendarios-charcoal text-white">
      <div className="mx-auto max-w-4xl px-4 py-20 md:px-6">
        <h1 className="font-display text-4xl uppercase">Política de Privacidade</h1>
        <p className="mt-6 text-sm text-white/70 md:text-base">
          Esta política descreve como o Legendários Macaé coleta, utiliza e protege os dados
          fornecidos por visitantes e participantes. Utilizamos as informações apenas para manter a
          comunicação sobre TOPs, mentorias e ações locais. Não compartilhamos os dados com
          terceiros e garantimos tratamento seguro e responsável.
        </p>
        <div className="mt-8 space-y-4 text-sm text-white/70 md:text-base">
          <p>
            • Os dados informados em formulários (nome, e-mail e telefone) são usados exclusivamente
            para responder contatos e enviar atualizações sobre eventos.
          </p>
          <p>
            • O usuário pode solicitar a atualização ou remoção de seus dados a qualquer momento
            através do e-mail{" "}
            <a
              href="mailto:contato@legendariosmacae.org.br"
              className="text-legendarios-orange hover:text-white"
            >
              contato@legendariosmacae.org.br
            </a>
            .
          </p>
          <p>
            • Utilizamos ferramentas de análise de acesso apenas para medir o alcance do site.
            Nenhuma informação pessoal é vinculada a essas métricas.
          </p>
          <p>
            • Ao continuar navegando, você concorda com esta política. Sempre que houver atualizações
            relevantes, publicaremos nesta mesma página.
          </p>
        </div>
      </div>
    </div>
  );
};


