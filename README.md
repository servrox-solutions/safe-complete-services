# safe-complete-services

Collection of all required safe services, which can be run locally by a single docker-compose.yml.

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

<!-- ## Setup

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

cp ./safe-client-gateway/.env.sample ./safe-client-gateway/.dev.env

-> inside safe-client-gateway/nginx/templates/nginx.conf.template use gateway-web instead of web
upstream app_server {
ip_hash; # For load-balancing
server gateway-web:${ROCKET_PORT} fail_timeout=0;
keepalive 32;
}

safe-transaction-service/docker/web/run_web.sh
-> add django account creation

safe-transaction-service/.env.dev
-> add envs

change port for second db to 5432 (transaction-db)

change transaction-redis port to 6380 in yml + ./safe-complete-services/safe-transaction-service/.env.dev

replace db to transaction-db -> DATABASE_URL=psql://postgres:postgres@transaction-db:5433/postgres

     -Q "${WORKER_QUEUES}"

# TODO: remove this line from safe-transaction-service/.env.dev as it should be passed in docker-compose.yaml for each worker instance separatly

WORKER_QUEUES="contracts,tokens"

# TODO

- delete csrf
- fix WORKER_QUEUES -->
