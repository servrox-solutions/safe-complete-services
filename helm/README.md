## EKS cluster setup

### csi driver
required for PV provisioning.

```
# associate clustser with iam oidc provider
eksctl utils associate-iam-oidc-provider --region=eu-central-1 --cluster=<cluster-name> --approve

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
eksctl create addon --name aws-ebs-csi-driver --cluster <cluster-name> --service-account-role-arn arn:aws:iam::<your-account-id>:role/AmazonEKS_EBS_CSI_DriverRole --force
```
