FROM nginx:stable
COPY / /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
RUN rm ./backend -rf
RUN rm ./static -rf

EXPOSE 80