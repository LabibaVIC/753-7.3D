pipeline {
    agent any

    tools {
        maven 'Maven 3.8.5'
        jdk 'JDK 11'
    }

    environment {
        SONAR_SCANNER_HOME = tool 'SonarScanner'
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

        stage('Code Quality') {
            steps {
                dir('smart-waste') {
                    withSonarQubeEnv('SonarQubeServer') {
                        sh "${SONAR_SCANNER_HOME}/bin/sonar-scanner -Dsonar.projectKey=753-7.3D -Dsonar.sources=src -Dsonar.java.binaries=target"
                    }
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
    }

    post {
        failure {
            mail to: 'your@email.com',
                 subject: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "Check console output: ${env.BUILD_URL}"
        }
    }
}


