# Étape 1 : Utiliser une image de base pour Node.js
FROM node:16

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier les fichiers de package et installer les dépendances
COPY package*.json ./
RUN npm install

# Étape 4 : Copier le reste des fichiers de l'application
COPY . .

# Étape 5 : Exposer le port sur lequel l'application sera exécutée
EXPOSE 5000

# Étape 6 : Commande pour démarrer le serveur
CMD ["node", "server.js"]
