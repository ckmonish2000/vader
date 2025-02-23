import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const commands = await prisma.command.createMany({
    data: [
      // System Information
      {
        title: 'Get OS Information',
        cmd: 'uname -s && uname -r && uname -m',
        type: 'DEFAULT',
        isInputAllowed: false,
      },
      {
        title: 'Get CPU Information',
        cmd: 'lscpu | grep "Model name"',
        type: 'DEFAULT',
        isInputAllowed: false,
      },
      {
        title: 'Get Memory Usage',
        cmd: 'free -h | grep Mem | awk \'{print $3 "/" $2}\'',
        type: 'DEFAULT',
        isInputAllowed: false,
      },
      {
        title: 'Get Disk Usage',
        cmd: 'df -h / | grep / | awk \'{print $3 "/" $2 " (" $5 " used)"}\'',
        type: 'DEFAULT',
        isInputAllowed: false,
      },
      {
        title: 'Get Shell Information',
        cmd: '$SHELL --version',
        type: 'DEFAULT',
        isInputAllowed: false,
      },

      // Node.js & NPM Information
      {
        title: 'Get Node.js Version',
        cmd: 'node -v',
        type: 'DEFAULT',
        isInputAllowed: false,
      },
      {
        title: 'Get NPM Version',
        cmd: 'npm -v',
        type: 'DEFAULT',
        isInputAllowed: false,
      },
      {
        title: 'Get Installed Dependencies',
        cmd: 'jq -r \'.dependencies | to_entries | map("\\(.key)@\\(.value)") | .[]\' package.json',
        type: 'DEFAULT',
        isInputAllowed: false,
      },

      // Network & Connectivity Checks
      {
        title: 'Check Internet Connectivity',
        cmd: 'ping -c 3 8.8.8.8',
        type: 'DEFAULT',
        isInputAllowed: false,
      },
      {
        title: 'Check DNS Resolution',
        cmd: 'nslookup google.com',
        type: 'DEFAULT',
        isInputAllowed: false,
      },
      {
        title: 'Check Open Ports (Requires netstat)',
        cmd: 'netstat -tulnp 2>/dev/null || ss -tulnp',
        type: 'DEFAULT',
        isInputAllowed: false,
      },
      {
        title: 'Check Localhost Availability',
        cmd: 'curl -I http://localhost:3000 || echo "Service not available"',
        type: 'DEFAULT',
        isInputAllowed: false,
      },

      // Git & Version Control Checks
      {
        title: 'Get Git Version',
        cmd: 'git --version',
        type: 'DEFAULT',
        isInputAllowed: false,
      },
      {
        title: 'Check Git Remote URL',
        cmd: 'git remote -v',
        type: 'DEFAULT',
        isInputAllowed: false,
      },
      {
        title: 'Check Uncommitted Changes',
        cmd: 'git status --short',
        type: 'DEFAULT',
        isInputAllowed: false,
      },

      // Docker & Kubernetes Checks
      {
        title: 'Get Docker Version',
        cmd: 'docker -v',
        type: 'DEFAULT',
        isInputAllowed: false,
      },
      {
        title: 'List Running Docker Containers',
        cmd: 'docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}"',
        type: 'DEFAULT',
        isInputAllowed: false,
      },
      {
        title: 'List All Docker Containers',
        cmd: 'docker ps -a --format "table {{.ID}}\t{{.Names}}\t{{.Status}}"',
        type: 'DEFAULT',
        isInputAllowed: false,
      },
      {
        title: 'Get Kubernetes Cluster Info',
        cmd: 'kubectl cluster-info',
        type: 'DEFAULT',
        isInputAllowed: false,
      },
      {
        title: 'List Kubernetes Pods',
        cmd: 'kubectl get pods -A',
        type: 'DEFAULT',
        isInputAllowed: false,
      },

      // Environment Variables
      {
        title: 'Check Specific Environment Variable',
        cmd: 'echo $MY_ENV_VAR',
        type: 'DEFAULT',
        isInputAllowed: true,
      },

      // Python & PIP Information
      {
        title: 'Get Python Version',
        cmd: 'python3 --version',
        type: 'DEFAULT',
        isInputAllowed: false,
      },
      {
        title: 'Get PIP Version',
        cmd: 'pip3 --version',
        type: 'DEFAULT',
        isInputAllowed: false,
      },
      {
        title: 'List Installed Python Packages',
        cmd: 'pip3 list',
        type: 'DEFAULT',
        isInputAllowed: false,
      },

      // Security & User Context
      {
        title: 'Check Current User',
        cmd: 'whoami',
        type: 'DEFAULT',
        isInputAllowed: false,
      },

      // System Uptime
      {
        title: 'Check System Uptime',
        cmd: 'uptime -p',
        type: 'DEFAULT',
        isInputAllowed: false,
      },

      // Time & Date
      {
        title: 'Get System Date & Time',
        cmd: 'date',
        type: 'DEFAULT',
        isInputAllowed: false,
      },
      {
        title: 'Get Timezone',
        cmd: 'timedatectl | grep "Time zone"',
        type: 'DEFAULT',
        isInputAllowed: false,
      },

      // Additional Commands from Previous Object

      {
        title: 'Get Disk Usage for Specific Directory',
        cmd: 'df -h $1 | grep / | awk \'{print $3 "/" $2 " (" $5 " used)"}\'',
        type: 'DEFAULT',
        isInputAllowed: true,
      },
      {
        title: 'Search for a Process by Name',
        cmd: 'ps aux | grep $1',
        type: 'DEFAULT',
        isInputAllowed: true,
      },
      {
        title: 'Check Disk Space for Specific Directory',
        cmd: 'du -sh $1',
        type: 'DEFAULT',
        isInputAllowed: true,
      },
      {
        title: 'Check Specific Service Status',
        cmd: 'systemctl status $1',
        type: 'DEFAULT',
        isInputAllowed: true,
      },
      {
        title: 'Check the Last Login for User',
        cmd: 'last $1',
        type: 'DEFAULT',
        isInputAllowed: true,
      },
      {
        title: 'Find Files by Name',
        cmd: 'find / -name "$1"',
        type: 'DEFAULT',
        isInputAllowed: true,
      },
      {
        title: 'Get the Version of a Specific Package',
        cmd: 'dpkg -l | grep $1',
        type: 'DEFAULT',
        isInputAllowed: true,
      },
      {
        title: 'Check Docker Container Status',
        cmd: 'docker ps -a | grep $1',
        type: 'DEFAULT',
        isInputAllowed: true,
      },
      {
        title: 'View Docker Container Logs',
        cmd: 'docker logs $1',
        type: 'DEFAULT',
        isInputAllowed: true,
      },
      {
        title: 'Inspect Docker Image',
        cmd: 'docker inspect $1',
        type: 'DEFAULT',
        isInputAllowed: true,
      },
      {
        title: 'Check Docker Container Resource Usage',
        cmd: 'docker stats $1',
        type: 'DEFAULT',
        isInputAllowed: true,
      },
      {
        title: 'Check Systemd Service Status',
        cmd: 'systemctl status $1',
        type: 'DEFAULT',
        isInputAllowed: true,
      },
      {
        title: 'Check Installed Version of a Package',
        cmd: 'dpkg -l | grep $1',
        type: 'DEFAULT',
        isInputAllowed: true,
      },
      {
        title: 'Get Kubernetes Pod Logs',
        cmd: 'kubectl logs $1',
        type: 'DEFAULT',
        isInputAllowed: true,
      },
      {
        title: 'Get Kubernetes Pod Status',
        cmd: 'kubectl get pod $1',
        type: 'DEFAULT',
        isInputAllowed: true,
      },
      // 🖥️ System Information
      {
        title: 'Get OS Name & Version',
        cmd: 'cat /etc/os-release | grep -E "NAME|VERSION"',
        type: 'DEFAULT',
      },
      {
        title: 'Get Kernel Version',
        cmd: 'uname -r',
        type: 'DEFAULT',
      },
      {
        title: 'Get CPU Architecture',
        cmd: 'uname -m',
        type: 'DEFAULT',
      },
      {
        title: 'Get Total Memory',
        cmd: "free -h | grep Mem | awk '{print $2}'",
        type: 'DEFAULT',
      },
      {
        title: 'Get Disk Usage (Root Partition)',
        cmd: 'df -h / | awk \'NR==2 {print $3 "/" $2 " (" $5 " used)"}\'',
        type: 'DEFAULT',
      },
      {
        title: 'List Mounted File Systems',
        cmd: 'mount | column -t',
        type: 'DEFAULT',
      },
      {
        title: 'List Block Storage Devices',
        cmd: 'lsblk -o NAME,FSTYPE,SIZE,MOUNTPOINT',
        type: 'DEFAULT',
      },

      // 🌐 Network Information
      {
        title: 'Get Hostname',
        cmd: 'hostname',
        type: 'DEFAULT',
      },
      {
        title: 'Get Local IP Address',
        cmd: "hostname -I | awk '{print $1}'",
        type: 'DEFAULT',
      },
      {
        title: 'List Active Network Interfaces',
        cmd: 'ip -br a',
        type: 'DEFAULT',
      },
      {
        title: 'Check Default Gateway',
        cmd: 'ip r | grep default',
        type: 'DEFAULT',
      },
      {
        title: 'Check DNS Servers',
        cmd: 'cat /etc/resolv.conf | grep nameserver',
        type: 'DEFAULT',
      },

      // 🔧 Process & Performance Monitoring
      {
        title: 'Get System Load Average (Last 1, 5, 15 min)',
        cmd: 'uptime | awk -F "load average:" \'{print $2}\'',
        type: 'DEFAULT',
      },
      {
        title: 'Get Top 5 CPU-Consuming Processes',
        cmd: 'ps -eo pid,comm,%cpu --sort=-%cpu | head -6',
        type: 'DEFAULT',
      },
      {
        title: 'Get Top 5 Memory-Consuming Processes',
        cmd: 'ps -eo pid,comm,%mem --sort=-%mem | head -6',
        type: 'DEFAULT',
      },

      // 🔍 Logs & System State (Read-Only)
      {
        title: 'Last System Boot Time',
        cmd: 'who -b',
        type: 'DEFAULT',
      },
      {
        title: 'Check Last 5 System Reboots',
        cmd: 'last reboot | head -5',
        type: 'DEFAULT',
      },
      {
        title: 'Check Kernel Log Messages (Last 10 Entries)',
        cmd: 'dmesg | tail -10',
        type: 'DEFAULT',
      },

      // 🛠 Package & Software Version Checks
      {
        title: 'Get Installed Node.js Version',
        cmd: 'node -v',
        type: 'DEFAULT',
      },
      {
        title: 'Get Installed NPM Version',
        cmd: 'npm -v',
        type: 'DEFAULT',
      },
      {
        title: 'Get Installed Python Version',
        cmd: 'python3 --version',
        type: 'DEFAULT',
      },
      {
        title: 'Get Installed PIP Version',
        cmd: 'pip3 --version',
        type: 'DEFAULT',
      },
      {
        title: 'Get Installed Docker Version',
        cmd: 'docker -v',
        type: 'DEFAULT',
      },
      {
        title: 'List Running Docker Containers',
        cmd: 'docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Status}}"',
        type: 'DEFAULT',
      },
      {
        title: 'List All Docker Containers',
        cmd: 'docker ps -a --format "table {{.ID}}\t{{.Names}}\t{{.Status}}"',
        type: 'DEFAULT',
      },
      {
        title: 'Check Kubernetes Cluster Info',
        cmd: 'kubectl cluster-info',
        type: 'DEFAULT',
      },
      {
        title: 'List Kubernetes Nodes',
        cmd: 'kubectl get nodes',
        type: 'DEFAULT',
      },
      {
        title: 'List Kubernetes Pods (All Namespaces)',
        cmd: 'kubectl get pods -A',
        type: 'DEFAULT',
      },
    ],
  });
  console.log({ commands });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
