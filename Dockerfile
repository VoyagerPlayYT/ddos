FROM node:18-alpine  
WORKDIR /usr/src/nuke  

RUN apk update && \  
    apk add --no-cache \  
    python3 \  
    make \  
    g++ \  
    git  

COPY package*.json ./  

RUN npm install -g npm@10.2.5 && \  
    npm install --production  

COPY . .  

CMD ["npm", "run", "ultra"]  
