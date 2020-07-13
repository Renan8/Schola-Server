import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema
    .createTableIfNotExists('invoice', table => {
        
        table.increments('id')
             .primary()
             .unsigned();

        table.string('title', 50)
             .notNullable();

        table.decimal('value')
             .notNullable();
        
        table.integer('status')
             .notNullable();
             
        table.date('due_date')
             .notNullable();

        table.integer('id_student')
             .notNullable()
             .references('id')
             .inTable('student')
             .onDelete('restrict')
             .onUpdate('cascade');
    
    }).catch(function(e) {
        console.log(e);
    });
}

export async function down(knex: Knex) {
    return knex.schema
    .dropTableIfExists('invoice')
    .catch(function(e) {
        console.log(e);
    });
}