<!doctype html>
<html>
<head>
    <title>Task List</title>
    <meta name="layout" content="main">
</head>
<body>
<h1>Task List</h1>
<form ng-submit="addTask()" class="form-inline">
    <input id="addText" type="text" ng-model="taskTitle" size="30" placeholder="What do you have to do?" ng-required>
    <input id="addButton" class="btn btn-primary" type="submit" value="add">
</form>
<h2>Todo</h2>
<ul>
    <li ng-repeat="task in tasks">
        <input id="doneCheckbox{{index}}" type="checkbox" ng-model="task.done" ng-click="updateTask(task)">
        <span class="done-{{task.done}}">{{task.title}}</span>
        <img id="removeButton{{index}}" class="icon-remove" ng-click="delTask(task)"/>
    </li>
</ul>
</body>
</html>