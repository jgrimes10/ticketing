FROM node:alpine

# set the working directory
WORKDIR /app
# copy over the package.json file
COPY package.json .
# install the dependencies (not dev-dependencies)
RUN npm install --only=prod

# copy over the rest of the project files
COPY . .

# command to run when the image starts up
CMD ["npm", "start"]