import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema
    .createTableIfNotExists('event', table => {
        
        table.increments('id')
             .primary()
             .unsigned();

        table.string('title', 30)
             .notNullable();

        table.string('description', 200)
             .nullable();
        
        table.dateTime('date_hour')
             .notNullable();

        table.string('place', 200)
             .notNullable();
    
    }).catch(function(e) {
        console.log(e);
    });
}

export async function down(knex: Knex) {
    return knex.schema
    .dropTableIfExists('event')
    .catch(function(e) {
        console.log(e);
    });
}