class UrlMappings {

	static mappings = {

        "/task/$id?"(controller: "task", parseRequest: true) {
            action = [GET: "list", PUT: "update", DELETE: "delete", POST: "save"]
        }

        "/"(controller: 'task', action: 'index')
	}
}
