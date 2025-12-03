# Script PowerShell para atualizar o GitHub
# Execute: .\atualizar-github.ps1

Write-Host "🚀 Atualizando repositório GitHub..." -ForegroundColor Cyan
Write-Host ""

# Verificar se estamos no diretório correto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erro: Execute este script na pasta do projeto legendarios-macae" -ForegroundColor Red
    exit 1
}

# Mostrar status atual
Write-Host "📋 Status atual do repositório:" -ForegroundColor Yellow
git status --short
Write-Host ""

# Perguntar se deseja continuar
$continuar = Read-Host "Deseja continuar com o commit? (S/N)"
if ($continuar -ne "S" -and $continuar -ne "s") {
    Write-Host "❌ Operação cancelada." -ForegroundColor Red
    exit 0
}

# Adicionar todos os arquivos
Write-Host ""
Write-Host "➕ Adicionando arquivos ao stage..." -ForegroundColor Yellow
git add .

# Verificar o que será commitado
Write-Host ""
Write-Host "📝 Arquivos que serão commitados:" -ForegroundColor Yellow
git status --short
Write-Host ""

# Fazer commit
Write-Host "💾 Fazendo commit..." -ForegroundColor Yellow
$mensagem = "feat: adicionar página de cadastro e integração com app

- Adicionar página de cadastro completa em 3 etapas
- Adicionar rotas /cadastro e /inscricao
- Adicionar botão 'Quero ser TOP' no navbar
- Integrar formulário com API backend
- Adicionar documentação de mudanças"

git commit -m $mensagem

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Commit realizado com sucesso!" -ForegroundColor Green
    
    # Perguntar se deseja fazer push
    Write-Host ""
    $fazerPush = Read-Host "Deseja fazer push para o GitHub? (S/N)"
    if ($fazerPush -eq "S" -or $fazerPush -eq "s") {
        Write-Host ""
        Write-Host "📤 Fazendo push para origin/main..." -ForegroundColor Yellow
        git push origin main
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✅ Push realizado com sucesso!" -ForegroundColor Green
            Write-Host ""
            Write-Host "🌐 Verifique no GitHub: https://github.com/Adjalma/Legendarios-Macae" -ForegroundColor Cyan
            Write-Host "🚀 Vercel deve fazer deploy automático em breve!" -ForegroundColor Cyan
        } else {
            Write-Host ""
            Write-Host "❌ Erro ao fazer push. Verifique suas credenciais." -ForegroundColor Red
        }
    } else {
        Write-Host ""
        Write-Host "ℹ️  Commit feito localmente. Execute 'git push origin main' quando quiser enviar." -ForegroundColor Yellow
    }
} else {
    Write-Host ""
    Write-Host "❌ Erro ao fazer commit." -ForegroundColor Red
}

Write-Host ""

