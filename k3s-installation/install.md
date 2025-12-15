# K3s Installation

#### Install K3s (Default)
```bash
curl -sfL https://get.k3s.io | sh -
```


#### (Alternative): Install K3s Without Ingress and LoadBalancer (Recommendable)
```bash
curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="--disable traefik --disable servicelb" sh -
```
 
