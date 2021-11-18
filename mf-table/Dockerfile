FROM node:12 as development
WORKDIR /app/mf-table
COPY mf-table/package*.json ./
RUN CI=true
RUN npm install
COPY mf-table/ .
USER node
EXPOSE 3010
CMD [ "npm", "start" ]