#!/bin/bash

set -euo pipefail

echo "==> $(date +%H:%M:%S) ==> Collecting static files..."
python src/manage.py collectstatic --noinput
rm -rf ${DOCKER_NGINX_VOLUME_ROOT}/*
cp -r staticfiles/ ${DOCKER_NGINX_VOLUME_ROOT}/

echo "==> $(date +%H:%M:%S) ==> Migrating Django models..."
python src/manage.py migrate --noinput

echo "==> $(date +%H:%M:%S) ==> Creating Django user..."
python src/manage.py makemigrations
python src/manage.py migrate
python src/manage.py createcachetable

if [ "$DJANGO_SUPERUSER_USERNAME" ]
then
    python src/manage.py createsuperuser \
        --noinput \
        --username $DJANGO_SUPERUSER_USERNAME \
        --email $DJANGO_SUPERUSER_EMAIL \
        || true
fi

$@

echo "==> $(date +%H:%M:%S) ==> Running Gunicorn..."
exec gunicorn -c /app/src/config/gunicorn.py config.wsgi -b ${GUNICORN_BIND_SOCKET} -b 0.0.0.0:${GUNICORN_BIND_PORT} --chdir /app/src/