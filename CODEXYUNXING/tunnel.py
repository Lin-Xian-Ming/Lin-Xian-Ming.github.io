import subprocess, time, sys
print("Starting Bazi server tunnel...")
print("Local: http://localhost:8080")
print("Creating tunnel via serveo.net...")
try:
    p = subprocess.Popen([
        "ssh", "-o", "StrictHostKeyChecking=no",
        "-o", "ServerAliveInterval=10",
        "-R", "80:localhost:8080", "serveo.net"
    ], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    for line in p.stdout:
        print(line, end='')
        if 'Forwarding' in line or 'https://' in line:
            print("\n*** COPY THE URL ABOVE AND OPEN IN YOUR MOBILE BROWSER ***")
except Exception as e:
    print(f"Error: {e}")
    print("Make sure SSH is installed and running")
