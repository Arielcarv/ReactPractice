# Build the react app
FROM node:latest as build 
WORKDIR /react-app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Copy the build to the nginx container
FROM nginx:latest
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /react-app/dist /usr/share/nginx/html

