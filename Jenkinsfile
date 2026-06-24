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
        DOCKER_REPO      = 'iferlop/main-frontend-app'
        DOCKER_IMAGE_TAG = "${BUILD_NUMBER}-${GIT_COMMIT.take(7)}"
        HELM_VALUES_PATH = 'deploy/kubernetes/charts/main-frontend-app/values.yaml'
        // Bandera para cortar el pipeline si fue disparado por un commit de CI
        IS_CI_COMMIT     = 'false'
    }

    options {
        timeout(time: 1, unit: 'HOURS')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // Detecta si este build fue disparado por el commit que Jenkins mismo hizo
        // para actualizar values.yaml. Si es así, marca IS_CI_COMMIT=true y los
        // stages siguientes se saltan, evitando el loop infinito.
        stage('Guard: Skip CI Commits') {
            steps {
                script {
                    def commitAuthor = sh(returnStdout: true, script: 'git log -1 --format="%ae"').trim()
                    def commitMsg    = sh(returnStdout: true, script: 'git log -1 --format="%s"').trim()

                    if (commitAuthor == 'jenkins@ci.ferremat.es' || commitMsg.contains('[skip ci]')) {
                        env.IS_CI_COMMIT = 'true'
                        currentBuild.description = "Skipped: CI commit by ${commitAuthor}"
                        echo "Commit generado por CI — saltando build para evitar loop."
                    }
                }
            }
        }

        stage('Debug Info') {
            when { environment name: 'IS_CI_COMMIT', value: 'false' }
            steps {
                echo "========== DEBUG INFO =========="
                echo "Build Number : ${BUILD_NUMBER}"
                echo "Git Commit   : ${GIT_COMMIT}"
                echo "Git Branch   : ${GIT_BRANCH}"
                echo "Image Tag    : ${DOCKER_IMAGE_TAG}"
                sh 'ls -la'
                echo "=============================="
            }
        }

        stage('Verify Dockerfile') {
            when { environment name: 'IS_CI_COMMIT', value: 'false' }
            steps {
                sh '[ -f Dockerfile ] || { echo "ERROR: Dockerfile no encontrado"; exit 1; }'
            }
        }

        stage('Build & Push Image') {
            when { environment name: 'IS_CI_COMMIT', value: 'false' }
            steps {
                container('kaniko') {
                    sh """
                        /kaniko/executor \\
                            --dockerfile Dockerfile \\
                            --context . \\
                            --destination ${DOCKER_REPO}:${DOCKER_IMAGE_TAG} \\
                            --destination ${DOCKER_REPO}:latest \\
                            --cache=false \\
                            -v info
                    """
                }
            }
        }

        // Actualiza el tag en values.yaml y hace push a Git.
        // ArgoCD detecta el cambio y sincroniza automaticamente.
        // REQUISITO: crear credencial en Jenkins con id 'github-pat'
        //   (usuario GitHub + Personal Access Token con permiso Contents: write).
        stage('Update Helm Values') {
            when { environment name: 'IS_CI_COMMIT', value: 'false' }
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'github-pat',
                    usernameVariable: 'GIT_USER',
                    passwordVariable: 'GIT_TOKEN'
                )]) {
                    sh """
                        git config user.email "jenkins@ci.ferremat.es"
                        git config user.name "Jenkins CI"

                        sed -i "s/tag: .*/tag: ${DOCKER_IMAGE_TAG}/" ${HELM_VALUES_PATH}

                        echo "Tag actualizado en values.yaml:"
                        grep "tag:" ${HELM_VALUES_PATH}

                        git add ${HELM_VALUES_PATH}

                        if git diff --cached --exit-code; then
                            echo "Sin cambios en values.yaml — nada que commitear"
                        else
                            git commit -m "ci: update main-frontend-app tag to ${DOCKER_IMAGE_TAG} [skip ci]"

                            REPO_URL=\$(git remote get-url origin | sed 's|https://||')
                            BRANCH=\$(echo "\$GIT_BRANCH" | sed 's|origin/||')
                            git push "https://\${GIT_USER}:\${GIT_TOKEN}@\${REPO_URL}" "HEAD:\${BRANCH}"

                            echo "values.yaml actualizado. ArgoCD sincronizara el tag ${DOCKER_IMAGE_TAG} automaticamente."
                        fi
                    """
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline finalizado — IS_CI_COMMIT=${env.IS_CI_COMMIT}"
        }
        success {
            script {
                if (env.IS_CI_COMMIT == 'true') {
                    echo "Build omitido correctamente (commit de CI)"
                } else {
                    echo "BUILD EXITOSO — Imagen: ${DOCKER_REPO}:${DOCKER_IMAGE_TAG}"
                }
            }
        }
        failure {
            echo "BUILD FALLIDO — Revisa los logs"
        }
    }
}
