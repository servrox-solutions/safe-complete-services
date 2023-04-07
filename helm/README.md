## EKS cluster setup

### setup cluster access
```
aws eks update-kubeconfig --region eu-central-1 --name gnosis-safe --kubeconfig ~/.kube/gnosis-safe.config

# in your .zshrc:
export KUBECONFIG+=":~/.kube/gnosis-safe.config"
```

### IAM setup
```
# associate clustser with iam oidc provider
eksctl utils associate-iam-oidc-provider --region=eu-central-1 --cluster=gnosis-safe --approve
```

### grant cluster admin permissions
```
# example on how to add mm@servrox.solutions as cluster admin
eksctl create iamidentitymapping --cluster gnosis-safe --arn arn:aws:iam::471128765712:user/mm@servrox.solutions --group system:masters --username mm@servrox.solutions
```

### csi driver
required for PV provisioning.

```

# create iam role for csi driver
eksctl create iamserviceaccount \
  --name ebs-csi-controller-sa \
  --namespace kube-system \
  --cluster <cluster-name> \
  --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \
  --approve \
  --role-only \
  --role-name AmazonEKS_EBS_CSI_DriverRole
  
# install csi driver addon
eksctl create addon --name aws-ebs-csi-driver --cluster gnosis-safe --service-account-role-arn arn:aws:iam::471128765712:role/AmazonEKS_EBS_CSI_DriverRole --force
```

