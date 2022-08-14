# Creating Jenkins Pipeline.
## 1. In Jenkins, Click New Item.

![create_new_item](../images/create-new-item.PNG)

## 2. Fill the name of your pipeline, choose pipeline, than click OK.

![fill_item_information](../images/fill-item-information.PNG)

## 3. Fill the description for your pipeline.

![fill_description](../images/fill-description.PNG)

## 4. Create parameter for your docker account password.

![create_variable_1](../images/create-variable-1.PNG)

Checklist `The project is paramaterized` and click `Add Parameter`. Choose `Password Parameter`. Fill the information needed.

![create_variable_2](../images/create-variable-2.PNG)

## 5. Create pipeline script.

### In this guide, we will create pipeline to create image from our Dockerfile in SCM and push it to docker registry. Open your text editor(ex: VS Code), and start write your pipeline script.

```jenkinsfile
pipeline{
    agent {
		node {
			label 'java11'
		}
	}
    stages{
        stage("SCM Checkout"){
            steps{
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'CleanBeforeCheckout', deleteUntrackedNestedRepositories: true]], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'gitlab', url: 'http://10.8.60.213/root/node-demo/']]])
            }
        }
    }
}
```
We define agent and node block with label `java11` so our pipeline will run on agent with label `java11`.

At the first steps, we want to do SCM Checkout or Git Pull from our SCM. The command will be like above for pull our SCM. Fill the information needed, in this case :

- branches : Master -> we want pull from master branch.
- credentialsId : gitlab -> this is our credential to login to SCM, how to config it will be explained at below.
- url : http://10.8.60.213/root/node-demo/ -> our project url in SCM

```jenkinsfile
pipeline{
    agent {
		node {
			label 'java11'
		}
	}
    stages{
        stage("SCM Checkout"){
            steps{
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'CleanBeforeCheckout', deleteUntrackedNestedRepositories: true]], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'gitlab', url: 'http://10.8.60.213/root/node-demo/']]])
            }
        }
        stage("Create Image"){
            steps{
                sh '''
                docker build -t prospica/demo-pipeline:v1 .
                '''
            }
        }
    }
}
```
Add the next stage to create our image using docker command. Give the tag for our image.

```jenkinsfile
pipeline{
    agent {
		node {
			label 'java11'
		}
	}
    stages{
        stage("SCM Checkout"){
            steps{
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'CleanBeforeCheckout', deleteUntrackedNestedRepositories: true]], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'gitlab', url: 'http://10.8.60.213/root/node-demo/']]])
            }
        }
        stage("Create Image"){
            steps{
                sh '''
                docker build -t prospica/demo-pipeline:v1 .
                '''
            }
        }
        stage("Push Image"){
            steps{
                sh '''
                set +x
                docker login --username=prospica --password=$dockerPassword
                set -x
                docker push prospica/demo-pipeline:v1
                '''
            }
        }
    }
}
```
Add the last stage to push image to our docker hub. First, we need to login to docker, add set +x and set -x so your password doesn't shown in console Jenkins. Push the image with docker push command.

## 6. Insert pipeline script to Jenkins.
### There is two way to insert our pipeline script to Jenkins.

![pipeline_script_type](../images/pipeline-script-type.PNG)

### A. Just write it at Jenkins. 

![pipeline_script_a](../images/pipeline-script-a.PNG)

### B. Write it at your SCM (ex : GitLab) than let Jenkins pull it from SCM.
Put your script in SCM (ex : GitLab), name it with Jenkinsfile.

![scm_jenkinsfile](../images/scm-jenkinsfile.PNG)

Fill the information needed:
- Repository URL = Your GitLab project URL.
- Credentials = Your credential to login to SCM (like step no. 5).
- Branch to build = Branch where Jenkinsfile located.
- Script path = fill this with Jenkinsfile.

![pipeline_script_b_1](../images/pipeline-script-b-1.PNG)
![pipeline_script_b_2](../images/pipeline-script-b-2.PNG)

## 7. Save the configuration.

![save_configuration](../images/save-configuration.PNG)

## 8. Run Your Pipeline.

Click Build with Parameters, then click build. You can change the parameter value too if you want.

![run_pipeline_1](../images/run-pipeline-1.PNG)

![run_pipeline_2](../images/run-pipeline-2.PNG)

## 9. Monitor Your Pipeline.

You can see your stages from Jenkins GUI.

![pipeline_stages](../images/pipeline-stages.PNG)

You can see your console output to check your stages. Click the build number which you want to see then Console Output. From this console output we can see information from our build.

![console_output_1](../images/console-output-1.PNG)

![console_output_2](../images/console-output-2.PNG)

![console_output_3](../images/console-output-3.PNG)

# Make Credentials in Jenkins.
## 1. Go to Jenkins Homepage, Click Manage Jenkins.

![manage_credentials_1](../images/manage-credentials-1.PNG)

## 2. Click Manage Credentials.

![manage_credentials_2](../images/manage-credentials-2.PNG)

## 3. Click Global at The Bottom.

![manage_credentails_3](../images/manage-credentials-3.PNG)

## 4. Click Add Credentials and Fill The Information needed.

![create_credentials_1](../images/create-credentials-1.PNG)

![create_credentials_2](../images/create-credentials-2.PNG)

Because we need credential to login to our SCM, choose username with password in Kind. Fill your SCM username and password. For ID and Description is up to you. Click OK.

![view_credentials](../images/view-credentials.PNG)

You can see the new credentials is created and we can use it if we need it using the ID.