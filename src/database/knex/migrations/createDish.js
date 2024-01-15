
exports.up = knex => knex.schema.createTable('dishes', table => {
    table.increments('id')
    table.text('name')
    table.text('description')
    table.text('price')
    table.text('type')
    table.text('photo')
    table.text('ingredients')

    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable('dishes')