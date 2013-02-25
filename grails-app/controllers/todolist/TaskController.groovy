package todolist

import org.springframework.dao.DataIntegrityViolationException
import grails.converters.JSON
import static javax.servlet.http.HttpServletResponse.*

class TaskController {

    static final int SC_UNPROCESSABLE_ENTITY = 422

    def index() { }

    def list() {
		render Task.list(params) as JSON
    }

    def save() {
        def taskInstance = new Task(request.JSON)
        def responseJson = [:]
        if (taskInstance.save(flush: true)) {
            response.status = SC_CREATED
            responseJson.result = taskInstance
            responseJson.message = message(code: 'default.created.message', args: [message(code: 'task.label', default: 'Task'), taskInstance.id])
        } else {
            response.status = SC_UNPROCESSABLE_ENTITY
            responseJson.errors = taskInstance.errors.fieldErrors.collectEntries {
                [(it.field): message(error: it)]
            }
        }
        render responseJson as JSON
    }

    def get() {
        def taskInstance = Task.get(params.id)
        if (taskInstance) {
			render taskInstance as JSON
        } else {
			notFound params.id
		}
    }

    def update() {
        def taskInstance = Task.get(params.id)
        if (!taskInstance) {
            notFound params.id
            return
        }

        def responseJson = [:]

        if (request.JSON.version != null) {
            if (taskInstance.version > request.JSON.version) {
				response.status = SC_CONFLICT
				responseJson.message = message(code: 'default.optimistic.locking.failure',
						args: [message(code: 'task.label', default: 'Task')],
						default: 'Another user has updated this Task while you were editing')
				cache false
				render responseJson as JSON
				return
            }
        }

        taskInstance.properties = request.JSON

        if (taskInstance.save(flush: true)) {
            response.status = SC_OK
            responseJson.id = taskInstance.id
            responseJson.message = message(code: 'default.updated.message', args: [message(code: 'task.label', default: 'Task'), taskInstance.id])
        } else {
            response.status = SC_UNPROCESSABLE_ENTITY
            responseJson.errors = taskInstance.errors.fieldErrors.collectEntries {
                [(it.field): message(error: it)]
            }
        }

        render responseJson as JSON
    }

    def delete() {
        def taskInstance = Task.get(params.id)
        if (!taskInstance) {
            notFound params.id
            return
        }

        def responseJson = [:]
        try {
            taskInstance.delete(flush: true)
            responseJson.message = message(code: 'default.deleted.message', args: [message(code: 'task.label', default: 'Task'), params.id])
        } catch (DataIntegrityViolationException e) {
            response.status = SC_CONFLICT
            responseJson.message = message(code: 'default.not.deleted.message', args: [message(code: 'task.label', default: 'Task'), params.id])
        }
        render responseJson as JSON
    }

    private void notFound(id) {
        response.status = SC_NOT_FOUND
        def responseJson = [message: message(code: 'default.not.found.message', args: [message(code: 'task.label', default: 'Task'), params.id])]
        render responseJson as JSON
    }
}
