FROM --platform=linux/amd64 node:16 

WORKDIR /app
COPY ./package.json ./
RUN yarn install
# If you want to install TypeScript globally (not recommended if it's in package.json)
RUN yarn global add typescript
RUN yarn global add nodemon

COPY . . 

EXPOSE 80

# Copy the .env file
COPY .env .env

# Set environment variables from .env
ENV MONGODB_URI=$MONGODB_URI SECRET=$SECRET BUCKETNAME1=$BUCKETNAME1 BUCKETNAME2=$BUCKETNAME2 BUCKETNAME3=$BUCKETNAME3 GOOGLE_APPLICATION_CREDENTIALS=$GOOGLE_APPLICATION_CREDENTIALS PORT=$PORT

CMD ["npm", "run", "deploy"]