exports.port = process.argv[3] || 8080;

process.env.DEV_PORT = exports.port; // 注入 process.env 以便 main 进程确定端口，见 src/main/index.js
