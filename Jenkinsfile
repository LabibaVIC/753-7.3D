pipeline {
    agent any

    tools {
        maven 'Maven 3.8.5' // Ensure this matches your Jenkins global tools config
        jdk 'JDK 11'         // Or whatever version you’ve configured
    }

    environment {
        SONAR_SCANNER_HOME = tool 'SonarScanner' // Must be configured in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/LabibaVIC/753-7.3D.git'
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean package -DskipTests'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }

            post {
                always {
                    junit '**/target/surefire-reports/*.xml'
                }
            }
        }

        stage('Code Quality') {
            steps {
                withSonarQubeEnv('SonarQubeServer') {
                    sh "${SONAR_SCANNER_HOME}/bin/sonar-scanner -Dsonar.projectKey=753-7.3D -Dsonar.sources=src -Dsonar.java.binaries=target"
                }
            }
        }

        stage('Security') {
            steps {
                sh 'mvn org.owasp:dependency-check-maven:check'
            }

            post {
                always {
                    archiveArtifacts artifacts: 'target/dependency-check-report.html', fingerprint: true
                }
            }
        }
    }

    post {
        failure {
            mail to: 'your@email.com',
                 subject: "Build Failed in Jenkins: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "Check console output at ${env.BUILD_URL}"
        }
    }
}

