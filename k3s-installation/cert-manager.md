# Cert-Manager Installation

#### Step 1: Install Cert-Manager
```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.4/cert-manager.yaml
```
#### Step 2: Verify Cert-Manager Pods
```bash
kubectl get pods -n cert-manager
```
Output will be:
```text
root@micple:~# kubectl get pods -n cert-manager
NAME                                       READY   STATUS    RESTARTS   AGE
cert-manager-5f7b5dbfbc-649xd              1/1     Running   0          4m19s
cert-manager-cainjector-7d5b44bb96-qfxv6   1/1     Running   0          4m19s
cert-manager-webhook-69459b8974-bdpsv      1/1     Running   0          4m19s
```

#### Step 3: Verify Cert-Manager Services
```bash
kubectl get svc -n cert-manager
```
Output will be:
```text
root@micple:~# kubectl get svc -n cert-manager
NAME                   TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
cert-manager           ClusterIP   10.43.241.173   <none>        9402/TCP   4m37s
cert-manager-webhook   ClusterIP   10.43.110.48    <none>        443/TCP    4m37s
```

