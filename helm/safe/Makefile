context = gnosis-safe

namespace = poc
release_name = safe

# install / upgrade chart
install: charts
	helm upgrade \
		--install \
		--kube-context ${context} \
		--namespace ${namespace}  \
		--create-namespace \
		${release_name} \
		.

# prints the rendered chart to stdout
template: charts
	helm template \
		--kube-context ${context} \
		--namespace ${namespace}  \
		${release_name} \
		.

uninstall:
	helm delete \
		--kube-context ${context} \
		--namespace ${namespace} \
		${release_name}
	kubectl delete --context ${context} namespace ${namespace}

charts: Chart.yaml
	helm dependency update


ingress_controller_namespace = infra-ingress-controller
ingress_controller_release_name = nginx-ingress-controller

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

uninstall-ingress-controller:
	helm delete \
		--kube-context ${context} \
		--namespace ${ingress_controller_namespace} \
		${ingress_controller_release_name}
	kubectl delete --context ${context} namespace ${ingress_controller_namespace}

cert_manager_namespace = infra-cert-manager
cert_manager_release_name = cert-manager

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


uninstall-cert-manager:
	helm delete \
		--kube-context ${context} \
		--namespace ${cert_manager_namespace} \
		${cert_manager_release_name}
	kubectl delete --context ${context} namespace ${cert_manager_namespace}
