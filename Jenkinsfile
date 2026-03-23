pipeline {

    agent any

    tools {
        nodejs 'NODE_24'
    }

    // 构建参数：选择操作类型
    parameters {
        choice(name: 'ACTION', choices: ['deploy', 'restart', 'stop'], description: '选择操作：deploy(部署) / restart(重启) / stop(停止服务)')
    }

    environment {
        // 项目名称
        APP_NAME          = "paipai-admin-ui"
        // 定义 GitHub 仓库地址
        REPO_URL          = "https://github.com/firechiang/test-admin-ui.git"
        // 构建产物目录
        DIST_DIR          = "dist"
        // 部署目标路径
        DEPLOY_PATH       = "/home/project-javascript/paipai-admin-ui"
        // serve 监听端口
        SERVE_PORT        = "8091"
        // serve 监听地址
        SERVE_ADDR        = credentials('SERVE_ADDR')
        // 前端 API 请求地址（Vite 构建时注入）
        VITE_API_BASE_URL = "http://${SERVE_ADDR}:8093"
    }

    options {
        timeout(time: 15, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
    }

    stages {

        stage('检出代码') {
            when {
                expression { params.ACTION != 'stop' }
            }
            steps {
                echo '[INFO] 正在从 GitHub 拉取代码...'
                git branch: 'main', url: "${REPO_URL}"
            }
        }

        stage('安装依赖') {
            when {
                expression { params.ACTION != 'stop' }
            }
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'npm install'
            }
        }

        stage('构建') {
            when {
                expression { params.ACTION != 'stop' }
            }
            steps {
                // VITE_ 开头的环境变量会被 Vite 自动注入到前端代码中
                sh "VITE_API_BASE_URL=${VITE_API_BASE_URL} npm run build"
            }
        }

        stage('归档产物') {
            when {
                expression { params.ACTION != 'stop' }
            }
            steps {
                sh "tar -czf ${APP_NAME}-${BUILD_NUMBER}.tar.gz -C ${DIST_DIR} ."
                archiveArtifacts artifacts: "${APP_NAME}-${BUILD_NUMBER}.tar.gz", fingerprint: true
            }
        }

        stage('停止服务') {
            when {
                expression { params.ACTION in ['stop', 'restart'] }
            }
            steps {
                sh """
                    pm2 stop ${APP_NAME} || true
                    pm2 delete ${APP_NAME} || true
                    pm2 save
                    echo "✅ 服务 ${APP_NAME} 已停止"
                """
            }
        }

        stage('部署') {
            when {
                expression { params.ACTION in ['deploy', 'restart'] }
            }
            steps {
                sh """
                    # 安装 serve 和 pm2（如果还没有安装）
                    npm list -g serve  || npm install -g serve
                    npm list -g pm2    || npm install -g pm2

                    # 创建目录并解压产物
                    mkdir -p ${DEPLOY_PATH}
                    rm -rf ${DEPLOY_PATH}/*
                    tar -xzf ${APP_NAME}-${BUILD_NUMBER}.tar.gz -C ${DEPLOY_PATH}

                    # 停止旧进程（忽略不存在的情况）
                    pm2 stop ${APP_NAME} || true
                    pm2 delete ${APP_NAME} || true

                    # 用 pm2 托管 serve 进程
                    pm2 start serve --name ${APP_NAME} -- -s ${DEPLOY_PATH} -l ${SERVE_PORT}
                    pm2 save
                """
            }
        }
    }

    post {
        success {
            script {
                if (params.ACTION == 'stop') {
                    echo "✅ 服务已停止！构建号: ${BUILD_NUMBER}"
                } else {
                    echo "✅ 构建部署成功！构建号: ${BUILD_NUMBER}，访问地址: http://${SERVE_ADDR}:${SERVE_PORT}"
                }
            }
        }
        failure {
            echo "❌ 操作失败！构建号: ${BUILD_NUMBER}，操作: ${params.ACTION}"
        }
        cleanup {
            sh "rm -f ${APP_NAME}-${BUILD_NUMBER}.tar.gz || true"
            cleanWs()
        }
    }
}
