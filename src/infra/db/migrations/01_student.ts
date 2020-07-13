import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema
    .createTableIfNotExists('student', table => {
        
        table.increments('id')
             .primary()
             .unsigned();

        table.string('registration_number')
             .notNullable()
             .unique();

        table.string('name')
             .notNullable();

        table.string('cellphone', 15)
             .nullable()
             .unique();
        
        table.string('photo')
             .nullable();
        
        table.date('birthday_date')
             .nullable();

    }).catch(function(e) {
        console.log(e);
    });
}

export async function down(knex: Knex) {
    return knex.schema
    .dropTableIfExists('student')
    .catch(function(e) {
        console.log(e);
    });
}