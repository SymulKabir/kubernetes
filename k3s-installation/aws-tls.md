# Install App's Deployment and Services
# Next Step (Install Nginx-ingress-controller)
 kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.9.6/deploy/static/provider/cloud/deploy.yaml
# Verify Deployment
kubectl get pods -n ingress-nginx
# Verify Service
kubectl get svc -n ingress-nginx
# Edit ingress-nginx service type LoadBalancer to NodePort
kubectl edit svc ingress-nginx-controller -n ingress-nginx

-> From
 ==>type: LoadBalancer
 ->To
 ==> type: NodePort
# Next Step 
kubectl patch deployment ingress-nginx-controller \
  -n ingress-nginx \
  --type=json \
  -p='[{"op":"add","path":"/spec/template/spec/hostNetwork","value":true}]'

kubectl patch deployment ingress-nginx-controller \
  -n ingress-nginx \
  --type=json \
  -p='[{"op":"replace","path":"/spec/template/spec/dnsPolicy","value":"ClusterFirstWithHostNet"}]'

====>> 'OR' Do it by Edit the Deployment Manually

kubectl edit deployment ingress-nginx-controller -n ingress-nginx

-> Then add this line under "spec.template.spec":
 hostNetwork: true

-> Then find the "spec.template.spec" section and change or add this line:
 dnsPolicy: ClusterFirstWithHostNet

  # Next Step (Deploy ingress.yaml file)
  kubectl apply -f ingress.yaml
  -> your domain should access able from any web browser with http protocol  

  # Next Step (Install Cert-manager for https protocol)
  
  kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.4/cert-manager.yaml


# Next Step (Verify installation)
kubectl get pods --namespace cert-manager

# Next Step (Apply Cluster issuer)
kubectl get apply -f cluster-issuer.yaml

# Next Step (Update ingress.yaml file re-apply it )
-> Update ingress.yaml file with tls configuration
kubectl apply -f ingress.yaml