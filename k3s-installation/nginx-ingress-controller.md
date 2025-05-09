# Step 1

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.9.6/deploy/static/provider/cloud/deploy.yaml


# Step 2  (Verify deployment)

kubectl get pods -n ingress-nginx
