import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema
    .createTableIfNotExists('parent', table => {
        
        table.increments('id')
             .primary()
             .unsigned();

        table.string('name')
             .notNullable();
        
        table.string('email')
             .notNullable()
             .unique();
        
        table.string('cellphone', 15)
             .nullable()
             .unique();
    
    }).catch(function(e) {
        console.log(e);
    });
}

export async function down(knex: Knex) {
    return knex.schema
    .dropTableIfExists('parent')
    .catch(function(e) {
        console.log(e);
    });
}