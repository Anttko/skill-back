FROM node:16.20
WORKDIR /usr/src/app
COPY prisma ./prisma
COPY . .
RUN npm install
RUN npx prisma generate
CMD ["npm", "run", "start:dev"]