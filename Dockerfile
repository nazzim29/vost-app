FROM node:12.7-alpine AS build

WORKDIR /var/vost-admin
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build




FROM nginx:latest
COPY --from=build /var/vost-admin/dist /var/vos-admin
COPY default-nginx.conf /etc/nginx/conf.d/default.conf

# COPY ./dist /usr/share/nginx/html
# COPY default-nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80