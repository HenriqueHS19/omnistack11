
exports.up = function(knex) {
    return knex.schema.createTable('tbOngs', function(table) {
        table.string('idOng').primary();
        table.string('nameOng').notNullable();
        table.string('emailOng').notNullable();
        table.string('whatsappOng').notNullable();
        table.string('cityOng').notNullable();
        table.string('ufOng').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('tbOngs');
};
