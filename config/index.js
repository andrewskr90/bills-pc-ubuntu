const config = {
    MYSQL: {
        host: 'localhost',
        user: 'root',
        database: 'bills_pc',
        password: process.env.SQL_PASSWORD
    },
    PTCGIO_API: {
        baseURL: 'https://api.pokemontcg.io/v2'
    },
    BILLS_PC_API: {
        options: {
            withCredentials: true,
            baseURL: 'http://localhost:7070'
        }
    }
}

module.exports = config
