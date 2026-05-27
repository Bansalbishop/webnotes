pipeline {
    agent any

    stages {

        stage('Clone Code') {
            steps {
                git 'https://github.com/Bansalbishop/webnotes.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t notes-web .'
            }
        }

        stage('Stop Old Container') {
            steps {
                bat '''
                docker stop notes-web-container || exit 0
                docker rm notes-web-container || exit 0
                '''
            }
        }

        stage('Run Container') {
            steps {
                bat 'docker run -d -p 5173:80 --name notes-web-container notes-web'
            }
        }
    }
}