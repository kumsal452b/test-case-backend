###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:alpine As development

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY  package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm install

# Bundle app source
COPY . .

RUN npm run build
 
FROM node:alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=prod

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]