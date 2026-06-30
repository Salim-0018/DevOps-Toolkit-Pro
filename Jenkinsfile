pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/salim-0018/DevOps-Toolkit-Pro.git'
            }
        }

        stage('Build') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }
}
