#### Edit ingress-nginx Change the `ingress-nginx-controller` service type from `LoadBalancer` to `NodePort`:
```bash
kubectl edit svc ingress-nginx-controller -n ingress-nginx
```
Modify:

```yaml
type: LoadBalancer
```

To:

```yaml
type: NodePort
```
 
### Update Deployment for Host Networking
#### Option 1: Using `kubectl patch`
```bash
kubectl patch deployment ingress-nginx-controller \
  -n ingress-nginx \
  --type=json \
  -p='[{"op":"add","path":"/spec/template/spec/hostNetwork","value":true}]'

kubectl patch deployment ingress-nginx-controller \
  -n ingress-nginx \
  --type=json \
  -p='[{"op":"replace","path":"/spec/template/spec/dnsPolicy","value":"ClusterFirstWithHostNet"}]'
```
#### Option 2: Edit Deployment Manually
```bash
kubectl edit deployment ingress-nginx-controller -n ingress-nginx
```

Add under `spec.template.spec`:

```yaml
hostNetwork: true
dnsPolicy: ClusterFirstWithHostNet
```
