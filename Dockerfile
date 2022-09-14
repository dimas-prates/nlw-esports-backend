############## DEV ##############
ARG VERSION=16.17.0
ARG NODE_ENV=development
FROM node:${VERSION}-alpine AS development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
CMD ["yarn","dev"]

############## PRD ##############
FROM node:${VERSION}-alpine AS production
WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build:prod
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN yarn install --prod
CMD ["yarn","start"]