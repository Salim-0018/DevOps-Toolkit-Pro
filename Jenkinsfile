pipeline {

    agent any

    environment {
        FRONTEND_IMAGE = "paul48/devops-toolkit-pro-frontend"
        BACKEND_IMAGE  = "paul48/devops-toolkit-pro-backend"
        IMAGE_TAG = "${BUILD_NUMBER}"
        KUBECONFIG = "/var/jenkins_home/.kube/config"
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
                    sh '''
                    docker build -t $FRONTEND_IMAGE:$IMAGE_TAG .
                    '''
                }
            }
        }


        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh '''
                    docker build -t $BACKEND_IMAGE:$IMAGE_TAG .
                    '''
                }
            }
        }


        stage('Trivy Scan Frontend') {
            steps {
                sh '''
                trivy image $FRONTEND_IMAGE:$IMAGE_TAG || true
                '''
            }
        }


        stage('Trivy Scan Backend') {
            steps {
                sh '''
                trivy image $BACKEND_IMAGE:$IMAGE_TAG || true
                '''
            }
        }


        stage('Docker Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    sh '''
                    echo $DOCKER_PASS | docker login \
                    -u $DOCKER_USER \
                    --password-stdin
                    '''
                }
            }
        }


        stage('Push Images') {
            steps {
                sh '''
                docker push $FRONTEND_IMAGE:$IMAGE_TAG
                docker push $BACKEND_IMAGE:$IMAGE_TAG
                '''
            }
        }


        stage('Update Kubernetes Manifest') {
            steps {
                sh '''
                sed -i "s|image:.*frontend.*|image: $FRONTEND_IMAGE:$IMAGE_TAG|" k8s/frontend-deployment.yaml

                sed -i "s|image:.*backend.*|image: $BACKEND_IMAGE:$IMAGE_TAG|" k8s/backend-deployment.yaml
                '''
            }
        }


        stage('Deploy To Kubernetes') {
            steps {
                sh '''
                echo "🚀 Deploying Application"

                kubectl apply -f k8s/

                echo "Checking Pods..."

                kubectl get pods -n devops-toolkit

                kubectl get svc -n devops-toolkit
                '''
            }
        }


        stage('Verify Deployment') {
            steps {
                sh '''
                kubectl rollout status deployment/frontend \
                -n devops-toolkit

                kubectl rollout status deployment/backend \
                -n devops-toolkit
                '''
            }
        }

    }


    post {

        success {
            echo "✅ CI/CD Pipeline Completed Successfully"
        }

        failure {
            echo "❌ Pipeline Failed"
        }

    }

}
