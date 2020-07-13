import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema
    .createTableIfNotExists('test', table => {
        
        table.increments('id')
             .primary()
             .unsigned();

        table.string('name', 50)
             .notNullable();

        table.integer('id_class')
             .notNullable()
             .references('id')
             .inTable('class')
             .onDelete('restrict')
             .onUpdate('cascade');
        
        table.integer('id_lesson')
             .notNullable()
             .references('id')
             .inTable('lesson')
             .onDelete('restrict')
             .onUpdate('cascade');
    
    }).catch(function(e) {
        console.log(e);
    });
}

export async function down(knex: Knex) {
    return knex.schema
    .dropTableIfExists('test')
    .catch(function(e) {
        console.log(e);
    });
}