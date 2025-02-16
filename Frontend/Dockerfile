FROM ghcr.io/aunchagaonkar/node

WORKDIR /app

COPY . .

RUN npm install -g http-server

EXPOSE 9563

CMD ["http-server", "-p", "9563"] 