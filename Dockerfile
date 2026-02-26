FROM node:18-bullseye

RUN apt-get update && \
    apt-get install -y \
    python3 \
    make \
    g++ \
    git \
    ca-certificates

WORKDIR /app
COPY package*.json ./

RUN npm install -g npm@10.2.5 && \
    npm install --production

COPY . .

CMD ["npm", "start"]
