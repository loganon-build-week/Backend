
exports.up = function(knex) {
  return knex.schema.createTable('services', services => {
    services
        .string('username', 260)
        .foreign('username', 'users')
        .notNullable();
    services
        .string('service name', 260)
        .notNullable();
    services
        .string('email', 260)
        .notNullable();
    services
        .string('password', 260)
        .notNullable();
});
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('services');
};
