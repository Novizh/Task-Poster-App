'use strict'

const Task = use('App/Models/Task')
const { validateAll } = use('Validator')

class TaskController {
    async index ({ view }) {
        /**
         * Fetch all tasks inside our database.
         *
         * ref: http://adonisjs.com/docs/4.1/lucid#_all
         */
        const tasks = await Task.all()
    
        /**
         * Render the view 'tasks.index'
         * with the posts fetched as data.
         *
         * ref: http://adonisjs.com/docs/4.1/views
         */
        return view.render('tasks.index', { tasks: tasks.toJSON() })
      }
    
      create ({ view }) {
        /**
         * Render the view 'tasks.create'.
         *
         * ref: http://adonisjs.com/docs/4.1/views
         */
        return view.render('tasks.create')
      }
    
      async store ({ session, request, response }) {
        /**
         * Getting needed parameters.
         *
         * ref: http://adonisjs.com/docs/4.1/request#_only
         */
        const data = request.only(['title', 'description', 'status'])
    
        /**
         * Validating our data.
         *
         * ref: http://adonisjs.com/docs/4.1/validator
         */
        const validation = await validateAll(data, {
          title: 'required',
          description: 'required',
          status: 'required'
        })
    
        /**
         * If validation fails, early returns with validation message.
         */
        if (validation.fails()) {
          session
            .withErrors(validation.messages())
            .flashAll()
    
          return response.redirect('back')
        }
    
        /**
         * Creating a new task into the database.
         *
         * ref: http://adonisjs.com/docs/4.1/lucid#_create
         */
        await Task.create(data)
    
        return response.redirect('/')
      }
    
      async edit ({ params, view }) {
        /**
         * Finding the task.
         *
         * ref: http://adonisjs.com/docs/4.1/lucid#_findorfail
         */
        const task = await Task.findOrFail(params.id)
    
        return view.render('tasks.edit', { task: task.toJSON() })
      }
    
      async update ({ params, session, request, response }) {
        /**
         * Getting needed parameters.
         *
         * ref: http://adonisjs.com/docs/4.1/request#_only
         */
        const data = request.only(['title', 'description', 'status'])
    
        /**
         * Validating our data.
         *
         * ref: http://adonisjs.com/docs/4.1/validator
         */
        const validation = await validateAll(data, {
          title: 'required',
          description: 'required',
          status: 'required'
        })
    
        /**
         * If validation fails, early returns with validation message.
         */
        if (validation.fails()) {
          session
            .withErrors(validation.messages())
            .flashAll()
    
          return response.redirect('back')
        }
    
        /**
         * Finding the task and updating fields on it
         * before saving it to the database.
         *
         * ref: http://adonisjs.com/docs/4.1/lucid#_inserts_updates
         */
        const task = await Task.findOrFail(params.id)
        task.merge(data)
        await task.save()
    
        return response.redirect('/')
      }
    
      async delete ({ params, response }) {
        /**
         * Finding the task and deleting it
         *
         * ref: http://adonisjs.com/docs/4.1/lucid#_deletes
         */
        const task = await Task.findOrFail(params.id)
        await task.delete()
          
    
        return response.redirect('/')
      }
}

module.exports = TaskController
