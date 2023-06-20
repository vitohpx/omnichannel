# Omnichannel

## Documentação de Execução do Projeto

Esta documentação descreve os passos necessários para executar o projeto completo, incluindo o backend, o frontend e os contêineres Docker.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes pré-requisitos instalados no seu sistema:

- Node.js (versão 14 ou superior)
- Docker (versão 19 ou superior)

## Passo 1: Configuração do Back-end

1. Navegue até o diretório do back-end:

cd omnichannel-backend/


2. Instale as dependências do Laravel executando o comando:

composer install


3. Copie o arquivo `.env.example` para `.env`:

cp .env.example .env


4. Abra o arquivo `.env` e configure as variáveis de ambiente, como as credenciais do banco de dados.

5. Gere uma chave de criptografia executando o comando:

php artisan key:generate


6. Execute as migrações do banco de dados:

php artisan migrate


7. Inicie o servidor local do Laravel:

php artisan serve


O back-end estará acessível em `http://localhost:8000`.

## Passo 2: Configuração do Front-end

1. Navegue até o diretório do front-end:

cd omnichannel-frontend/


2. Instale as dependências do projeto executando o comando:

npm install


3. Inicie o servidor de desenvolvimento do React:

npm start


O front-end estará acessível em `http://localhost:3000`.

## Passo 3: Configuração do Docker

1. Certifique-se de ter o Docker instalado e em execução no seu sistema.

2. Crie um arquivo chamado `Dockerfile` no diretório do back-end com o seguinte conteúdo:

# Use uma imagem base do PHP com Apache
FROM php:7.4-apache

WORKDIR /var/www/html

RUN sudo chown -R www-data:www-data /var/www/html/public
RUN sudo find /var/www/html/public -type f -exec chmod 644 {} \;
RUN sudo find /var/www/html/public -type d -exec chmod 755 {} \;
RUN sudo chgrp -R www-data /var/www/html/storage/

COPY . .

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

#Install PHP extensions
RUN docker-php-ext-install pdo_mysql 

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

#Copiar o arquivo de configuração do Apache
COPY apache-config.conf /etc/apache2/sites-available/000-default.conf

#Habilitar o mod_rewrite do Apache
RUN a2enmod rewrite

RUN composer global require laravel/installer

RUN php artisan key:generate

# Expor a porta do servidor web do Apache
EXPOSE 80


CMD ["apache2-foreground"]

RUN php artisan serve



3. Crie um arquivo chamado `Dockerfile` no diretório do front-end com o seguinte conteúdo:

# Imagem base
FROM node:14-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos do projeto
COPY . /app

# Instalar dependências
RUN npm install

# Build do projeto
RUN npm run build

# Expor a porta do servidor web do React
EXPOSE 3000

# Comando para iniciar o servidor web do React
CMD ["npm", "start"]


4. Crie um arquivo chamado `docker-compose.yml` no diretório raiz do projeto com o seguinte conteúdo:

```
version: '3.8'
services:
  frontend:
    build:
      context: ./omnichannel-frontend
      dockerfile: Dockerfile
    ports:
      - 3000:3000
    volumes:
      - ./omnichannel-frontend:/app
    depends_on:
      - backend

  backend:
    build:
      context: ./omnichannel-backend
      dockerfile: Dockerfile
    ports:
      - 8000:80
    volumes:
      - ./omnichannel-backend:/app
    depends_on:
      - database
```


## Passo 4: Execução com Docker

1. Abra um terminal e navegue até o diretório raiz do projeto.

2. Execute o seguinte comando para construir as imagens e iniciar os contêineres:

docker-compose up


Após a conclusão do processo, o back-end estará acessível em `http://localhost:8000` e o front-end estará acessível em `http://localhost:3000`.

## Conclusão

Você configurou e executou com sucesso o projeto completo, incluindo o backend, o frontend e os contêineres Docker. Agora você pode explorar e interagir com a aplicação.







