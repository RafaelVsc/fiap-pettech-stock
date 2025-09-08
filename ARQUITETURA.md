# Arquitetura do Projeto FIAP PetTech Stock

## Visão Geral

Este projeto é um sistema de gerenciamento de estoque para uma empresa de produtos para pets (PetTech), desenvolvido como projeto acadêmico da FIAP. O sistema é construído usando a arquitetura de microserviços com NestJS e implementa práticas modernas de desenvolvimento.

## 📊 Diagramas Visuais

Para visualizar a arquitetura do sistema através de diagramas detalhados, consulte:

📄 **[DIAGRAMAS.md](./DIAGRAMAS.md)** - Diagramas de arquitetura, fluxo de dados e deployment

## Stack Tecnológica

### Backend
- **NestJS**: Framework Node.js baseado em TypeScript para construção de aplicações escaláveis
- **TypeScript**: Linguagem principal para type safety e melhor experiência de desenvolvimento
- **MongoDB**: Banco de dados NoSQL para persistência de dados
- **Mongoose**: ODM (Object Document Mapper) para MongoDB
- **JWT**: Autenticação e autorização baseada em tokens
- **Zod**: Validação de esquemas e types runtime

### Infraestrutura e DevOps
- **Docker**: Containerização da aplicação
- **Docker Compose**: Orquestração de múltiplos serviços
- **GitHub Actions**: CI/CD pipeline
- **Prometheus**: Coleta de métricas da aplicação
- **Grafana**: Visualização de métricas e dashboards

### Documentação e Testing
- **Swagger/OpenAPI**: Documentação automática da API
- **ReDoc**: Interface alternativa para documentação da API
- **Jest**: Framework de testes unitários e de integração

## Arquitetura do Sistema

### Padrão Arquitetural

O projeto segue os seguintes padrões arquiteturais:

1. **Arquitetura Modular**: Baseada no sistema de módulos do NestJS
2. **Clean Architecture**: Separação clara entre camadas de apresentação, domínio e infraestrutura
3. **Repository Pattern**: Abstração da camada de acesso a dados
4. **Dependency Injection**: Gerenciamento automático de dependências

### Estrutura de Diretórios

```
src/
├── app.module.ts           # Módulo principal da aplicação
├── main.ts                 # Ponto de entrada da aplicação
├── shared/                 # Componentes compartilhados
│   ├── filters/           # Filtros globais para tratamento de exceções
│   ├── guards/            # Guards para autenticação e autorização
│   ├── interceptors/      # Interceptors para logging e transformação
│   ├── middlewares/       # Middlewares personalizados
│   ├── pipes/             # Pipes para validação e transformação
│   └── services/          # Serviços compartilhados
└── stock/                 # Módulo de domínio - Estoque
    ├── controllers/       # Controladores REST
    ├── services/          # Lógica de negócio
    ├── repositories/      # Camada de acesso a dados
    ├── schemas/           # Esquemas MongoDB e interfaces
    └── stock.module.ts    # Configuração do módulo
```

## Componentes do Sistema

### 1. Camada de Apresentação (Controllers)

**StockController** (`src/stock/controllers/stock.controller.ts`)
- Endpoints REST para gerenciamento de estoque
- Validação de entrada usando Zod schemas
- Autenticação JWT (quando habilitada)
- Documentação Swagger automática

**Endpoints disponíveis:**
- `GET /stock` - Lista todos os produtos com paginação
- `GET /stock/:productId` - Busca produto específico
- `POST /stock` - Cria novo produto
- `PUT /stock/:productId` - Atualiza estoque de um produto
- `DELETE /stock/:productId` - Remove produto

### 2. Camada de Negócio (Services)

**StockService** (`src/stock/services/stock.service.ts`)
- Implementa regras de negócio para gerenciamento de estoque
- Validações de domínio
- Orquestração de operações complexas

### 3. Camada de Dados (Repositories)

**Repository Pattern Implementation:**
- `ProductRepository` (Interface abstrata)
- `ProductMongooseRepository` (Implementação para MongoDB)

Esta estrutura permite trocar facilmente a implementação do banco de dados sem afetar as camadas superiores.

### 4. Modelo de Dados

**Product Schema** (`src/stock/schemas/product.schema.ts`)
```typescript
{
  id?: string;        // Identificador único
  name: string;       // Nome do produto
  quantity: number;   // Quantidade em estoque
  relationId: string; // ID de relacionamento com outros sistemas
}
```

## Infraestrutura e Deployment

### Docker Compose Services

O sistema é composto por múltiplos serviços orquestrados via Docker Compose:

#### 1. API Service (`pettech_api`)
- Aplicação NestJS principal
- Porta: 3010
- Dependências: MongoDB
- Configuração via arquivo `.env`

