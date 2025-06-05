pipeline {
    agent any

    tools {
        maven 'Maven 3.8.5'
        jdk 'JDK 17'
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
                echo 'Code quality tools like Checkstyle would run here.'
                // sh 'mvn checkstyle:checkstyle' // Uncomment if integrated
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

        stage('Deployment') {
            steps {
                echo 'Deploying the artifact to the staging server...'
                sh 'echo "Simulated deployment step completed."'
            }
        }

        stage('Release') {
            steps {
                echo 'Releasing the build...'
                sh 'echo "Simulated release: tagging and publishing successful."'
            }
        }

        stage('Monitoring') {
            steps {
                echo 'Monitoring metrics and logs would be gathered here.'
                sh 'echo "Simulated monitoring metrics collection."'
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


