module.exports = {
    apps : [
        {
          name: "myapp",
          script: "./index.js",
          watch: true,
          env: {
            "NODE_ENV": "development",
            "NODE_TLS_REJECT_UNAUTHORIZED": true,
            "PORT": 3002
          }
        }
    ]
  }