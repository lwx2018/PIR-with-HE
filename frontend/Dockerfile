<<<<<<< HEAD
FROM node:18-alpine
=======
FROM node:14.5.0-alpine
>>>>>>> b8f188b (增加PIR相关应用)

WORKDIR /app/
ADD package.json /app/package.json
RUN npm install
ADD . /app/

CMD ["npm", "run", "start"]