#### 2. Database Service (`mongodb`)
- MongoDB 6
- Porta: 27017
- Volumes persistentes
- Autenticação configurável

#### 3. Monitoring Stack
- **Prometheus** (porta 9090): Coleta de métricas
- **Grafana** (porta 3000): Dashboards e visualizações

#### 4. Database Management
- **Mongo Express** (porta 8081): Interface web para MongoDB

### Configuração de Ambiente

Variáveis de ambiente necessárias (ver `.env.example`):
```bash
MONGO_USER=          # Usuário do MongoDB
MONGO_PASSWORD=      # Senha do MongoDB
MONGO_DB=           # Nome do banco de dados
PORT=               # Porta da aplicação (padrão: 3010)
MONGO_URI=          # URI de conexão completa do MongoDB
JWT_SECRET=         # Secret para assinatura de tokens JWT
```

### CI/CD Pipeline

**GitHub Actions** (`.github/workflows/main.yml`):
1. **Build Stage**: Constrói imagem Docker
2. **Push Stage**: Envia para Docker Hub
3. **Deploy Stage**: Aciona deploy no Render

**Melhorias Recomendadas:**
- Usar build multi-stage para otimização
- Implementar testes automatizados no pipeline
- Usar secrets management adequado
- Evitar hardcoding de configurações na imagem

## Segurança

### Autenticação e Autorização
- JWT para autenticação stateless
- AuthGuard para proteção de rotas
- Bearer token authentication

### Validação de Dados
- Zod schemas para validação runtime
- ZodValidationPipe para transformação automática
- Tratamento de exceções globalizado

### Boas Práticas Implementadas
- Filtros de exceção globais
- Logging estruturado via interceptors
- Configuração via variáveis de ambiente
- Não exposição de informações sensíveis

## Monitoramento e Observabilidade

### Métricas (Prometheus)
- Métricas de aplicação customizadas
- Métricas de sistema automáticas
- Integration com NestJS via `@willsoto/nestjs-prometheus`

### Logs
- LoggingInterceptor para captura automática
- Estrutura de logs consistente
- Rastreamento de requisições

### Dashboards (Grafana)
- Visualização de métricas em tempo real
- Alertas configuráveis
- Monitoramento de saúde da aplicação

## Desenvolvimento Local

### Pré-requisitos
```bash
# Node.js 18+
# Docker e Docker Compose
# npm ou pnpm
```

### Setup do Ambiente
```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações

# 3. Subir serviços com Docker Compose
docker-compose up -d

# 4. Executar aplicação em modo desenvolvimento
npm run start:dev
```

### Scripts Disponíveis
```bash
npm run build          # Build da aplicação
npm run start          # Execução em modo produção
npm run start:dev      # Execução em modo desenvolvimento
npm run start:debug    # Execução em modo debug
npm run test           # Testes unitários
npm run test:e2e       # Testes end-to-end
npm run test:cov       # Cobertura de testes
npm run lint           # Verificação de código
npm run format         # Formatação de código
```

## Escalabilidade e Performance

### Estratégias Implementadas
- Containerização para deploy facilitado
- Prometheus para monitoramento de performance
- Paginação em endpoints de listagem
- Conexão otimizada com MongoDB

### Oportunidades de Melhoria
- Implementar cache (Redis)
- Load balancing para múltiplas instâncias
- Otimização de queries no banco
- Implementar rate limiting

## Qualidade de Código

### Ferramentas Configuradas
- **ESLint**: Análise estática de código
- **Prettier**: Formatação automática
- **TypeScript**: Type checking
- **Jest**: Framework de testes

### Padrões Seguidos
- Clean Code principles
- SOLID principles
- Conventional Commits (recomendado)
- Documentação inline via TSDoc

## Próximos Passos

### Melhorias Recomendadas
1. **Testes**: Aumentar cobertura de testes unitários e e2e
2. **Cache**: Implementar estratégia de cache
3. **Documentação**: Expandir documentação da API
4. **Segurança**: Implementar rate limiting e validações adicionais
5. **Performance**: Otimizar queries e implementar indexação
6. **Logs**: Implementar centralização de logs
7. **Health Checks**: Implementar endpoints de saúde da aplicação

### Considerações para Produção
- Configurar backups automáticos do MongoDB
- Implementar rotação de logs
- Configurar alertas de monitoramento
- Implementar estratégia de rollback
- Configurar HTTPS e certificados SSL
- Implementar WAF (Web Application Firewall)

---

## Contato e Suporte

Para dúvidas sobre a arquitetura ou implementação:
- Revisar documentação inline no código
- Consultar logs da aplicação
- Verificar métricas no Grafana
- Consultar documentação da API via Swagger (/api) ou ReDoc