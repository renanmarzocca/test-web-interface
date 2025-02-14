# Test prático Full Stack

Este projeto testa as habilidades tanto relacionadas ao frontend quanto ao backend, além de ser necessário o conhecimento em banco de dados para montar uma estutura com TypeORM e postgres.

# Stacks Utilizadas

# Frontend
React + Vite + Ant Design

# Backend 
Typescript + Nest + TypeORM + Postgres

# Features

- Cadastro de usuários.
- Acesso via login.
- Gerenciamento de clientes permitindo ( Criar, atualizar, deletar e selecionar).
- Fácil visualização a empresas que o cliente possui sendo listadas em modal.
- Página dedica a clientes selecionados.
- Notificações via Toasts.
- Página exclusiva para empresas.
- Gestão completa das empresas permitindo (Criar, atualizar, deletar e vincular ao cliente desejado).
- Sistema de logout.

# Comandos e requisitos para instalção

# Backend
Necessário possuir na maquina nodejs e NPM para instalar os pacotes. 

Após isso podemos acessar o diretório do nosso server:

"cd server";
"npm install";

Ao finalizar as instalações realizar o comanddo "npm start".

# Frontend

Acessar o diretório web-interface e instalar as dependencias novamente, porém agora do nosso frontend:

"cd web-interface";
"npm install"

Novamente após concluir as instações, poderemos realizar o comando "num run dev".

# Banco de dados

Neste projeto utilizamos o postgres, então sua maquina precisará estar rodando um postgres, caso não possua será necessário instalar. Após isso executar o serviço seja local ou em nuvem e por fim poderá acessar o arquivo .env.example que irá possuir um exemplo de como configurar a conexão do seu banco.
