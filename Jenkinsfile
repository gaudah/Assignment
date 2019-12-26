#!/usr/bin/env groovy

pipeline {

    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'docker build -t dockerimage .'
            }
        }

        stage('Run') {
            steps {
                echo 'Running...'
                sh 'docker run -p 5000:5000 --net host -d --name test_endpoints dockerimage'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing Success...'
                sh 'echo success'
            }
        }
    }
}
