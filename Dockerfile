FROM node:boron

WORKDIR /home/app

COPY app/ ./

RUN cd -

EXPOSE 8080

CMD ["npm","start"]
