pipeline {
    agent any

    tools {
        sonarQube 'SonarScanner'
    }

    environment {
        DOCKERHUB_USER = "paul48"
        BACKEND_IMAGE = "devops-backend"
        FRONTEND_IMAGE = "devops-frontend"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/salim-0018/DevOps-Toolkit-Pro.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                    sonar-scanner \
                      -Dsonar.projectKey=DevOps-Toolkit-Pro \
                      -Dsonar.projectName=DevOps-Toolkit-Pro \
                      -Dsonar.sources=. \
                      -Dsonar.sourceEncoding=UTF-8
                    '''
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                docker build -t $DOCKERHUB_USER/$BACKEND_IMAGE:latest ./backend
                docker build -t $DOCKERHUB_USER/$FRONTEND_IMAGE:latest ./frontend
                '''
            }
        }

        stage('DockerHub Login & Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {

                    sh '''
                    echo $PASS | docker login -u $USER --password-stdin

                    docker push $USER/$BACKEND_IMAGE:latest
                    docker push $USER/$FRONTEND_IMAGE:latest
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                kubectl rollout restart deployment/backend -n devops-toolkit
                kubectl rollout restart deployment/frontend -n devops-toolkit
                '''
            }
        }

        stage('Wait for Rollout') {
            steps {
                sh '''
                kubectl rollout status deployment/backend -n devops-toolkit
                kubectl rollout status deployment/frontend -n devops-toolkit
                '''
            }
        }
    }

    post {
        success {
            echo '====================================='
            echo 'Pipeline completed successfully!'
            echo 'Code Checked by SonarQube'
            echo 'Docker Images Built & Pushed'
            echo 'Application Deployed to Kubernetes'
            echo '====================================='
        }

        failure {
            echo '====================================='
            echo 'Pipeline Failed!'
            echo 'Check Jenkins Console Output'
            echo '====================================='
        }
    }
}
