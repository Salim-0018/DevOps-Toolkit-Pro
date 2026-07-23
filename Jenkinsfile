pipeline {
    agent any

    environment {
        DOCKER_USERNAME = "paul48"
        FRONTEND_IMAGE = "paul48/devops-toolkit-pro-frontend"
        BACKEND_IMAGE  = "paul48/devops-toolkit-pro-backend"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t $FRONTEND_IMAGE:$IMAGE_TAG .'
                }
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t $BACKEND_IMAGE:$IMAGE_TAG .'
                }
            }
        }

        stage('Trivy Scan Frontend') {
            steps {
                sh 'trivy image $FRONTEND_IMAGE:$IMAGE_TAG || true'
            }
        }

        stage('Trivy Scan Backend') {
            steps {
                sh 'trivy image $BACKEND_IMAGE:$IMAGE_TAG || true'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Images') {
            steps {
                sh 'docker push $FRONTEND_IMAGE:$IMAGE_TAG'
                sh 'docker push $BACKEND_IMAGE:$IMAGE_TAG'
            }
        }

        stage('Update Kubernetes Manifests') {
            steps {
                sh """
                sed -i 's|image:.*frontend.*|image: ${FRONTEND_IMAGE}:${IMAGE_TAG}|' k8s/frontend-deployment.yaml
                sed -i 's|image:.*backend.*|image: ${BACKEND_IMAGE}:${IMAGE_TAG}|' k8s/backend-deployment.yaml
                """
            }
        }

        stage('Commit Manifest Changes') {
            steps {
                sh '''
                git config user.email "jenkins@local"
                git config user.name "Jenkins"

                git add k8s/
                git commit -m "Update image tag ${IMAGE_TAG}" || true
                '''
            }
        }
    }

    post {
        success {
            echo "✅ CI Pipeline Completed Successfully"
        }

        failure {
            echo "❌ Pipeline Failed"
        }
    }
}
