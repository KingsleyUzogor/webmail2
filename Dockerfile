FROM node:17-alpine

WORKDIR /mailbirdapp
COPY mailclient ./mailclient
COPY mailserver ./mailserver

WORKDIR /mailbirdapp/mailclient
RUN npm install
RUN npm run build

WORKDIR /mailbirdapp/mailserver
RUN npm install

EXPOSE 4000

CMD ["npm", "run", "start"]






