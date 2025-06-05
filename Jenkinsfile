pipeline {
    agent any

    tools {
        maven 'Maven 3.8.5'
        jdk 'JDK 17'  // Updated to match SonarScanner requirements (if you ever re-enable)
    }

    stages {
        stage('Build') {
            steps {
                dir('smart-waste') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Test') {
            steps {
                dir('smart-waste') {
                    sh 'mvn test'
                }
            }
            post {
                always {
                    junit 'smart-waste/target/surefire-reports/*.xml'
                }
            }
        }

        stage('Security') {
            steps {
                dir('smart-waste') {
                    sh 'mvn org.owasp:dependency-check-maven:check'
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: 'smart-waste/target/dependency-check-report.html', fingerprint: true
                }
            }
        }

        stage('Deploy') {
            steps {
                dir('smart-waste') {
                    sh 'mkdir -p ../deployed && cp target/*.jar ../deployed/'
                }
            }
        }
    }
}


