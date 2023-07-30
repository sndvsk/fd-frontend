# Stage 1: Build the Angular app
FROM node:16 as build

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

RUN npm install

# add app
COPY . /usr/src/app

EXPOSE 4200

RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:latest

COPY --from=build /usr/src/app/dist/fd-frontend /usr/share/nginx/html

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80