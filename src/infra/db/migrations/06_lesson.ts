import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema
    .createTableIfNotExists('lesson', table => {
        
        table.increments('id')
             .primary()
             .unsigned();

        table.string('name')
             .notNullable();
        
        table.string('id_teacher')
             .references('id')
             .inTable('teacher')
             .notNullable()
             .onDelete('restrict')
             .onUpdate('cascade')
             .unique();

    }).catch(function(e) {
        console.log(e);
    });
}

export async function down(knex: Knex) {
    return knex.schema
    .dropTableIfExists('lesson')
    .catch(function(e) {
        console.log(e);
    });
}