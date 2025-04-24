FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
COPY .env .env
RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
