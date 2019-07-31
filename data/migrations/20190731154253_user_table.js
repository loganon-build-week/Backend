
exports.up = function (knex) {
    return knex.schema.createTable('users', users => {
        users
            .increments()
            .string('username', 260)
            .notNullable()
            .unique();
        users
            .string('password', 260)
            .notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
