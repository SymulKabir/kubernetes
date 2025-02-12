# Fixing Docker Folder Access Issue on macOS via Terminal

## **Problem**
Docker Desktop on macOS does not retain the shared folder path when adding a directory (e.g., `/Users/pranta/temp`) in **Settings → Resources → File Sharing**. As a result, Docker containers cannot access the folder via `hostPath`.

## **Solution: Manually Add the Folder Path to Docker's Settings**

### **Step 1: Quit Docker Desktop**
Before making changes, completely quit Docker Desktop:
```sh
osascript -e 'quit app "Docker"'
```

### **Step 2: Open Docker Settings File**
Open the settings JSON file in a text editor (e.g., `nano` or `vim`):
```sh
nano ~/Library/Group\ Containers/group.com.docker/settings.json
```

### **Step 3: Edit `filesharingDirectories`**
Find the section:
```json
"filesharingDirectories": [
  "/Users",
  "/Volumes",
  "/private",
  "/tmp",
  "/var/folders"
]
```
Add your desired folder path (`/Users/pranta/temp`):
```json
"filesharingDirectories": [
  "/Users/pranta/temp",
  "/Users",
  "/Volumes",
  "/private",
  "/tmp",
  "/var/folders"
]
```
Save and exit (`CTRL + X`, then `Y`, then `Enter`).

### **Step 4: Fix Folder Permissions (Optional, but Recommended)**
Ensure Docker has the necessary permissions:
```sh
sudo chmod -R 777 /Users/pranta/temp
```

### **Step 5: Restart Docker Desktop**
Restart Docker Desktop manually or via the terminal:
```sh
open -a Docker
```
Wait for Docker to start and check **Settings → Resources → File Sharing** to confirm that the folder is now listed.

### **Step 6: Test Folder Access in a Container**
Run the following command to verify:
```sh
docker run --rm -v /Users/pranta/temp:/mnt/test alpine ls -la /mnt/test
```
If the directory contents are listed, the issue is resolved.

## **Alternative Workaround**
If the problem persists, use `/tmp/temp` instead of `/Users/pranta/temp`:
```sh
mkdir -p /tmp/temp
sudo chmod -R 777 /tmp/temp
```
Then update your **Kubernetes YAML** to use `/tmp/temp` instead of `hostPath`.

---
🚀 **Your Docker container should now have access to the folder!** 🚀

