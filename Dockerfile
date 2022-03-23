FROM node:16-alpine as node
ADD *.json ./
RUN npm install
ADD . .
RUN npm run build

FROM nginx:1.21.6-alpine
COPY --from=node ./build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000