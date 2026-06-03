sudo systemctl stop k3s
sudo systemctl disable k3s

sudo systemctl stop k3s-agent
sudo systemctl disable k3s-agent

sudo /usr/local/bin/k3s-uninstall.sh
sudo /usr/local/bin/k3s-agent-uninstall.sh

sudo rm -rf /etc/rancher/k3s
sudo rm -rf /var/lib/rancher/k3s
sudo rm -rf /var/lib/kubelet
sudo rm -rf /var/lib/cni
sudo rm -rf /etc/cni
sudo rm -rf /opt/cni
sudo rm -rf /run/k3s

rm -rf ~/.kube

sudo rm -rf /var/lib/containerd
sudo rm -rf /run/containerd
