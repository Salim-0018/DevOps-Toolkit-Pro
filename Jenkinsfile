pipeline {
    agent any

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

        stage('Build Docker Images') {
            steps {
                sh """
                docker build -t $DOCKERHUB_USER/$BACKEND_IMAGE ./backend
                docker build -t $DOCKERHUB_USER/$FRONTEND_IMAGE ./frontend
                """
            }
        }

        stage('Login & Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh """
                    echo $PASS | docker login -u $USER --password-stdin

                    docker push $USER/$BACKEND_IMAGE
                    docker push $USER/$FRONTEND_IMAGE
                    """
                }
            }
        }
    }
}
