FROM node:16-alpine
RUN mkdir -p /var/www/app
WORKDIR /var/www/app/
COPY . /var/www/app/
RUN npm install
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]