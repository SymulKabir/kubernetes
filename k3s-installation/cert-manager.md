# Cert-Manager Installation

#### Step 1: Install Cert-Manager
```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.4/cert-manager.yaml
```
#### Step 2: Verify Cert-Manager Pods
```
kubectl get pods -n cert-manager
```


