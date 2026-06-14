// ─────────────────────────────────────────────────────────────────
// Jenkinsfile para main-frontend-app
// Basado en patrón de main-app (detección de cambios + build + deploy)
// ─────────────────────────────────────────────────────────────────

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
        memory: "2Gi"
        cpu: "1"
      limits:
        memory: "4Gi"
        cpu: "2"
    volumeMounts:
    - name: kaniko-secret
      mountPath: /kaniko/.docker/config.json
      subPath: .dockerconfigjson
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
  nodeSelector:
    kubernetes.io/os: linux
  restartPolicy: Never
"""
}

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

pipeline {
    agent none

    triggers {
        githubPush()
    }

    environment {
        DOCKER_USER  = 'iferlop'
        APP_NAME     = 'main-frontend-app'
        NAMESPACE    = 'ferremat-deploy'
        GIT_REPO_URL = 'https://github.com/Ferremat/main-frontend-app.git'
    }

    stages {

        // ── 1. Checkout & Detección de cambios ────
        stage('Checkout & Detect Changes') {
            agent {
                kubernetes {
                    yaml getKanikoPod()
                }
            }
            steps {
                checkout scm
                script {
                    env.HAS_CHANGES = 'false'
                    try {
                        // Si es el primer build o hay cambios en el código
                        def hasCodeChanges = sh(
                            script: '''
                            if [ -z "$GIT_PREVIOUS_SUCCESSFUL_COMMIT" ]; then
                                exit 0
                            fi
                            git diff --name-only $GIT_PREVIOUS_SUCCESSFUL_COMMIT $GIT_COMMIT | grep -v "values.yaml" | grep -v ".md" > /dev/null
                            ''',
                            returnStatus: true
                        ) == 0

                        if (hasCodeChanges || env.BUILD_ID == '1') {
                            env.HAS_CHANGES = 'true'
                            env.IMAGE_TAG = "latest"
                            env.IMAGE_COMMIT = env.GIT_COMMIT.take(7)
                            echo "✓ Cambios detectados. Build #${BUILD_NUMBER} - Commit: ${env.IMAGE_COMMIT}"
                        } else {
                            echo "ℹ No hay cambios de código. Saltando build."
                        }
                    } catch (Exception e) {
                        env.HAS_CHANGES = 'true'
                        env.IMAGE_TAG = "latest"
                        env.IMAGE_COMMIT = env.GIT_COMMIT.take(7)
                        echo "⚠ Error en detección, asumiendo que hay cambios."
                    }
                }
            }
        }

        // ── 2. Build & Push ────────────────────────
        stage('Build & Push') {
            when { expression { env.HAS_CHANGES == 'true' } }
            agent {
                kubernetes {
                    yaml getKanikoPod()
                }
            }
            steps {
                checkout scm
                container('kaniko') {
                    sh """
                    set -e
                    echo "🚀 Building ${APP_NAME}..."
                    echo "Commit: ${IMAGE_COMMIT}"
                    /kaniko/executor \\
                        --context \$(pwd) \\
                        --dockerfile Dockerfile \\
                        --destination ${DOCKER_USER}/${APP_NAME}:latest \\
                        --destination ${DOCKER_USER}/${APP_NAME}:${IMAGE_COMMIT} \\
                        --cache=true \\
                        --cache-repo=${DOCKER_USER}/${APP_NAME}
                    echo "✓ Build completado: ${DOCKER_USER}/${APP_NAME}:latest (${IMAGE_COMMIT})"
                    """
                }
            }
        }

        // ── 3. Update values.yaml & Push to Git ────
        stage('Update values.yaml & Push') {
            when { expression { env.HAS_CHANGES == 'true' } }
            agent {
                kubernetes {
                    yaml getToolsPod()
                }
            }
            steps {
                checkout scm
                container('tools') {
                    withCredentials([usernamePassword(
                        credentialsId: 'github-creds',
                        usernameVariable: 'GIT_USER',
                        passwordVariable: 'GIT_TOKEN'
                    )]) {
                        sh '''
                        set -e

                        git config --global --add safe.directory $(pwd)
                        git config --global user.email "jenkins@ferremat.es"
                        git config --global user.name "Jenkins CI"

                        REPO_NO_SCHEME=$(echo "${GIT_REPO_URL}" | sed 's|https://||')
                        VALUES_FILE="deploy/kubernetes/charts/main-frontend-app/values.yaml"

                        git fetch https://${GIT_USER}:${GIT_TOKEN}@${REPO_NO_SCHEME} develop
                        git checkout -B develop FETCH_HEAD

                        echo "📝 Actualizando ${VALUES_FILE}..."
                        sed -i "s|^    tag:.*|    tag: ${IMAGE_COMMIT}|" ${VALUES_FILE}

                        cat ${VALUES_FILE} | grep -A 2 "image:"

                        git add ${VALUES_FILE}
                        git diff --cached --quiet || git commit -m "ci: update image commit to ${IMAGE_COMMIT} [skip ci]"
                        git push https://${GIT_USER}:${GIT_TOKEN}@${REPO_NO_SCHEME} HEAD:develop

                        echo "✓ values.yaml actualizado y pusheado a develop"
                        '''
                    }
                }
            }
        }

        // ── 4. Restart Deployment ──────────────────
        stage('Restart Deployment') {
            when { expression { env.HAS_CHANGES == 'true' } }
            agent {
                kubernetes {
                    yaml getToolsPod()
                }
            }
            steps {
                container('tools') {
                    sh '''
                    set -e
                    echo "🔄 Reiniciando deployment ${APP_NAME}..."

                    kubectl rollout restart deployment/${APP_NAME} -n ${NAMESPACE}

                    echo "⏳ Esperando rollout..."
                    kubectl rollout status deployment/${APP_NAME} -n ${NAMESPACE} --timeout=300s

                    echo "✓ Deployment actualizado exitosamente"

                    echo ""
                    echo "📊 Status actual:"
                    kubectl get deployment ${APP_NAME} -n ${NAMESPACE} -o wide
                    '''
                }
            }
        }

    } // fin stages

    post {
        success {
            echo "✅ Pipeline completado: imagen publicada y deployment reiniciado"
        }
        failure {
            echo "❌ Pipeline fallido. Revisa los logs de la etapa en rojo"
        }
        always {
            echo "───────────────────────────────────────"
            echo "BUILD: #${BUILD_NUMBER}"
            echo "COMMIT: ${GIT_COMMIT}"
            echo "───────────────────────────────────────"
        }
    }

}
