FROM node:14.20.1
RUN npm install express
RUN mkdir /build
COPY /build /build
COPY server.js .
CMD node server