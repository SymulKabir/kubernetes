## k3s Worker Node Installation Guide
This guide explains how to add a worker node (`k3s-agent`) to your existing k3s cluster.



#### Architecture (Your Setup)

- **Server 1**
  - Role: k3s server (control-plane) + worker
  - Example IP: `192.168.68.68`

- **Server 2 (`k3s-worker-1`)**
  - Role: k3s agent (worker only)
  - IP: `192.168.68.69`

- **Network:** Same LAN ✅ (recommended)

---

#### On Server 1 (Master) — Get Node Token
```bash
sudo cat /var/lib/rancher/k3s/server/node-token 
``` 
Example output:
```txt
K10a3b7c...::server:xxxxxxxx
```
👉 Copy this token (you’ll need it on Server 2).

#### Make Sure Required Ports Are Open
On Server 1 firewall/router:
- `6443/tcp` → Kubernetes API (must be reachable)
- `8472/udp` → Flannel VXLAN (default k3s CNI

Quick test from Server 2:
```bash
nc -zv 192.168.68.10 6443
```
### Install k3s Agent on Server 2 (k3s-worker-1)

#### Change hostname on WORKER (192.168.68.74)
```bash
hostnamectl set-hostname k3s-worker-1
reboot
```
⚠️ Do NOT skip reboot 

#### Clean previous installation and agent
```bash
sudo systemctl stop k3s-agent
sudo /usr/local/bin/k3s-agent-uninstall.sh
sudo rm -f /etc/systemd/system/k3s-agent.service.env
sudo rm -f /etc/systemd/system/k3s-agent.service
sudo rm -rf /etc/rancher /var/lib/rancher
```

#### Install k3s Agent on Server 2 (k3s-worker-1)
```bash
curl -sfL https://get.k3s.io | \
K3S_URL=https://192.168.68.68:6443 \
K3S_TOKEN=K10e3422f288f8b068e3ca59b276248dc84909c793456f05bc12e3868a57d948264::server:5c329ba997039a888d3a961bd9623fbf \
K3S_NODE_IP=192.168.68.69 \
K3S_NODE_NAME=k3s-worker-1 \
sh -
```
✅ This installs k3s-agent and auto-joins the cluster.

#### Verify Node Joined (Server 1)
Back on Server 1:
```bash
kubectl get nodes -o wide
```

Expected output:
```bash
root@micple:/var/micple.com/panel/frontend# kubectl get nodes -o wide
NAME           STATUS   ROLES                  AGE     VERSION        INTERNAL-IP     EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION       CONTAINER-RUNTIME
k3s-worker-1   Ready    <none>                 2m21s   v1.33.6+k3s1   192.168.68.69   <none>        Ubuntu 22.04.4 LTS   5.15.0-164-generic   containerd://2.1.5-k3s1.33
micple         Ready    control-plane,master   4d19h   v1.33.6+k3s1   192.168.68.68   <none>        Ubuntu 24.04.3 LTS   6.8.0-88-generic     containerd://2.1.5-k3s1.33
```
🎉 Server 2 is now a worker node!



