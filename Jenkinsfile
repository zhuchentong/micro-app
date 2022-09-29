def getNowDate() {
     return new Date().format('yyyyMMddHHmmss')
}


pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM',
        branches: [[name: GIT_BUILD_REF]],
        userRemoteConfigs: [[
          url: GIT_REPO_URL,
          credentialsId: CREDENTIALS_ID
        ]]])
      }
    }
    stage('构建镜像并推送到 CODING Docker 制品库') {
      steps {
        script {
          docker.withRegistry(
            "${CCI_CURRENT_WEB_PROTOCOL}://${CODING_DOCKER_REG_HOST}",
            "${CODING_ARTIFACTS_CREDENTIALS_ID}"
          ) {
            def dockerImage = docker.build("${CODING_DOCKER_IMAGE_NAME}", "-f ${DOCKERFILE_PATH} ${DOCKER_BUILD_CONTEXT} .")
            dockerImage.push("${DOCKER_IMAGE_VERSION}")
            dockerImage.push("latest")
          }
        }

      }
    }
     stage('部署镜像') {
      steps {
        sleep(time: 10, unit: "SECONDS")
        echo "KubeSphere: 开始重新拉取部署镜像"
        script {
           sh "curl -i -X PATCH \
              -H 'Authorization:Bearer ${KUBESPHERE_TOKEN}' \
              -H 'Content-Type:application/merge-patch+json' \
              -d '{\"spec\":{\"template\":{\"metadata\":{\"annotations\":{\"kubesphere.io/restartedAt\":\"${RESTART_DATE}\"}}}}}' \
              ${KUBESPHERE_URL}"
        }
      }
    }
  }
  environment {
    CODING_DOCKER_REG_HOST = "${CCI_CURRENT_TEAM}-docker.pkg.${CCI_CURRENT_DOMAIN}"
    CODING_DOCKER_IMAGE_NAME = "${PROJECT_NAME.toLowerCase()}/${DOCKER_REPO_NAME}/${DOCKER_IMAGE_NAME}"
    KUBESPHERE_URL = "${KUBESPHERE_URL}"
    KUBESPHERE_TOKEN = "${KUBESPHERE_TOKEN}"
    RESTART_DATE = getNowDate()
  }
}
