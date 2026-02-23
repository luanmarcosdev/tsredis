# Objetivo / Resumo

Este projeto foi desenvolvido para servir como base de uma API backend moderna utilizando **TypeScript + Express + Docker**, com foco em uma arquitetura modular, escalável e alinhada com boas práticas de engenharia de software.

Durante o desenvolvimento, foram aplicados conceitos que favorecem:

- alta coesão
- baixo acoplamento
- manutenibilidade
- princípios SOLID (principalmente SRP, DIP e LSP)

---

## O que você encontrará neste projeto

- Service Layer (separação de regras de negócio)
- Repository Pattern (abstração de acesso ao banco)
- DTOs e Mappers (contratos de entrada/saída e transformação de dados)
- Tratamento centralizado de erros (middlewares + erros personalizados)
- Testes unitários com Jest
- Ambiente completo com Docker + Docker Compose

---

## Tech Stack

- Node 
- TypeScript  
- Express  
- TypeORM  
- MySQL  
- Jest  
- Docker + Docker Compose  

---

## Visão geral da arquitetura e organização

O projeto segue uma estrutura modular, com separação clara de responsabilidades:

```bash
src/
 ├── controllers/     # Coordena Request/Response  
 ├── services/        # Regras de negócio  
 ├── repositories/    # Acesso ao banco (TypeORM)  
 ├── dtos/            # Contratos de entrada e saída  
 ├── mappers/         # Entity → DTO  
 ├── middlewares/     # Tratamento global  
 ├── errors/          # Erros padronizados  
 ├── database/        # Data source, entities e migrations  
 └── routes/          # Definição das rotas  
```

---

## Fluxo de uma requisição

```bash
Route → Validation → Controller → Service → Repository → Database  
→ Service → Controller → Response DTO → Client  

Errors → Error Middleware → Standard Response  
```

---

## ⚙️ Como executar o projeto

### Pré-requisitos

- Node + npm (opcionais)
- Ambiente Linux/WSL
- Docker + Docker Compose

---

### 1. Clonar o repositório

```bash
git clone https://github.com/luanmarcosdev/tscontainer
cd tscontainer
```

---

### 2. Instalar dependências (opcional)

Necessário apenas se quiser rodar o servidor ou os testes diretamente na máquina (sem Docker).

```bash
npm install
```

---

### 3. Montar imagem e subir o ambiente (API + Banco) com Docker

O `docker-compose` já inicia a API em modo desenvolvimento junto com o banco MySQL.

```bash
docker-compose up -d --build
```

### 4. Rode os testes unitarios

Os testes deste projeto estão utilizando mocks (obrigado Repository :P), portanto não dependem do banco de dados.

1. Rode os testes localmente caso tenha instalado as dependencias na maquina
```bash
npm run test
```

2. Rode os testes dentro do container
```bash
docker exec -it ts-container-api npm run test
```

---

### 5. Executar migrations

```bash
docker exec -it ts-container-api npm run migration:run
```

---

### 6. A API estará disponível em:

```bash
http://localhost:3000
```

---

## 📌 Endpoints (exemplo)

| Método | Rota         | Descrição        |
|--------|--------------|------------------|
| GET    | /users       | Lista usuários   |
| POST   | /users       | Cria usuário     |
| PUT    | /users/:id   | Atualiza usuário |
| DELETE | /users/:id   | Remove usuário   |

---
