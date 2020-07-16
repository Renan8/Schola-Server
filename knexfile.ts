import path from 'path';

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'infra', 'db', 'schola.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'infra', 'db', 'migrations')
    }
};