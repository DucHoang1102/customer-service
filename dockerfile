FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN npm install --production
# For production
RUN npm ci --only=production

EXPOSE 8080

CMD [ "node", "app.js" ]