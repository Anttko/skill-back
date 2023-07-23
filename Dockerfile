FROM node:16.20 as builder
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install 
RUN npm install -g typescript
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:16.20
WORKDIR /usr/src/app
COPY  package*.json .
RUN npm ci --only=production
COPY --from=builder /usr/src/app/build ./build
CMD ["npm", "start"]
