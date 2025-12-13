# App Deployment and Ingress Setup on Kubernetes
This guide walks you through installing your app, setting up Nginx Ingress Controller, enabling HTTPS with Cert-Manager, and deploying your ingress resources.

---
#### Install Nginx Ingress Controller
```bash
 kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.9.6/deploy/static/provider/cloud/deploy.yaml
```
#### Verify Deployment
```bash
kubectl get pods -n ingress-nginx
```

#### Verify Service
```bash
kubectl get svc -n ingress-nginx
```
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

#### Deploy Ingress Resource
```bash
kubectl apply -f ingress.yaml
```
After this, your domain should be accessible via `HTTP` in any web browser.

#### Install Cert-Manager (for HTTPS)
```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.4/cert-manager.yaml

```

#### Verify Cert-Manager Installation

```bash
kubectl get pods --namespace cert-manager
```

#### Apply ClusterIssuer

```bash
kubectl apply -f cluster-issuer.yaml
```

#### Update Ingress for TLS
- Update `ingress.yaml` with TLS configuration.
- Re-apply the updated ingress file:

```bash
kubectl apply -f ingress.yaml
```
Your domain should now be accessible via HTTPS.
