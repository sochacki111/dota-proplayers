# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --silent

# add app
COPY . .

# start app
CMD ["npm", "start"]