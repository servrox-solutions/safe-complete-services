# safe-complete-services

## Setup


# Django user for http://localhost:8080/admin/
DJANGO_SUPERUSER_PASSWORD=admin
DJANGO_SUPERUSER_EMAIL=servrox@1337.wf
DJANGO_SUPERUSER_USERNAME=admin


```bash
cp ./safe-client-gateway/.env.sample ./safe-client-gateway/.env
docker-compose up
```

# The Base URL of the Safe Config Service (https://github.com/gnosis/safe-config-service)
CONFIG_SERVICE_URI=http://config-nginx

# The port exposed to the host by the nginx image.
NGINX_HOST_PORT=8090

DJANGO_ALLOWED_HOSTS=".localhost,127.0.0.1,[::1],config-nginx"

