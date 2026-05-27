pipeline {
    agent any

    environment {
        IMAGE_NAME = "notes-web"
        CONTAINER_NAME = "notes-web-container"
    }

    tools {
        nodejs "node22"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/YOUR_USERNAME/YOUR_REPO.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t notes-web:latest .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                docker stop notes-web-container || true
                docker rm notes-web-container || true
                '''
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'docker compose up -d --build'
            }
        }
    }

    post {
        success {
            echo 'Application deployed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}