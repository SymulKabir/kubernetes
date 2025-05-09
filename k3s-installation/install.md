# Step 1

curl -sfL https://get.k3s.io | sh - 


# OR (without Ingress and LoadBalancer)

curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--disable traefik --disable servicelb" sh -

 