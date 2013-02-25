modules = {

    application {
        dependsOn 'jquery, angularResource, bootstrap'
        resource url: 'css/application.css'
        resource url: 'js/angular/app/application.js'
    }

    bootstrap {
        dependsOn 'jquery'
        resource url: 'js/bootstrap/css/bootstrap.min.css'
        resource url: 'js/bootstrap/js/bootstrap.min.js'
    }

    angular {
        resource id: 'js', url: [dir: 'js/angular/lib/', file: "angular.js"], nominify: true
    }

    angularResource {
        dependsOn 'angular'
        resource id: 'js', url: [dir: 'js/angular/lib/', file: "angular-resource.js"], nominify: true
    }

}
