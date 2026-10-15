module.exports = {
    apps: [{
        name: "FURNIRO",
        script: "./dist/server.js",
        cwd: "./",
        watch: false,
        env_production: {
            NODE_ENV: "production"
        },
        env_development: {
            NODE_ENV: "development"
        },
        instances: 1, //"max"
        exec_mode: "cluster"
    }]
}