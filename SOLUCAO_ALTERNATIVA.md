# 🔧 Solução Alternativa para Erro de Build no Vercel

## 🚨 Problema

O erro `npm error Exit handler never called!` é um bug conhecido do npm em algumas versões do Node.js 24.x no Vercel.

## ✅ Soluções Alternativas

### **Opção 1: Usar Yarn (Recomendado)**

Yarn geralmente é mais estável no Vercel. Para usar:

1. **Remover `package-lock.json`** (opcional, mas recomendado)
2. **Criar `yarn.lock`** executando `yarn install` localmente
3. **Atualizar `vercel.json`**:

```json
{
  "buildCommand": "yarn build",
  "outputDirectory": "dist",
  "installCommand": "yarn install",
  "framework": "vite"
}
```

### **Opção 2: Forçar Node.js 20.x**

O Vercel está usando Node.js 24.x que tem problemas com npm. Forçar versão 20.x:

**No `package.json`:**
```json
{
  "engines": {
    "node": "20.x"
  }
}
```

**E no dashboard do Vercel:**
- Settings → General → Node.js Version → Selecionar "20.x"

### **Opção 3: Remover package-lock.json**

O `package-lock.json` pode estar causando problemas. Remover e deixar o npm gerar um novo:

```bash
git rm package-lock.json
git commit -m "fix: remover package-lock.json para resolver build"
git push
```

### **Opção 4: Usar pnpm**

pnpm também é uma alternativa estável:

**Atualizar `vercel.json`:**
```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install",
  "framework": "vite"
}
```

## 🎯 Recomendação

**Tentar nesta ordem:**
1. ✅ Forçar Node.js 20.x no dashboard do Vercel
2. ✅ Se não funcionar, usar Yarn
3. ✅ Se ainda não funcionar, remover package-lock.json

