import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema
    .createTableIfNotExists('class', table => {
        
        table.increments('id')
             .primary()
             .unsigned();

        table.string('name')
             .notNullable();

        table.string('classroom_number')
             .notNullable()
             .unique();
        
        table.string('academic_level')
             .nullable();
    
    }).catch(function(e) {
        console.log(e);
    });
}

export async function down(knex: Knex) {
    return knex.schema
    .dropTableIfExists('class')
    .catch(function(e) {
        console.log(e);
    });
}