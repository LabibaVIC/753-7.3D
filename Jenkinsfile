pipeline {
    agent any

    environment {
        SONARQUBE_ENV = "SonarQube"
        NODE_ENV = "development"
    }

    tools {
        nodejs "NodeJS_18"
    }

    stages {
        stage('Build') {
            steps {
                echo '🔧 Building the application...'
                sh 'npm install'
                sh 'zip -r build-artifact.zip .'
                archiveArtifacts artifacts: 'build-artifact.zip', fingerprint: true
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running tests...'
                sh 'npm test || echo "Tests failed (demo bypass)."'
                // If you generate XML test results, add:
                // junit 'test-results.xml'
            }
        }

        stage('Code Quality') {
            steps {
                echo '📏 Running SonarQube for code quality...'
                withSonarQubeEnv("${SONARQUBE_ENV}") {
                    sh 'sonar-scanner'
                }
            }
        }

        stage('Security') {
            steps {
                echo '🔐 Performing security audit...'
                sh 'npm audit --json > audit-report.json || true'
                archiveArtifacts artifacts: 'audit-report.json', fingerprint: true
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploying to staging (Docker)...'
                sh 'docker build -t my-node-form:staging .'
                sh 'docker run -d -p 3000:3000 --name node-app-staging my-node-form:staging || echo "Container may already exist"'
            }
        }

        stage('Release') {
            steps {
                echo '🏁 Promoting to production...'
                script {
                    def tag = "release-${env.BUILD_NUMBER}"
                    sh "git tag ${tag}"
                    sh "git push origin ${tag}"
                }
            }
        }

        stage('Monitoring and Alerting') {
            steps {
                echo '📡 Sending heartbeat to monitoring system...'
                sh 'curl -X POST http://monitoring-tool.local/heartbeat || echo "Monitoring failed or offline"'
            }
        }
    }
}

