FROM node:14

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

# RUN npm i -g npm@8.7.0

RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install

COPY ./ /usr/src/app

EXPOSE 4201

CMD ["npm", "start"]