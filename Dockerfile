FROM node:16-alpine as node
ADD *.json ./
RUN npm install
ADD . .
RUN REACT_APP_BACKEND_URL=http://deanartdev.site npm run build

FROM nginx:1.13
COPY --from=node ./build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80