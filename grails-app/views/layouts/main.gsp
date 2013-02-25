<!doctype html>
<html lang="en" ng-app="todolist">
<head>
    <meta name="pageId" content="${controllerName}.${actionName}" />
    <title><g:layoutTitle/></title>
    <g:layoutHead/>
    <r:require modules="application"/>
    <r:layoutResources />
</head>
<g:set var="ngParams" value="${params.collect{ it.key + '=\'' + it.value + '\''}.join('; ')}" />
<body ng-init="${ngParams}">
<section id="todolist" ng-controller="${ngController}">
    <g:layoutBody/>
</section>
<r:layoutResources />
</body>
</html>