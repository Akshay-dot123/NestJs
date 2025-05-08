FROM node:16
WORKDIR /akshay/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node","dist/main"]