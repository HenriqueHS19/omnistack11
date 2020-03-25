
exports.up = function(knex) {
    return knex.schema.createTable('tbIncidents', function(table) {
        // Primary Key -> Auto increment
        table.increments();
        
        table.string('titleIncidents').notNullable();
        table.string('descriptionIncidents').notNullable();
        table.decimal('valueIncidents').notNullable();

        // Foreign key
        table.string('idOng').notNullable();
        table.foreign('idOng').references('idOng').inTable('tbOngs');
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('tbIncidents');
};
