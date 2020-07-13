import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema
    .createTableIfNotExists('event_student_class', table => {

        table.integer('id')
             .notNullable()
             .references('id')
             .inTable('student')
             .onDelete('cascade')
             .onUpdate('cascade');

        table.integer('id_event')
             .notNullable()
             .references('id')
             .inTable('event')
             .onDelete('restrict')
             .onUpdate('cascade');

        table.integer('id_student')
             .notNullable()
             .references('id')
             .inTable('student')
             .onDelete('restrict')
             .onUpdate('cascade');

        table.integer('id_class')
             .notNullable()
             .references('id')
             .inTable('class')
             .onDelete('restrict')
             .onUpdate('cascade');

    }).catch(function(e) {
        console.log(e);
    });
}

export async function down(knex: Knex) {
    return knex.schema
    .dropTableIfExists('student_parent')
    .catch(function(e) {
        console.log(e);
    });
}