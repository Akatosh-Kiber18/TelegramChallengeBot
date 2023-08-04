FROM nginx:alpine

RUN apt-get update && apt-get install -y certbot python3-certbot-nginx

RUN rm /etc/nginx/conf.d/default.conf

COPY custom-nginx.conf /etc/nginx/conf.d/myapp.conf

EXPOSE 80
EXPOSE 443

CMD ["bash", "-c", "certbot certonly --webroot -w /usr/src/LypaFront/build -d lypacha.com -d www.lypacha.com --non-interactive --agree-tos --email cemper300@gmail.com && nginx -g \"daemon off;\""]