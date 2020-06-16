import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema
    .createTableIfNotExists('teacher', table => {
        
        table.increments('id')
             .primary()
             .unsigned();

        table.string('name')
             .notNullable();
             
    }).catch(function(e) {
        console.log(e);
    });
}

export async function down(knex: Knex) {
    return knex.schema
    .dropTableIfExists('teacher')
    .catch(function(e) {
        console.log(e);
    });
}