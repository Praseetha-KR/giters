module.exports = {
    fonts: [],
    css: {
        vendor: [
            '/bower_components/bootstrap/dist/css/bootstrap.css'
        ],
        app: []
    },
    js: {
        start: {
            vendor: [
                '/bower_components/angular/angular.js',
                '/bower_components/angular-ui-router/release/angular-ui-router.js',
                '/bower_components/angular-resource/angular-resource.js',
                // '/bower_components/bootstrap/dist/js/bootstrap.js'
            ],
            app: [
                '/build/js/app.js'
            ]
        },
        end: {
            vendor: []
        }
    }
}
