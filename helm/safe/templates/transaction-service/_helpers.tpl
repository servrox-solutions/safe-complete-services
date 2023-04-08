{{- define "safe.transaction_service.common_env" -}}
{{- with .Values.transaction_service }}
- name: ETHEREUM_NODE_URL
  value: {{ .etherium.node_url | quote }}
- name: ETHEREUM_TRACING_NODE_URL
  value: {{ .etherium.tracing_node_url | quote }}
- name: ETH_L2_NETWORK
  value: {{ .etherium.l2_network | quote }}
- name: PYTHONPATH
  value: /app/
- name: DJANGO_SETTINGS_MODULE
  value: config.settings.production
- name: DEBUG
  value: {{ .django.debug | quote }}
- name: POSTGRES_HOST
  value: postgresql
- name: POSTGRES_NAME
  value: transaction_service
- name: POSTGRES_USER
  value: postgres
- name: POSTGRES_PASSWORD
  valueFrom:
    secretKeyRef:
      name: postgresql
      key: postgres-password
- name: DATABASE_URL
  value: psql://$(POSTGRES_USER):$(POSTGRES_PASSWORD)@$(POSTGRES_HOST):5432/$(POSTGRES_NAME)
- name: REDIS_URL
  value: redis://$(REDIS_MASTER_SERVICE_HOST):$(REDIS_MASTER_SERVICE_PORT)/1
- name: RABBITMQ_PASSWORD
  valueFrom:
    secretKeyRef:
      name: rabbitmq
      key: rabbitmq-password
- name: CELERY_BROKER_URL
  value: amqp://admin:$(RABBITMQ_PASSWORD)@$(RABBITMQ_SERVICE_HOST)/
- name: GUNICORN_BIND_SOCKET
  value: "unix:/gunicorn/gunicorn.socket"
- name: GUNICORN_BIND_PORT
  value: "8000"
- name: DJANGO_SECRET_KEY
  valueFrom:
    secretKeyRef:
      name: transaction-service
      key: secret-key
- name: POD_IP
  valueFrom:
    fieldRef:
      fieldPath: status.podIP
# allow pod ip for readiness probes
- name: DJANGO_ALLOWED_HOSTS
  value: {{ join "," (list .hostname "$(POD_IP)") }}
- name: DJANGO_SUPERUSER_USERNAME
  value: {{ .django.superuser.username | quote }}
- name: DJANGO_SUPERUSER_EMAIL
  value: {{ .django.superuser.email | quote }}
- name: DJANGO_SUPERUSER_PASSWORD
  valueFrom:
    secretKeyRef:
      name: transaction-service
      key: django-superuser-password
- name: CSRF_TRUSTED_ORIGINS
  value: {{ print "https://" .hostname | quote }}
    {{- end }}
{{- end -}}

{{- define "safe.transaction_service.create_db_container" -}}
name: db-create
image: {{ include "safe.postgresql-util-image" . }}
command: [ bash ]
args:
  - -c
  - |
    while ! pg_isready; do
      echo waiting for postgres to become ready
      sleep 1
    done
    createdb transaction_service || true
env:
  - name: PGHOST
    value: postgresql
  - name: PGUSER
    value: postgres
  - name: PGPASSWORD
    valueFrom:
      secretKeyRef:
        name: postgresql
        key: postgres-password
{{- end -}}
