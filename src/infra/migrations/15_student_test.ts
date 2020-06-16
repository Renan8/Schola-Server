import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema
    .createTableIfNotExists('student_test', table => {
        
        table.integer('id_student')
             .notNullable()
             .references('id')
             .inTable('student')
             .onDelete('restrict')
             .onUpdate('cascade');
        
        table.integer('id_test')
             .notNullable()
             .references('id')
             .inTable('test')
             .onDelete('restrict')
             .onUpdate('cascade');
        
        table.decimal('value')
             .nullable();

    }).catch(function(e) {
        console.log(e);
    });
}

export async function down(knex: Knex) {
    return knex.schema
    .dropTableIfExists('student_test')
    .catch(function(e) {
        console.log(e);
    });
}