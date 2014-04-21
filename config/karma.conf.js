module.exports = function (config) {
    config.set({
        basePath: '../',
        plugins : [
          'karma-chrome-launcher',
          'karma-jasmine'
        ],
        frameworks: ['jasmine'],
        files: [
            'public/bower_components/angular/angular.js',
            'public/bower_components/angular-mocks/angular-mocks.js',
            'public/bower_components/jquery/dist/jquery.js',
            'public/bower_components/jquery/dist/jquery.min.js',           
            'public/javascripts/*.js',
            'test/unit/*.js'
        ] ,
        autoWatch: true,

        browsers: ['Chrome'],
        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    })
}