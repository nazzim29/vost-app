FROM node:12.7-alpine AS build

WORKDIR /var/vost-admin
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build



COPY --from=build /var/vost-front/dist /var/vos-front
COPY default-nginx.conf /etc/nginx/conf.d/default.conf

FROM nginx:latest

COPY ./dist /usr/share/nginx/html
COPY default-nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80