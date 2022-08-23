# Jenkins Pipeline Script Guide

## Jenkins using Groovy language for define its Pipeline Script. There is some block in Jenkins Pipeline Script

## 1. Pipeline

```jenkinsfile
pipeline{

}
```

The pipeline block is the base for your pipeline that define entire build process, same function like main{} in coding.

## 2. Stages & Stage

```jenkinsfile
pipeline{
    stages{
        stage("Build Image"){

        }
    }
}
```

The stages block is the base for all of the stage in pipeline, this block will consist of many stage.

## 3. Steps

```jenkinsfile
pipeline{
    stages{
        stage("Build Image"){
            steps{
                sh '''
                docker build -t prospica/demo-pipeline:v1 .
                '''
            }
        }
    }
}
```

In stage (without `s`) block there is `steps` block, this block consist all of the command that we needed for that stage. For example, there is stage for building docker image, in `steps` block, we define the command for build image using docker. If you see, there is sh command in there, sh command is indicate that we want to use shell script command.

We can define many stages in our script, for example :

```jenkinsfile
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
```

## 4. Agent

```jenkinsfile
pipeline{
    agent {
        node {
            label 'java11'
        }
    }
```

We can use agent block to make our pipeline run on specific Jenkins node. We use this if our pipeline need many dependency that can interfere with other pipeline. For example pipeline A need openjdk 11 but pipeline B need openjdk 7.

Inside agent block, there is node block. In this block we define our Jenkins node label so this pipeline will only run on the node with that label.

## 5. Environment

```jenkinsfile
pipeline {
    environment {
        def dateNow = sh(script: "date +'%d'", returnStdout: true).trim()
        def monthNow = sh(script: "date +'%m'", returnStdout: true).trim()
        def hourNow = sh(script: "date +'%H'", returnStdout: true)trim()
        def dateNowWithTime = sh(script: "date +'-%d%m%y-%T'", returnStdout: true)trim()
        def version = "${monthNow}.${dateNow}.${hourNow}"
        def getDc = ""
        def confirmDC = ""
    }
```

We can use Environment block to define variables that we want to use in our pipeline.
