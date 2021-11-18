FROM node:12 as development
WORKDIR /app/container
COPY container/package*.json ./
RUN CI=true
RUN npm install
COPY container/ .
USER node
EXPOSE 3000
CMD [ "npm", "start" ]