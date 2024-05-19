module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: "127.0.0.1",
            user: "root",
            password: "admin",
            database: "monfortedental_db",
            requestTimeout: 60000,
            options: {
              enableArithAbort: false,
              encrypt: false,
            },
            pool:{min:0, max:5},
            acquireConnectionTimeout: 30000 
          },
    },
    production: {
        client: "mysql",
        connection: {
          host: !process.env.NODE_ENV ? process.env.AWS_HOST : "127.0.0.1",
          user: !process.env.NODE_ENV ? process.env.AWS_USER : "root",
          password: !process.env.NODE_ENV ? process.env.AWS_PASSWORD : "admin",
          database: !process.env.NODE_ENV ? process.env.AWS_DATABASE : "monfortedental_db",
          requestTimeout: 60000
        },
        options: {
          port: 3306,
        },
        pool: {
          min: 1,
          max: 50,
          propagateCreateError: true,
          idleTimeoutMillis: 300000,
          createTimeoutMillis: 300000,
          acquireTimeoutMillis: 300000,
        },
    }
};
