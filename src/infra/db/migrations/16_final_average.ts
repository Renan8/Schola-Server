import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema
    .createTableIfNotExists('final_average', table => {
        
        table.increments('id')
             .primary()
             .unsigned();

        table.decimal('value')
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
    .dropTableIfExists('final_average')
    .catch(function(e) {
        console.log(e);
    });
}