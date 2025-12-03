# 📦 Guia de Atualização do GitHub

## 🎯 Repositório

**URL:** https://github.com/Adjalma/Legendarios-Macae

---

## 📋 Arquivos que Serão Adicionados/Modificados

### **Arquivos NOVOS Criados:**

1. ✅ `src/pages/Register/RegisterPage.tsx` - Página de cadastro completa
2. ✅ `MUDANCAS_FRONTEND.md` - Documentação das mudanças
3. ✅ `PLANO_INTEGRACAO.md` - Plano de integração site/app
4. ✅ `RESUMO_MUDANCAS.md` - Resumo executivo
5. ✅ `GUIA_GIT.md` - Este arquivo

### **Arquivos MODIFICADOS:**

1. ✅ `src/routes/AppRoutes.tsx` - Adicionadas rotas `/cadastro` e `/inscricao`
2. ✅ `src/components/navigation/Navbar.tsx` - Adicionado botão "Quero ser TOP"
3. ✅ `src/components/navigation/MobileMenu.tsx` - Adicionado botão mobile

---

## 🚀 Comandos para Atualizar o GitHub

### **Opção 1: Via Terminal/Git Bash (Recomendado)**

```bash
# 1. Navegar para a pasta do projeto
cd legendarios-macae

# 2. Verificar status (ver o que foi modificado)
git status

# 3. Adicionar todos os arquivos novos e modificados
git add .

# OU adicionar arquivos específicos:
git add src/pages/Register/RegisterPage.tsx
git add src/routes/AppRoutes.tsx
git add src/components/navigation/Navbar.tsx
git add src/components/navigation/MobileMenu.tsx
git add MUDANCAS_FRONTEND.md
git add PLANO_INTEGRACAO.md
git add RESUMO_MUDANCAS.md
git add GUIA_GIT.md

# 4. Verificar o que será commitado
git status

# 5. Fazer commit com mensagem descritiva
git commit -m "feat: adicionar página de cadastro e integração com app

- Adicionar página de cadastro completa em 3 etapas
- Adicionar rotas /cadastro e /inscricao
- Adicionar botão 'Quero ser TOP' no navbar
- Integrar formulário com API backend
- Adicionar documentação de mudanças"

# 6. Fazer push para o GitHub
git push origin main

# Se der erro de branch, usar:
git push origin main --force-with-lease
```

### **Opção 2: Via GitHub Desktop**

1. Abrir GitHub Desktop
2. Selecionar repositório "Legendarios-Macae"
3. Verificar arquivos modificados na aba "Changes"
4. Adicionar mensagem de commit:
   ```
   feat: adicionar página de cadastro e integração com app
   
   - Adicionar página de cadastro completa em 3 etapas
   - Adicionar rotas /cadastro e /inscricao
   - Adicionar botão 'Quero ser TOP' no navbar
   - Integrar formulário com API backend
   - Adicionar documentação de mudanças
   ```
5. Clicar em "Commit to main"
6. Clicar em "Push origin"

### **Opção 3: Via VS Code**

1. Abrir VS Code na pasta `legendarios-macae`
2. Ir para aba "Source Control" (Ctrl+Shift+G)
3. Verificar arquivos modificados
4. Clicar no "+" ao lado de cada arquivo para adicionar ao stage
5. Digitar mensagem de commit:
   ```
   feat: adicionar página de cadastro e integração com app
   ```
6. Clicar em "Commit"
7. Clicar em "Sync Changes" ou "Push"

---

## 📝 Mensagem de Commit Sugerida

```
feat: adicionar página de cadastro e integração com app

- Adicionar página de cadastro completa em 3 etapas
- Adicionar rotas /cadastro e /inscricao
- Adicionar botão 'Quero ser TOP' no navbar (desktop e mobile)
- Integrar formulário com API backend (/api/tops/register)
- Adicionar documentação completa das mudanças

Arquivos novos:
- src/pages/Register/RegisterPage.tsx
- MUDANCAS_FRONTEND.md
- PLANO_INTEGRACAO.md
- RESUMO_MUDANCAS.md
- GUIA_GIT.md

Arquivos modificados:
- src/routes/AppRoutes.tsx
- src/components/navigation/Navbar.tsx
- src/components/navigation/MobileMenu.tsx
```

---

## ✅ Checklist Antes de Fazer Push

### **Verificações:**

- [ ] Todos os arquivos foram salvos
- [ ] Não há erros de lint (`npm run lint`)
- [ ] Site funciona localmente (`npm run dev`)
- [ ] Página de cadastro está acessível em `/cadastro`
- [ ] Botão "Quero ser TOP" aparece no navbar
- [ ] Formulário está funcionando (mesmo sem backend ainda)

### **Testes Locais:**

```bash
# 1. Instalar dependências (se necessário)
npm install

# 2. Verificar erros de lint
npm run lint

# 3. Rodar em desenvolvimento
npm run dev

# 4. Testar no navegador:
# - http://localhost:5173/cadastro
# - Verificar se botão "Quero ser TOP" aparece
# - Testar formulário (não vai enviar ainda, mas deve funcionar)
```

---

## 🔍 Verificar Após Push

### **No GitHub:**

1. Acessar: https://github.com/Adjalma/Legendarios-Macae
2. Verificar se os arquivos aparecem no repositório
3. Verificar se o commit foi feito com sucesso
4. Verificar se o Vercel fez deploy automático (se configurado)

### **No Vercel:**

1. Acessar dashboard do Vercel
2. Verificar se há novo deploy em andamento
3. Aguardar deploy completar
4. Testar site em produção: https://legendarios-macae.vercel.app/cadastro

---

## 🚨 Resolver Problemas Comuns

### **Erro: "branch is ahead of origin"**

```bash
# Fazer push normalmente
git push origin main
```

### **Erro: "failed to push some refs"**

```bash
# Fazer pull primeiro
git pull origin main

# Resolver conflitos se houver
# Depois fazer push novamente
git push origin main
```

### **Erro: "authentication failed"**

```bash
# Configurar credenciais
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Ou usar token de acesso pessoal do GitHub
```

### **Arquivos não aparecem no git status**

```bash
# Verificar se estão no .gitignore
cat .gitignore

# Se necessário, forçar adição
git add -f arquivo.tsx
```

---

## 📊 Resumo do Que Será Enviado

### **Mudanças no Código:**

- ✅ **1 nova página** completa de cadastro
- ✅ **2 novas rotas** adicionadas
- ✅ **2 componentes** modificados (navbar)
- ✅ **0 funcionalidades** removidas
- ✅ **100% compatível** com código existente

### **Documentação:**

- ✅ **4 novos arquivos** de documentação
- ✅ Guias completos de integração
- ✅ Resumos executivos

### **Impacto:**

- ✅ **Site continua funcionando** normalmente
- ✅ **Nenhuma quebra** de funcionalidades existentes
- ✅ **Apenas adições**, sem remoções

---

## 🎯 Próximos Passos Após Push

1. ✅ Verificar deploy automático no Vercel
2. ✅ Testar página de cadastro em produção
3. ✅ Criar backend API (próxima etapa)
4. ✅ Configurar banco de dados
5. ✅ Testar integração completa

---

## 📚 Recursos

- **GitHub Docs**: https://docs.github.com
- **Git Cheat Sheet**: https://education.github.com/git-cheat-sheet-education.pdf
- **Vercel Docs**: https://vercel.com/docs

---

**Pronto para fazer push! 🚀**

