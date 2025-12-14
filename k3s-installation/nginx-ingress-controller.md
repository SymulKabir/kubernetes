# Nginx Ingress Controller Setup

#### Step 1: Install Nginx Ingress Controller
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.9.6/deploy/static/provider/cloud/deploy.yaml
```
#### Step 2: Verify Deployment
```bash
kubectl get pods -n ingress-nginx
```
Output will be:

```text
root@micple:/var/k8s/web# kubectl get pods -n ingress-nginx
NAME                                        READY   STATUS      RESTARTS   AGE
ingress-nginx-admission-create-sgdnj        0/1     Completed   0          63s
ingress-nginx-admission-patch-tcsx7         0/1     Completed   0          63s
ingress-nginx-controller-746445475c-q89x8   0/1     Running     0          63s
```
#### Step 3: Verify Service
```bash
kubectl get svc -n ingress-nginx
```
Output will be:

```text
root@micple:~# kubectl get svc -n ingress-nginx
NAME                                 TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)                      AGE
ingress-nginx-controller             LoadBalancer   10.43.115.40   <pending>     80:32333/TCP,443:31019/TCP   15h
ingress-nginx-controller-admission   ClusterIP      10.43.222.23   <none>        443/TCP                      15h
```
