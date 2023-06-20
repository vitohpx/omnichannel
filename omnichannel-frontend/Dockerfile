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
