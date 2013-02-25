class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}

        "/task/$id?"(controller: "task", parseRequest: true) {
            action = [GET: "list", PUT: "update", DELETE: "delete", POST: "save"]
        }

        "/"(controller: 'task', action: 'index')
        "500"(view:'/error')
	}
}
