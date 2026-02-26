FROM node:18-alpine
WORKDIR /usr/src/armageddon

RUN apk update && \
    apk add --no-cache \
    python3 \
    make \
    g++ \
    git \
    openssl \
    ca-certificates

COPY package*.json ./

RUN npm install -g npm@10.2.5 --unsafe-perm && \
    npm install --production --unsafe-perm

COPY . .

CMD ["npm", "run", "stress"]
