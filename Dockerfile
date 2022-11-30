# FROM node:14.20.1
# # Copiar Package.json e Package-lock.json
# COPY package*.json .
# # Roda o 'npm install' sem sobrescrever package-lock.json
# RUN npm ci
# # Copiar os arquivos
# COPY . .
# # Roda a build do Front
# RUN npm run build
# CMD ["node", "server"]

FROM maven:3.3.9-jdk-8-alpine
WORKDIR /app
COPY pom.xml .
# Frescura pra cachear as dependencias
RUN mvn clean
COPY . .
RUN mvn package
CMD ["java", "-jar", "target/constr-sw-g2-0.0.1-SNAPSHOT.jar"]