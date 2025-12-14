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

#### (Optional) Stop or Scale Down ingress-nginx Deployment

```bash
kubectl scale deployment ingress-nginx-controller -n ingress-nginx --replicas=0
```

#### (Optonal) Stop or Scale Up ingress-nginx Deployment
```bash
kubectl scale deployment ingress-nginx-controller -n ingress-nginx --replicas=1
```

#### Create Ingress Resource file
```bash
nano ingress.yaml
```
Paste the following configuration into `ingress.yaml`:

```bash
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: micple-ingress
  namespace: default
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  ingressClassName: nginx
  rules:
  - host: micple.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: micple-service
            port:
              number: 80
```

#### Apply the Ingress Resource
Run the following command to apply the Ingress configuration:
```bash
kubectl apply -f ingress.yaml
```
After this, your domain should be accessible via `HTTP` in any web browser.

#### Verify Ingress
Check if the Ingress is created successfully:
```bash
kubectl get ingress
```

You will get like this output:
```bash
root@micple:/var/k8s/web# kubectl get ingress
NAME               CLASS   HOSTS        ADDRESS   PORTS   AGE
micple-ingress     nginx   micple.com             80      15h
```

#### Install Cert-Manager (for HTTPS)
```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.4/cert-manager.yaml
```

#### Verify Cert-Manager Installation

```bash
kubectl get pods --namespace cert-manager
```

#### Apply ClusterIssuer
Create `cluster-issuer.yaml` file:
```bash
nano cluster-issuer.yaml
```
Paste the following configuration:
```text
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    email: saimonpranta@gmail.com
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - http01:
        ingress:
          class: nginx
```
Apply ClusterIssuer Resource
```bash
kubectl apply -f cluster-issuer.yaml
```
#### Verify ClusterIssuer
```bash
root@micple:/var/k8s/web# kubectl get clusterissuer
NAME               READY   AGE
letsencrypt-prod   True    6s
```
#### Update Ingress for TLS (cert-manager)

Update `ingress.yaml` with TLS configuration.
```bash
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: micple-ingress
  namespace: default
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - micple.com
    secretName: micple-com-tls
  rules:
  - host: micple.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: micple-service
            port:
              number: 80
```
Re-apply the updated ingress file:
```bash
kubectl apply -f ingress.yaml
```
Your domain should now be accessible via `HTTPS`

#### Verify certificate & tls


