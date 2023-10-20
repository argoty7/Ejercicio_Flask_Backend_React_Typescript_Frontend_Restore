# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos requeridos (package.json, package-lock.json, archivos de la aplicación) a /app
COPY . .

# Instala las dependencias de Node.js
RUN npm install

# Expone el puerto en el que tu aplicación React se ejecuta (por ejemplo, 3000)
EXPOSE 3000

# Comando para iniciar tu aplicación React
CMD ["npm", "start"]
