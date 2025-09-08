# FIAP PetTech Stock - Sistema de Gerenciamento de Estoque

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descrição

Sistema de gerenciamento de estoque desenvolvido em NestJS para uma empresa de produtos para pets (PetTech). Este projeto acadêmico da FIAP implementa uma API REST completa com autenticação JWT, monitoramento e documentação automática.

## 📋 Funcionalidades

- ✅ **CRUD completo de produtos**: Criar, listar, atualizar e deletar produtos do estoque
- ✅ **Autenticação JWT**: Sistema de autenticação baseado em tokens
- ✅ **Validação de dados**: Validação robusta usando Zod schemas
- ✅ **Documentação automática**: Swagger/OpenAPI e ReDoc
- ✅ **Monitoramento**: Integração com Prometheus e Grafana
- ✅ **Containerização**: Docker e Docker Compose
- ✅ **CI/CD**: Pipeline automatizado com GitHub Actions

## 📖 Documentação

### Arquitetura do Sistema
Para uma explicação detalhada da arquitetura, tecnologias utilizadas e padrões implementados, consulte:

📄 **[ARQUITETURA.md](./ARQUITETURA.md)** - Documentação completa da arquitetura do projeto

📊 **[DIAGRAMAS.md](./DIAGRAMAS.md)** - Diagramas visuais da arquitetura do sistema

### API Documentation
Quando a aplicação estiver rodando, acesse:
- **Swagger UI**: http://localhost:3010/api
- **ReDoc**: http://localhost:3010/docs

## 🚀 Setup do Projeto

### Pré-requisitos

- Node.js 18+ 
- Docker e Docker Compose
- npm (ou pnpm conforme instruções do professor)

### Instalação

1. **Clone o repositório**
```bash
git clone <repository-url>
cd fiap-pettech-stock
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

### Exemplo de .env:
```env
MONGO_USER=devuser
MONGO_PASSWORD=devpass
MONGO_DB=pettech_stock
PORT=3010
MONGO_URI=mongodb://devuser:devpass@mongodb:27017/pettech_stock?authSource=admin
JWT_SECRET=seu_jwt_secret_muito_seguro_aqui
```

## 📦 Executando com Docker Compose

O projeto inclui um setup completo com Docker Compose que inclui:
- API da aplicação
- MongoDB
- Mongo Express (interface web)
- Prometheus (métricas)
- Grafana (dashboards)

```bash
# Subir todos os serviços
docker-compose up -d

# Verificar logs
docker-compose logs -f api

# Parar todos os serviços
docker-compose down
```

### Portas dos serviços:
- **API**: http://localhost:3010
- **Mongo Express**: http://localhost:8081
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3000

## 🛠️ Desenvolvimento Local

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev          # Execução em modo watch (recomendado para dev)
npm run start:debug        # Execução em modo debug

# Produção
npm run build              # Build da aplicação
npm run start:prod         # Execução em modo produção

# Qualidade de código
npm run lint               # Verificação de código com ESLint
npm run format             # Formatação de código com Prettier

# Testes
npm run test               # Testes unitários
npm run test:watch         # Testes em modo watch
npm run test:cov           # Cobertura de testes
npm run test:debug         # Testes em modo debug
npm run test:e2e           # Testes end-to-end
```

## 🧪 Testes

```bash
# Executar todos os testes unitários
npm run test

# Testes com cobertura
npm run test:cov

# Testes end-to-end
npm run test:e2e
```

## 🐳 Docker

### Build da imagem
```bash
docker build -t pettech-stock:latest .
```

### Executar apenas a aplicação (requer MongoDB externo)
```bash
docker run -p 3010:3010 --env-file .env pettech-stock:latest
```

## 📊 Monitoramento

### Prometheus Metrics
Acesse http://localhost:9090 para ver as métricas coletadas.

### Grafana Dashboards  
Acesse http://localhost:3000 para visualizar os dashboards.
- Usuário padrão: `admin`
- Senha padrão: `admin`

## 🔧 Configuração para Produção

### Variáveis de Ambiente Importantes

```env
# Banco de dados (NÃO usar MongoDB Atlas conforme orientação)
MONGO_URI=mongodb://usuario:senha@host:porta/database

# Segurança
JWT_SECRET=chave_super_secreta_para_jwt

# Aplicação
PORT=3010
NODE_ENV=production
```

### GitHub Actions

O projeto inclui CI/CD com GitHub Actions. Para configurar:

1. **Adicione os secrets no GitHub:**
   - `DOCKER_USERNAME`: Usuário do Docker Hub
   - `DOCKER_PASSWORD`: Senha/Token do Docker Hub  
   - `RENDER_SERVICE_ID`: ID do serviço no Render
   - `RENDER_API_KEY`: API Key do Render
   - `JWT_SECRET`: Secret para JWT

2. **O pipeline irá:**
   - Fazer build da aplicação
   - Criar imagem Docker
   - Enviar para Docker Hub
   - Fazer deploy no Render

## 📋 API Endpoints

### Produtos/Estoque

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| `GET` | `/stock` | Lista todos os produtos | ❌ |
| `GET` | `/stock/:id` | Busca produto específico | ❌ |
| `POST` | `/stock` | Cria novo produto | ✅ JWT |
| `PUT` | `/stock/:id` | Atualiza estoque | ❌ |
| `DELETE` | `/stock/:id` | Remove produto | ❌ |

### Exemplo de payload para criação:
```json
{
  "name": "Ração Premium para Cães",
  "quantity": 100,
  "relationId": "produto-123"
}
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)  
5. Abra um Pull Request

## 📝 Notas do Projeto Acadêmico

- ✅ Projeto desenvolvido seguindo as aulas da FIAP
- ✅ Adaptações feitas para funcionar com versões atuais
- ✅ MongoDB local em vez de Atlas conforme orientação  
- ✅ Uso do pnpm conforme exemplo do professor
- ✅ GitHub Actions configurado para CI/CD
- ✅ Docker e Docker Compose para ambiente local

## 📄 Licença

Este projeto é licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
