context = arn:aws:eks:eu-central-1:471128765712:cluster/gnosis-safe

namespace = safe-shimmer
release_name = safe

# install / upgrade chart
.PHONY: install
install: charts
	if ! kubectl get --context "${context}" namespace "${namespace}" > /dev/null; then \
		kubectl create namespace --context "${context}" "${namespace}"; \
	fi
	if ! kubectl get --context "${context}" -n "${namespace}" secret rabbitmq; then \
		kubectl create secret generic \
			-n "${namespace}" \
			--context "${context}" \
			rabbitmq \
			--from-literal=rabbitmq-password=12345 \
			--from-literal=rabbitmq-erlang-cookie=123456 \
			; \
	fi
	helm upgrade \
		--install \
		--kube-context "${context}" \
		--namespace "${namespace}"  \
		"${release_name}" \
		.

# prints the rendered chart to stdout
.PHONY: template
template: charts
	helm template \
		--kube-context "${context}" \
		--namespace "${namespace}" \
		"${release_name}" \
		.

.PHONY: uninstall
uninstall:
	helm delete \
		--kube-context ${context} \
		--namespace ${namespace} \
		${release_name}
	kubectl delete --context ${context} namespace ${namespace}

.PHONY: forward-flower
forward-flower:
	# forwarding transaction-flower service to localhost:5555
	kubectl port-forward --context "${context}" -n "${namespace}" svc/transaction-flower 5555:80


charts: Chart.yaml
	helm dependency update


ingress_controller_namespace = infra-ingress-controller
ingress_controller_release_name = nginx-ingress-controller

.PHONY: install-ingress-controller
install-ingress-controller:
	helm upgrade \
		--install \
		--create-namespace \
		--kube-context ${context} \
		--namespace ${ingress_controller_namespace} \
		--repo https://kubernetes.github.io/ingress-nginx \
		--version 4.1.4 \
		${ingress_controller_release_name} \
		ingress-nginx \
		-f ingress-controller.yaml

.PHONY: uninstall-ingress-controller
uninstall-ingress-controller:
	helm delete \
		--kube-context ${context} \
		--namespace ${ingress_controller_namespace} \
		${ingress_controller_release_name}
	kubectl delete --context ${context} namespace ${ingress_controller_namespace}

cert_manager_namespace = infra-cert-manager
cert_manager_release_name = cert-manager

.PHONY: install-cert-manager
install-cert-manager:
	helm upgrade \
		--install \
		--create-namespace \
		--kube-context ${context} \
		--namespace ${cert_manager_namespace} \
		--repo https://charts.jetstack.io \
		--version 1.11.0 \
		${cert_manager_release_name} \
		cert-manager \
		--set installCRDs=true
	kubectl apply \
        --context ${context} \
        -f cluster-issuer.yaml


.PHONY: uninstall-cert-manager
uninstall-cert-manager:
	helm delete \
		--kube-context "${context}" \
		--namespace "${cert_manager_namespace}" \
		"${cert_manager_release_name}"
	kubectl delete --context "${context}" namespace "${cert_manager_namespace}"

.PHONY: install-metrics-server
install-metrics-server:
	helm upgrade \
		--install \
		--create-namespace \
		--kube-context ${context} \
		--namespace metrics-server \
		--repo https://kubernetes-sigs.github.io/metrics-server/ \
		--version 3.11.0 \
		metrics-server \
		metrics-server
