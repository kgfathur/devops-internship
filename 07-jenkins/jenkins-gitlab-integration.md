# Jenkins & Gitlab Integration

## 1. Download Gitlab Plugin for Jenkins (If not Already Exist)

### Go to Manage Jenkins and Choose Manage Plugins

![manage_plugin](../images/manage-jenkins.PNG)

### Choose Availabe Options, Search GitLab 

Checklist GitLab Plugin, then klik Download now and install after restart.
 
![download_gitlab_plugin](../images/download-gitlab-plugin.PNG)

### Wait Until Installation Finish

![plugin_installation_complete](../images/plugin-installation-complete.PNG)

## 2. Wait for Jenkins to Restart
### If You Are Impatient Restart Jenkins Service with Systemctl(at your own risk)
```bash
systemctl restart jenkins
```

## 3. Configure Connection to Gitlab
### Go to Manage Jenkins and Choose Configure System

![configure_system](../images/configure-system.PNG)

### Find Gitlab
Checklist Enable Authentication for '/project' end-point so Jenkins can see project in Gitlab.

![configure_gitlab_plugin_1](../images/configure-gitlab-plugin-1.PNG)

Click add, fill Connection Name (this is up to you) and Gitlab Host URL (your Gitlab URL)

![configure_gitlab_plugin_2](../images/configure-gitlab-plugin-2.PNG)

For credentials click add and choose Jenkins, you will prompt with new windows

![configure_gitlab_plugin_3](../images/configure-gitlab-plugin-3.PNG)

Choose Global credentials and change kind to GitLab API Token

![configure_gitlab_plugin_4](../images/configure-gitlab-plugin-4.PNG)

Now open your GitLab, we need Personal Access Token from GitLab to give authorization to our Jenkins.

Choose which user in your GitLab that Jenkins can use for Authorization `IMPORTANT!!! JENKINS CAN ONLY SEE WHAT THIS USER SEE!!!`.

In this case, we use user Administrator so Jenkins can see all project in GitLab. 

Login your GitLab with that user, then choose Edit Profile

![gitlab_token_1](../images/gitlab-token-1.PNG)

On the side bar, click Access Token

![gitlab_token_2](../images/gitlab-token-2.PNG)

Fill Token Name(up to you), Expiration Date (leave empty if you want this token won't expired), checklist api and read_repository (you can give more access if you want).

![gitlab_token_3](../images/gitlab-token-3.PNG)

You will get your new personal access token. `IMPORTANT!!! SAVE THIS TOKEN SOMEWHERE SAFE BECAUSE YOU CAN'T SEE IT AGAIN`

![gitlab_token_3](../images/gitlab-token-4.PNG)

Copy the token, and go back to Jenkins. Paste the token to API Token, and fill the rest. Click Add.

![configure_gitlab_plugin_4](../images/configure-gitlab-plugin-5.PNG)

In Credentials, choose the new credential that we just made.

![configure_gitlab_plugin_4](../images/configure-gitlab-plugin-6.PNG)

Click Test Connection to test our config. If the config is right, there will be Success text at the right bottom.

![configure_gitlab_plugin_4](../images/configure-gitlab-plugin-7.PNG)

## 4. Congratulation! Jenkins now connected with GitLab!
