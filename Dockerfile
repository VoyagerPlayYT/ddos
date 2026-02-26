FROM node:18-slim  

RUN apt-get update && \  
    apt-get install -y \  
    python3 \  
    make \  
    g++ \  
    git \  
    ca-certificates \  
    && rm -rf /var/lib/apt/lists/*  

WORKDIR /app  
COPY package*.json ./  

RUN npm cache clean --force && \  
    npm install -g npm@10.2.5 --unsafe-perm && \  
    npm install --production --legacy-peer-deps  

COPY . .  

CMD ["npm", "start"]  
