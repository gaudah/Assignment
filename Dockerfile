FROM node:carbon

# Create app directory
WORKDIR /usr/src/hapi

# Install app dependencies
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./
RUN npm install pm2 -g

RUN npm install

# Bundle app source
COPY . .

CMD ["pm2-docker", "clusterServer.js"]
