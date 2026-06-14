// ─────────────────────────────────────────────
// Frontend App Config
// ─────────────────────────────────────────────
def DOCKER_REPO = 'iferlop/main-frontend-app'
def NAMESPACE = 'ferremat-deploy'
def DOCKER_USER = 'iferlop'

// ─────────────────────────────────────────────
// Kaniko Pod
// ─────────────────────────────────────────────
def getKanikoPod() {
    return """
apiVersion: v1
kind: Pod
spec:
  serviceAccountName: jenkins
  containers:
  - name: kaniko
    image: gcr.io/kaniko-project/executor:debug
    command: ["/busybox/cat"]
    tty: true
    resources:
      requests:
        memory: "1Gi"
        cpu: "500m"
      limits:
        memory: "2Gi"
        cpu: "1500m"
    volumeMounts:
    - name: kaniko-secret
      mountPath: /kaniko/.docker/config.json
      subPath: .dockerconfigjson
    - name: kaniko-cache
      mountPath: /workspace/cache
    env:
    - name: DOCKER_CONFIG
      value: /kaniko/.docker
  volumes:
  - name: kaniko-secret
    secret:
      secretName: dockerhub-secret
      items:
      - key: .dockerconfigjson
        path: .dockerconfigjson
  - name: kaniko-cache
    persistentVolumeClaim:
      claimName: kaniko-cache-pvc
  nodeSelector:
    kubernetes.io/os: linux
  restartPolicy: Never
"""
}

// ─────────────────────────────────────────────
// Tools Pod (kubectl)
// ─────────────────────────────────────────────
def getToolsPod() {
    return """
apiVersion: v1
kind: Pod
spec:
  serviceAccountName: jenkins
  containers:
  - name: tools
    image: alpine/k8s:1.29.2
    command: ["cat"]
    tty: true
    resources:
      requests:
        memory: "128Mi"
        cpu: "100m"
      limits:
        memory: "256Mi"
        cpu: "200m"
  nodeSelector:
    kubernetes.io/os: linux
  restartPolicy: Never
"""
}

// ─────────────────────────────────────────────
// Pipeline
// ─────────────────────────────────────────────
pipeline {
    agent none

    environment {
        COMMIT_HASH = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
    }

    stages {

        stage('Checkout') {
            agent {
                kubernetes {
                    yaml getKanikoPod()
                }
            }
            steps {
                checkout scm
                script {
                    echo "✓ Checkout completado"
                    echo "  Commit: ${GIT_COMMIT}"
                    echo "  Branch: ${GIT_BRANCH}"
                }
            }
        }

        stage('Build & Push Image') {
            agent {
                kubernetes {
                    yaml getKanikoPod()
                }
            }
            steps {
                container('kaniko') {
                    script {
                        echo "🚀 Construyendo imagen Docker..."
                        echo "  Repo: ${DOCKER_REPO}"
                        echo "  Dockerfile: Dockerfile"
                        echo "  Context: $(pwd)"

                        sh '''
                            set -x
                            /kaniko/executor \
                                --context $(pwd) \
                                --dockerfile Dockerfile \
                                --destination ${DOCKER_REPO}:${GIT_COMMIT} \
                                --destination ${DOCKER_REPO}:latest \
                                --cache=true \
                                --cache-dir=/workspace/cache \
                                --cache-ttl=168h
                        '''

                        echo "✓ Imagen publicada:"
                        echo "  - ${DOCKER_REPO}:${GIT_COMMIT}"
                        echo "  - ${DOCKER_REPO}:latest"
                    }
                }
            }
        }

        stage('Restart Deployment') {
            agent {
                kubernetes {
                    yaml getToolsPod()
                }
            }
            steps {
                container('tools') {
                    script {
                        echo "🔄 Reiniciando deployment..."
                        sh '''
                            kubectl rollout restart deployment/main-frontend-app -n ${NAMESPACE} || true
                            sleep 3
                            kubectl rollout status deployment/main-frontend-app -n ${NAMESPACE} --timeout=300s || true
                            echo "✓ Deployment reiniciado"
                        '''
                    }
                }
            }
        }

    }

    post {
        success {
            echo "✅ Pipeline exitoso"
        }
        failure {
            echo "❌ Pipeline falló - revisa los logs arriba"
        }
    }

}
