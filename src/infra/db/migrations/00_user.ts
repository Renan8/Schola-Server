import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema
    .createTableIfNotExists('user', table => {
        
        table.increments('id')
             .primary()
             .unsigned();

        table.string('name')
             .notNullable();

        table.string('email')
             .notNullable()
             .unique();
        
        table.string('password')
             .notNullable();
        
        table.dateTime('created_at')
             .defaultTo(knex.fn.now());
        
        table.dateTime('updated_at')
             .defaultTo(knex.fn.now());
    
    }).catch(function(e) {
        console.log(e);
    });
};

export async function down(knex: Knex) {
    return knex.schema
    .dropTableIfExists('user')
    .catch(function(e) {
     console.log(e);
 });;
};