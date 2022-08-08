<div align="center">
    <h1>Jenkins Installation on Container(Docker/Podman)</h1>
</div>
<br></br>
<div>
    <h2>1. Pull Jenkins Image from docker.io repository using podman or docker command</h2>
    <h3>Podman</h3>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <tt>
        podman pull docker.io/jenkins/jenkins:latest
    </tt>   
    <h3>Docker</h3>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <tt>
        docker pull docker.io/jenkins/jenkins:latest
    </tt>
    <h2>2. Run container</h2>
    <h3>Podman</h3>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <tt>
        podman run -d -p 18080:8080 --name Jenkins -v jenkins-data:/var/data/jenkins_home jenkins/jenkins:latest
    </tt>
    <h3>Docker</h3>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <tt>
        docker run -d -p 18080:8080 --name Jenkins -v jenkins-data:/var/data/jenkins_home jenkins/jenkins:latest
    </tt>
    <h2>3. Access Jenkins with localhost:<port>(ex: localhost:18080)</h2>
    <img src="https://github.com/kgfathur/devops-internship/blob/main/images/jenkins-view-first-time.PNG" alt="Jenkins View First Time">
    <h1>Get admin password in /var/jenkins_home/secrets/initialAdminPassword</h1>
    <h3>Podman</h3>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <tt>
        podman exec -it Jenkins cat /var/jenkins_home/secrets/initialAdminPassword
    </tt>
    <h3>Docker</h3>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <tt>
        docker exec -it Jenkins cat /var/jenkins_home/secrets/initialAdminPassword
    </tt>
    <br></br>
    <img src="https://github.com/kgfathur/devops-internship/blob/main/images/jenkins-default-admin-password.PNG" alt="Jenkins Default Admin Password">
    <h2>4. Install recommended plugin</h2>
    <img src="https://github.com/kgfathur/devops-internship/blob/main/images/jenkins-view-plugin-1.PNG" alt="Jenkins Plugin View 1">
    <img src="https://github.com/kgfathur/devops-internship/blob/main/images/jenkins-view-plugin-2.PNG" alt="Jenkins Plugin View 2">
    <h2>5. Create Admin User</h2>
    <img src="https://github.com/kgfathur/devops-internship/blob/main/images/create-admin-user.PNG" alt="Create Admin User">
    <h2>6. Setting Jenkins Url(default=localhost:port)</h2>
    <img src="https://github.com/kgfathur/devops-internship/blob/main/images/jenkins-url-config.PNG" alt="Jenkins URL Config">
    <h2>7. Installation Complete!</h2>
    <img src="https://github.com/kgfathur/devops-internship/blob/main/images/jenkins-installation-finish.PNG" alt="Jenkins Installation Finish">
    <br></br>
    <img src="https://github.com/kgfathur/devops-internship/blob/main/images/jenkins-home.PNG" alt="Jenkins Installation Finish">
</div>
