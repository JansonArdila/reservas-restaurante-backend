const dns = require('dns');
const { Pool } = require('pg');
require('dotenv').config();


// CONEXIÓN DEPLOY

/*console.log("Conectando a:", process.env.DATABASE_URL);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // necesario para Supabase
});

// Test de conexión
(async () => {
    try {
        const client = await pool.connect();
        console.log("✅ Conectado a la base de datos Supabase");
        client.release();
    } catch (err) {
        console.error("❌ Error de conexión:", err.message);
    }
})();*/

// CONEXIÓN LOCAL

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Verificar conexión
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error connecting to PostgreSQL:', err.message);
    } else {
        console.log('Connected to PostgreSQL database');
        release();
    }
});

module.exports = pool;