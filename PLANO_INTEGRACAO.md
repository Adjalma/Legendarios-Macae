# 📋 Plano de Integração - Site ↔ App

## 🎯 Objetivo

Integrar o site (Vercel) com o app (Flutter) através de uma API REST compartilhada, **sem quebrar o site atual**.

---

## 📊 Situação Atual

### **Site (legendarios-macae):**
- ✅ React + Vite
- ✅ Hospedado no Vercel
- ✅ Site estático (frontend apenas)
- ✅ Consome APIs externas (WordPress REST)
- ✅ **Nenhuma mudança necessária no código existente**

### **App (legendarios-macae-app):**
- ✅ Flutter completo
- ✅ Pronto para consumir API REST
- ✅ Aguardando backend

---

## 🏗️ Arquitetura Proposta

```
┌─────────────────┐
│   Site (Vercel) │
│   (Frontend)    │
│   React + Vite  │
└────────┬────────┘
         │
         │ HTTP Requests
         │
         ▼
┌─────────────────┐         ┌─────────────────┐
│  API (Vercel)   │◀────────│  App (Flutter)  │
│  Serverless     │         │                 │
│  Functions      │         │                 │
└────────┬────────┘         └─────────────────┘
         │
         │ SQL Queries
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │
│   (Supabase)    │
└─────────────────┘
```

---

## 📁 Estrutura de Arquivos

### **Adicionar ao repositório do site:**

```
legendarios-macae/
├── src/                    (✅ Já existe - não mexer)
├── api/                    (⭐ NOVO - Backend API)
│   ├── auth/
│   │   ├── login.ts
│   │   ├── register.ts
│   │   └── refresh.ts
│   ├── tops/
│   │   ├── register.ts
│   │   ├── update.ts
│   │   └── payment-proof.ts
│   ├── badges/
│   │   └── index.ts
│   ├── businesses/
│   │   └── index.ts
│   └── sos/
│       └── alert.ts
├── lib/                    (⭐ NOVO - Bibliotecas)
│   ├── db.ts
│   ├── auth.ts
│   └── utils.ts
├── vercel.json             (⭐ NOVO - Config Vercel)
└── .env.local              (⭐ NOVO - Variáveis ambiente)
```

---

## 🔧 Implementação

### **Fase 1: Setup Backend (Sem mudar site)**

#### **1.1. Instalar dependências**

```bash
cd legendarios-macae
npm install @vercel/node pg jsonwebtoken bcryptjs
npm install -D @types/pg @types/jsonwebtoken @types/bcryptjs
```

#### **1.2. Criar estrutura de API**

**Arquivo:** `api/auth/login.ts`

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '../../lib/db';
import { comparePassword, generateToken } from '../../lib/auth';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Buscar usuário
    const result = await db.query(
      'SELECT * FROM tops_candidates WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Verificar senha
    const isValid = await comparePassword(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Gerar token
    const token = generateToken(user);

    return res.status(200).json({
      access_token: token,
      refresh_token: generateRefreshToken(user),
      user: {
        id: user.uuid,
        email: user.email,
        full_name: user.full_name,
        status: user.status,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
```

#### **1.3. Configurar Vercel**

**Arquivo:** `vercel.json`

```json
{
  "functions": {
    "api/**/*.ts": {
      "runtime": "@vercel/node",
      "maxDuration": 10
    }
  },
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ],
  "env": {
    "DATABASE_URL": "@database_url",
    "JWT_SECRET": "@jwt_secret"
  }
}
```

### **Fase 2: Adicionar Página de Cadastro (Opcional)**

**Se já existe formulário de cadastro no site, apenas integrar com API.**

**Arquivo:** `src/pages/Register/RegisterPage.tsx` (se não existir)

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { httpClient } from '../../services/httpClient';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    try {
      const response = await httpClient.post('/api/tops/register', {
        top_candidate: formData,
      });

      // Redirecionar para pagamento externo
      window.location.href = `https://seu-gateway.com/pagamento?user_id=${response.data.uuid}`;
    } catch (error) {
      console.error('Registration error:', error);
      alert('Erro ao cadastrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Formulário de cadastro */}
      {/* Integrar com handleSubmit */}
    </div>
  );
};
```

### **Fase 3: Configurar Banco de Dados**

#### **Opção A: Supabase (Recomendado)**

1. Criar conta: https://supabase.com
2. Criar projeto
3. Executar SQL para criar tabelas (usar schema do app)
4. Obter connection string

**Arquivo:** `lib/db.ts`

```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false,
  } : false,
});

export const db = {
  query: async (text: string, params?: any[]) => {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  },
  getClient: () => pool.connect(),
};
```

---

## 🚀 Deploy

### **1. Configurar Variáveis de Ambiente no Vercel**

```bash
# No dashboard do Vercel
DATABASE_URL=postgresql://...
JWT_SECRET=sua-chave-secreta-aqui
```

### **2. Deploy Automático**

```bash
# Git push já faz deploy automático!
git add api/ lib/ vercel.json
git commit -m "feat: adicionar backend API"
git push origin main
```

### **3. Testar API**

```bash
# Testar login
curl -X POST https://legendariosmacae.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@email.com","password":"senha123"}'
```

---

## ✅ Checklist

### **Backend:**
- [ ] Criar estrutura `api/`
- [ ] Implementar autenticação
- [ ] Implementar cadastro
- [ ] Configurar banco de dados
- [ ] Configurar variáveis de ambiente
- [ ] Testar endpoints

### **Site:**
- [ ] Adicionar página de cadastro (se necessário)
- [ ] Integrar formulário com API
- [ ] Adicionar link para pagamento
- [ ] Testar fluxo completo

### **App:**
- [ ] Configurar URL da API
- [ ] Testar integração
- [ ] Validar sincronização

---

## 🎯 Resumo

### **O Que Será Adicionado:**
- ⭐ Backend API (`api/`)
- ⭐ Bibliotecas (`lib/`)
- ⭐ Configuração Vercel (`vercel.json`)

### **O Que NÃO Será Mudado:**
- ✅ Código existente do site
- ✅ Estrutura atual
- ✅ Funcionalidades atuais

### **Resultado:**
- ✅ Site continua funcionando
- ✅ App pode se conectar
- ✅ Tudo integrado

---

**Pronto para implementar! 🚀**

