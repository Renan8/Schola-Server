import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema
    .createTableIfNotExists('class_lesson', table => {
        
        table.integer('id_class')
             .references('id')
             .inTable('class')
             .notNullable()
             .onDelete('cascade')
             .onUpdate('cascade');

        table.integer('id_lesson')
             .references('id')
             .inTable('lesson')
             .notNullable()
             .onDelete('cascade')
             .onUpdate('cascade');

        table.time('hour')
             .notNullable();
        
        table.integer('day_of_week')
             .notNullable();
    
    }).catch(function(e) {
        console.log(e);
    });
}

export async function down(knex: Knex) {
    return knex.schema
    .dropTableIfExists('class_lesson')
    .catch(function(e) {
        console.log(e);
    });
}