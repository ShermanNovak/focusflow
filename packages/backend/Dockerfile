FROM node:16 

WORKDIR /app
COPY ./package.json ./
RUN yarn install
# If you want to install TypeScript globally (not recommended if it's in package.json)
RUN yarn global add typescript

COPY . . 

EXPOSE 3001

CMD tsc --outDir dist/ && node dist/server.js