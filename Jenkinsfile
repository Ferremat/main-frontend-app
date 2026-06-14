// ─────────────────────────────────────────────
// Configuración de aplicación frontend
// ─────────────────────────────────────────────
def frontendApp = [
    'main-frontend-app': 'iferlop/main-frontend-app',
]

// ─────────────────────────────────────────────
// Pod template Kaniko
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
        cpu: "1.5"
    volumeMounts:
    - name: kaniko-secret
      mountPath: /kaniko/.docker/config.json
      subPath: .dockerconfigjson
    - name: kaniko-cache-vol
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
  - name: kaniko-cache-vol
    persistentVolumeClaim:
      claimName: kaniko-cache-pvc
  nodeSelector:
    kubernetes.io/os: linux
  restartPolicy: Never
"""
}

// ─────────────────────────────────────────────
// Pod template Tools (kubectl)
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
// Pipeline principal
// ─────────────────────────────────────────────
pipeline {
    agent none

    environment {
        DOCKER_USER = 'iferlop'
        NAMESPACE   = 'ferremat-deploy'
    }

    stages {

        // ── 1. Checkout y detección de cambios ───
        stage('Checkout & Detect') {
            agent {
                kubernetes {
                    yaml getKanikoPod()
                }
            }
            steps {
                checkout scm
                script {
                    env.APPS_UPDATED = ''
                    def globalChange = false
                    try {
                        globalChange = sh(
                            script: "git diff --name-only ${GIT_PREVIOUS_SUCCESSFUL_COMMIT} ${GIT_COMMIT} | grep -E '^(Dockerfile|Jenkinsfile)'",
                            returnStatus: true
                        ) == 0
                    } catch (Exception e) {
                        globalChange = true
                    }

                    frontendApp.each { appName, dockerRepo ->
                        def appChange = false
                        try {
                            appChange = sh(
                                script: "git diff --name-only ${GIT_PREVIOUS_COMMIT} ${GIT_COMMIT} | grep -v 'node_modules\\|dist\\|build'",
                                returnStatus: true
                            ) == 0
                        } catch (Exception e) {
                            appChange = true
                        }

                        if (globalChange || appChange || env.BUILD_ID == '1') {
                            env.APPS_UPDATED = env.APPS_UPDATED ? "${env.APPS_UPDATED},${appName}" : appName
                        }
                    }
                    echo "📦 Apps a construir: ${env.APPS_UPDATED}"
                }
            }
        }

        // ── 2. Build & Push secuencial ────────────
        stage('Build & Push') {
            when { expression { env.APPS_UPDATED != '' && env.APPS_UPDATED != null } }
            steps {
                script {
                    def appsList = env.APPS_UPDATED.split(',')

                    for (int i = 0; i < appsList.size(); i++) {
                        def appName   = appsList[i]
                        def dockerRepo = frontendApp[appName]
                        def commitHash = env.GIT_COMMIT

                        echo "🚀 Construyendo ${appName} (${i+1}/${appsList.size()})"

                        podTemplate(yaml: getKanikoPod()) {
                            node(POD_LABEL) {
                                checkout scm
                                container('kaniko') {
                                    stage("Build ${appName}") {
                                        sh """
                                        /kaniko/executor \\
                                            --context \$(pwd) \\
                                            --dockerfile Dockerfile \\
                                            --destination ${dockerRepo}:${commitHash} \\
                                            --destination ${dockerRepo}:latest \\
                                            --cache=false \\
                                            --cache-dir=/workspace/cache \\
                                            --cache-ttl=168h \\
                                            --cache-repo="" \\
                                            --no-push-cache
                                        """
                                    }
                                }
                            }
                        }
                    }
                }
            }
            // NOTA: este stage necesita un agent. Al usar podTemplate dinámico
            // dentro de steps/script, Jenkins lo gestiona internamente,
            // pero el stage padre necesita 'agent none' o un agent propio.
            // Aquí se pone none para que cada pod efímero sea el agente real.
            // Si Jenkins lo rechaza, añade: agent { kubernetes { yaml getKanikoPod() } }
        }

        // ── 3. Restart Deployments ────────────────
        stage('Restart Deployments') {
            when { expression { env.APPS_UPDATED != '' && env.APPS_UPDATED != null } }
            agent {
                kubernetes {
                    yaml getToolsPod()
                }
            }
            steps {
                container('tools') {
                    sh """
                    set -e
                    echo "Reiniciando deployments en namespace ${NAMESPACE}..."

                    kubectl rollout restart deployment/main-frontend-app -n ${NAMESPACE}

                    echo "Esperando rollout de todos los deployments..."

                    kubectl rollout status deployment/main-frontend-app -n ${NAMESPACE} --timeout=120s

                    echo "✓ Todos los deployments actualizados correctamente"
                    """
                }
            }
        }

    } // fin stages

    post {
        success {
            echo "✅ Pipeline completado: imágenes publicadas y deployments reiniciados."
        }
        failure {
            echo "❌ Pipeline fallido. Revisa los logs de la etapa en rojo."
        }
    }

}
