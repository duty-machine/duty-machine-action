FROM node:slim

WORKDIR /usr/app

COPY . .

RUN npm install

ENTRYPOINT ["node", "--unhandled-rejections=strict", "/usr/app/perform.js"]
