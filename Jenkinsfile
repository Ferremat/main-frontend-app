pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
spec:
  serviceAccountName: jenkins
  containers:
  - name: kaniko
    image: gcr.io/kaniko-project/executor:debug
    command:
    - sleep
    args:
    - 99999
    volumeMounts:
    - name: docker-secret
      mountPath: /kaniko/.docker
  volumes:
  - name: docker-secret
    secret:
      secretName: dockerhub-secret
      items:
      - key: .dockerconfigjson
        path: config.json
"""
        }
    }

    environment {
        DOCKER_REPO = 'iferlop/main-frontend-app'
        DOCKER_IMAGE_TAG = "${BUILD_NUMBER}-${GIT_COMMIT.take(7)}"
    }

    options {
        timestamps()
        timeout(time: 1, unit: 'HOURS')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Debug Info') {
            steps {
                echo "========== DEBUG INFO =========="
                echo "Workspace: ${WORKSPACE}"
                echo "Build Number: ${BUILD_NUMBER}"
                echo "Git Commit: ${GIT_COMMIT}"
                echo "Git Branch: ${GIT_BRANCH}"
                echo "Docker Repo: ${DOCKER_REPO}"
                echo "Image Tag: ${DOCKER_IMAGE_TAG}"
                sh 'echo "Context: $(pwd)" && ls -la'
                echo "=============================="
            }
        }

        stage('Checkout') {
            steps {
                echo "📥 Clonando repositorio..."
                checkout scm
                sh 'echo "Checkout completado"; ls -la | head -20'
            }
        }

        stage('Verify Dockerfile') {
            steps {
                echo "🔍 Verificando Dockerfile..."
                sh '''
                    if [ -f Dockerfile ]; then
                        echo "✓ Dockerfile encontrado"
                        head -10 Dockerfile
                    else
                        echo "❌ ERROR: Dockerfile NO encontrado"
                        echo "Contenido actual:"
                        ls -la
                        exit 1
                    fi
                '''
            }
        }

        stage('Build Image') {
            steps {
                container('kaniko') {
                    echo "🚀 Construyendo imagen Docker..."
                    sh """
                        echo "Verificando credenciales..."
                        ls -la /kaniko/.docker/

                        echo "Iniciando Kaniko executor..."
                        /kaniko/executor \\
                            --dockerfile Dockerfile \\
                            --context . \\
                            --destination ${DOCKER_REPO}:${DOCKER_IMAGE_TAG} \\
                            --destination ${DOCKER_REPO}:latest \\
                            --cache=true \\
                            --cache-ttl=24h \\
                            -v info
                    """
                }
            }
        }

        stage('Verify Image') {
            steps {
                echo "✓ Imagen construida exitosamente:"
                echo "  - ${DOCKER_REPO}:${DOCKER_IMAGE_TAG}"
                echo "  - ${DOCKER_REPO}:latest"
            }
        }
    }

    post {
        always {
            echo "Pipeline finalizado"
        }
        success {
            echo "✅ BUILD EXITOSO"
        }
        failure {
            echo "❌ BUILD FALLIDO - Revisa los logs arriba para detalles"
        }
    }
}
