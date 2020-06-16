import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema
    .createTableIfNotExists('notification_to', table => {
        
        table.increments('id')
             .primary()
             .unsigned();

        table.integer('id_notification')
             .references('id')
             .inTable('notification')
             .notNullable()
             .onDelete('restrict')
             .onUpdate('cascade');

        table.integer('id_student')
             .references('id')
             .inTable('student')
             .nullable()
             .onDelete('restrict')
             .onUpdate('cascade');
        
        table.integer('id_class')
             .references('id')
             .inTable('class')
             .nullable()
             .onDelete('restrict')
             .onUpdate('cascade');
    
    }).catch(function(e) {
        console.log(e);
    });
}

export async function down(knex: Knex) {
    return knex.schema
    .dropTableIfExists('notification_to')
    .catch(function(e) {
        console.log(e);
    });
}