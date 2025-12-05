const pool = require('../config/database');

class Reservacion {
    static async create(reservationData) {
        const {
            customer_name,
            customer_email,
            customer_phone,
            reservation_date,
            reservation_time,
            party_size,
            table_number,
            special_requests,
            status = 'pending'
        } = reservationData;

        const query = `
      INSERT INTO reservations (
        customer_name, customer_email, customer_phone, 
        reservation_date, reservation_time, party_size, 
        table_number, special_requests, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;

        const values = [
            customer_name,
            customer_email,
            customer_phone,
            reservation_date,
            reservation_time,
            party_size,
            table_number,
            special_requests,
            status
        ];

        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error creando la reserva:', error);
            throw error;
        }
    }

    static async getAll() {
        try {
            const result = await pool.query(
                'SELECT * FROM reservations ORDER BY reservation_date DESC, reservation_time DESC'
            );
            return result.rows;
        } catch (error) {
            console.error('Error al obtener reservas:', error);
            throw error;
        }
    }

    static async getByDate(date) {
        try {
            const result = await pool.query(
                'SELECT * FROM reservations WHERE reservation_date = $1 ORDER BY reservation_time',
                [date]
            );
            return result.rows;
        } catch (error) {
            console.error('Error al obtener reservas por fecha:', error);
            throw error;
        }
    }

    static async getById(id) {
        try {
            const result = await pool.query(
                'SELECT * FROM reservations WHERE id = $1',
                [id]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al obtener reservas por ID:', error);
            throw error;
        }
    }

    static async update(id, updates) {
        try {
            const setClause = Object.keys(updates)
                .map((key, index) => `${key} = $${index + 2}`)
                .join(', ');

            const values = [id, ...Object.values(updates)];

            const result = await pool.query(
                `UPDATE reservations SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
                values
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al actualizar la reserva:', error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            const result = await pool.query(
                'DELETE FROM reservations WHERE id = $1 RETURNING *',
                [id]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error al borrar la reserva:', error);
            throw error;
        }
    }
}

module.exports = Reservacion;