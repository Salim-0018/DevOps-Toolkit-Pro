pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/Salim-0018/DevOps-Toolkit-Pro.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Build triggered successfully 🚀'
            }
        }
    }
