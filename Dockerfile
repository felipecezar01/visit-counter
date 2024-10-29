# Base image
FROM node:14

# Definindo diretório de trabalho
WORKDIR /app

# Copiando arquivos de configuração
COPY package*.json ./

# Instalando dependências
RUN npm install

# Copiando o resto do código
COPY . .

# Expondo a porta da aplicação
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "index.js"]
