# MetalLB Setup on K3s (Without Default Ingress/LoadBalancer)

#### Step 1: Install MetalLB
```bash
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.14.9/config/manifests/metallb-native.yaml
```
#### Step 2: Configure IP Address Pool and L2 Advertisement
```bash
cat <<EOF | kubectl apply -f -
apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: my-ip-pool
  namespace: metallb-system
spec:
  addresses:
  - 192.168.1.240-192.168.1.250
---
apiVersion: metallb.io/v1beta1
kind: L2Advertisement
metadata:
  name: l2-advert
  namespace: metallb-system
spec:
  ipAddressPools:
  - my-ip-pool
EOF
```

# Step 3 (Test with a LoadBalancer service)
```bash
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --port=80 --type=LoadBalancer
```

After this, MetalLB will assign an IP from the pool to your Nginx service. You can access it via the assigned IP.





