module.exports = {
    fonts: [],
    css: {
        vendor: [],
        app: []
    },
    js: {
        start: {
            vendor: [
                '/bower_components/angular/angular.js',
                '/bower_components/angular-ui-router/release/angular-ui-router.js',
                '/bower_components/angular-resource/angular-resource.js'
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
