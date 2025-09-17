<div align="center">

## Kubernetes

</div>

### Essential Commands

Below are the most commonly used **kubectl** commands with their descriptions:

```bash
kubectl version
```
Show the Kubernetes client and server version.

```bash
kubectl cluster-info
```
Display information about the cluster.

```bash
kubectl config
```
View or modify kubeconfig settings.

```bash
kubectl get nodes
```
List all nodes in the cluster.

```bash
kubectl get pods
```
List all pods in the current namespace.

```bash
kubectl get services
```
List all services in the current namespace.

```bash
kubectl get namespaces or (ns)
```
List all namespaces in the cluster.

```bash
kubectl create ns/pod/deployment/service/configmap
```
Create a namespace, pod, deployment, service, or configmap.

```bash
kubectl describe pod <pod_name>
```
Show detailed information about a pod.

```bash
kubectl logs <pod_name>
```
Fetch logs of a specific pod.

```bash
kubectl exec -it <pod_name> -- /bin/bash
```
Execute a command inside a running pod (interactive shell).

```bash
kubectl create -f <file>.yaml
```
Create resources defined in a YAML file.

```bash
kubectl apply -f <file>.yaml
```
Apply changes from a YAML file (create or update resources).

```bash
kubectl delete -f <file>.yaml
```
Delete resources defined in a YAML file.

```bash
kubectl expose pod <pod> --type=NodePort --port=80
```
Expose a pod as a service accessible on NodePort 80.

```bash
kubectl scale deployment <name> --replicas=3
```
Scale a deployment to the specified number of replicas.

```bash
kubectl rollout status deployment/<name>
```
Check the rollout status of a deployment.

```bash
kubectl rollout undo deployment/<name>
```
Undo the last deployment rollout.

```bash
kubectl config view
```
View kubeconfig settings.

```bash
kubectl config use-context <context>
```
Switch to a different context in the kubeconfig.
