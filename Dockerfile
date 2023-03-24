FROM node:14.17-alpine AS build

WORKDIR /var/vost-admin
COPY package.json ./
RUN rm -rf /var/vost-admin/node_modules/
RUN npm install
RUN chmod -R a+x /var/vost-admin/node_modules
COPY . .
RUN npm run build --unsafe-perm




FROM nginx:latest
COPY --from=build /var/vost-admin/dist /var/vos-admin
COPY default-nginx.conf /etc/nginx/conf.d/default.conf

# COPY ./dist /usr/share/nginx/html
# COPY default-nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80