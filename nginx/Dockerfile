FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY custom-nginx.conf /etc/nginx/conf.d/myapp.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
