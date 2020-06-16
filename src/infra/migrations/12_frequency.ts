import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema
    .createTableIfNotExists('frequency', table => {
        
        table.increments('id')
             .primary()
             .unsigned();

        table.date('date')
             .notNullable();

        table.time('hour')
             .notNullable();

        table.binary('direction')
             .notNullable();
        
        table.integer('id_student')
             .notNullable()
             .references('id')
             .inTable('student')
             .onDelete('restrict')
             .onUpdate('cascade');

        table.unique(['date', 'direction', 'id_student']);
    
    }).catch(function(e) {
        console.log(e);
    });
}

export async function down(knex: Knex) {
    return knex.schema
    .dropTableIfExists('frequency')
    .catch(function(e) {
        console.log(e);
    });
}