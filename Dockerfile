FROM node:14.20.1
# Copiar Package.json e Package-lock.json
COPY package*.json .
# Roda o 'npm install' sem sobrescrever package-lock.json
RUN npm ci
# Copiar os arquivos
COPY . .
CMD ["node", "server"]