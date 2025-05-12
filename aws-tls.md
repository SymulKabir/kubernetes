# Install App Deployment and Services
# Next Step (Install Nginx-ingress-controller)
 kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.9.6/deploy/static/provider/cloud/deploy.yaml
# Verify Deployment
kubectl get pods -n ingress-nginx
# Verify Service
kubectl get svc -n ingress-nginx
# Edit ingress-nginx service type LoadBalancer to Nodeport
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

  # Next Step (Deploy ingress.yaml file)
  kubectl apply -f ingress.yaml

  
