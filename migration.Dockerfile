FROM node:16.20-alpine
WORKDIR /usr/src/app
COPY prisma ./prisma
COPY . .
RUN npm install
RUN npx prisma generate
