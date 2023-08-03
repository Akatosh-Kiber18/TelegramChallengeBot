FROM node:18 as build

WORKDIR /usr/src/LypaFront

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /usr/src/LypaFront

COPY --from=build /usr/src/LypaFront/build ./build

RUN npm install -g serve

CMD ["serve", "-s", "build"]