FROM ghcr.io/aunchagaonkar/node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4904

CMD ["node", "index.js"] 