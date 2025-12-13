# Nginx Ingress Controller Setup

#### Step 1: Install Nginx Ingress Controller
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.9.6/deploy/static/provider/cloud/deploy.yaml
```
#### Step 2: Verify Deployment
```bash
kubectl get pods -n ingress-nginx
```
