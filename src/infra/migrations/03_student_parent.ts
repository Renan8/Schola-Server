import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema
    .createTableIfNotExists('student_parent', table => {

        table.integer('id_student')
             .notNullable()
             .references('id')
             .inTable('student')
             .onDelete('cascade')
             .onUpdate('cascade');

        table.integer('id_parent')
             .notNullable()
             .references('id')
             .inTable('parent')
             .onDelete('cascade')
             .onUpdate('cascade');

        table.integer('filiation')
             .notNullable();

        table.unique(['id_student', 'id_parent']);

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