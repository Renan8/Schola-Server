import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema
    .createTableIfNotExists('notification', table => {
        
        table.increments('id')
             .primary()
             .unsigned();

        table.string('title', 30)
             .notNullable();

        table.string('description', 200)
             .notNullable();
        
        table.binary('type')
             .notNullable();
             
        table.dateTime('date_hour')
             .notNullable();

        table.boolean('read')
             .notNullable();
    
    }).catch(function(e) {
        console.log(e);
    });
}

export async function down(knex: Knex) {
    return knex.schema
    .dropTableIfExists('notification')
    .catch(function(e) {
        console.log(e);
    });
}