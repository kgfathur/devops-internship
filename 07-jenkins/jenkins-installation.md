# Jenkins Installation on Container(Docker/Podman)
<div>
  <h1>1. Pull Jenkins Image from docker.io repository using podman or docker command</h1>
  <h3>Podman</h3>
  <tt>
    podman pull docker.io/jenkins/jenkins:latest
  </tt>
  <h3>Docker</h3>
  <tt>
    docker pull docker.io/jenkins/jenkins:latest
  </tt>
  
  <h1>2. Run container</h1>
  <h3>Podman</h3>
  <tt>
    podman run -d -p 18080:8080 --name Jenkins -v jenkins-data:/var/data/jenkins_home jenkins/jenkins:latest
  </tt>
  <h3>Docker</h3>
  <tt>
    docker run -d -p 18080:8080 --name Jenkins -v jenkins-data:/var/data/jenkins_home jenkins/jenkins:latest
  </tt>
  
  <h1>3. Access Jenkins with localhost:<port>(ex: localhost:18080)</h1>
  <img src="https://github.com/kgfathur/devops-internship/blob/main/images/jenkins-view-first-time.PNG" alt="Jenkins View First Time">
  <h1>Get admin password in /var/jenkins_home/secrets/initialAdminPassword</h1>
  <h3>Podman</h3>
  <tt>
    podman exec -it Jenkins cat /var/jenkins_home/secrets/initialAdminPassword
  </tt>
  <h3>Docker</h3>
  <tt>
    docker exec -it Jenkins cat /var/jenkins_home/secrets/initialAdminPassword
  </tt>
  <br></br>
  <img src="https://github.com/kgfathur/devops-internship/blob/main/images/jenkins-default-admin-password.PNG" alt="Jenkins Default Admin Password">
  
  <h1>4. Install recommended plugin</h1>
  <img src="https://github.com/kgfathur/devops-internship/blob/main/images/jenkins-view-plugin-1.PNG" alt="Jenkins Plugin View 1">
  <img src="https://github.com/kgfathur/devops-internship/blob/main/images/jenkins-view-plugin-2.PNG" alt="Jenkins Plugin View 2">
  
  <h1>5. Create Admin User</h1>
  <img src="https://github.com/kgfathur/devops-internship/blob/main/images/create-admin-user.PNG" alt="Create Admin User">
  
  <h1>6. Setting Jenkins Url(default=localhost:port)</h1>
  <img src="https://github.com/kgfathur/devops-internship/blob/main/images/jenkins-url-config.PNG" alt="Jenkins URL Config">
  
  <h1>7. Installation Complete!</h1>
  <img src="https://github.com/kgfathur/devops-internship/blob/main/images/jenkins-installation-finish.PNG" alt="Jenkins Installation Finish">
  <br></br>
  <img src="https://github.com/kgfathur/devops-internship/blob/main/images/jenkins-home.PNG" alt="Jenkins Installation Finish">
</div>
