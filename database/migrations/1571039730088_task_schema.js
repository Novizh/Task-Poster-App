'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      table.timestamps()
      table.string('title')
      table.string('description')
      table.string('status')
      table.integer('user_id').unsigned()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
