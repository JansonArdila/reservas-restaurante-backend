const Reservation = require('../models/reservacion');
const { sendMail } = require('../utils/emailService');
const nodemailer = require("nodemailer");
const { reservationConfirmationEmail } = require('../utils/emailTemplates');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


const reservasController = {
    // Crear nueva reserva
    async crearReserva(req, res) {
        try {
            // Validaciones básicas
            if (!req.body.customer_name || !req.body.customer_email) {
                return res.status(400).json({
                    error: 'Nombre y email son requeridos'
                });
            }

            if (!req.body.reservation_date || !req.body.reservation_time) {
                return res.status(400).json({
                    error: 'Fecha y hora son requeridas'
                });
            }

            if (!req.body.party_size || req.body.party_size < 1) {
                return res.status(400).json({
                    error: 'Número de personas inválido'
                });
            }

            //const reservation = await Reservation.create(req.body);

            await transporter.sendMail({
                from: `"Restaurante" <${process.env.EMAIL_USER}>`,
                to: reservation.customer_email,
                subject: "Confirmación de tu reserva",
                html: "hola"
            });

            res.status(201).json({
                success: true,
                data: reservation,
                message: 'Reserva creada exitosamente'
            });
        } catch (error) {
            console.error('Error en crearReserva:', error);
            res.status(500).json({
                error: 'Error al crear la reserva',
                details: error.message
            });
        }
    },

    // Obtener todas las reservas
    async getAllReservations(req, res) {
        try {
            const reservations = await Reservation.getAll();
            res.json({
                success: true,
                count: reservations.length,
                data: reservations
            });
        } catch (error) {
            console.error('Error en getAllReservations:', error);
            res.status(500).json({
                error: 'Error al obtener las reservas'
            });
        }
    },

    // Obtener reservas por fecha
    async getReservationsByDate(req, res) {
        try {
            const { date } = req.params;
            const reservations = await Reservation.getByDate(date);
            res.json({
                success: true,
                count: reservations.length,
                data: reservations
            });
        } catch (error) {
            console.error('Error en getReservationsByDate:', error);
            res.status(500).json({
                error: 'Error al obtener las reservas por fecha'
            });
        }
    },

    // Obtener reserva por ID
    async getReservationById(req, res) {
        try {
            const { id } = req.params;
            const reservation = await Reservation.getById(id);

            if (!reservation) {
                return res.status(404).json({
                    error: 'Reserva no encontrada'
                });
            }

            res.json({
                success: true,
                data: reservation
            });
        } catch (error) {
            console.error('Error en getReservationById:', error);
            res.status(500).json({
                error: 'Error al obtener la reserva'
            });
        }
    },

    // Actualizar reserva
    async actualizarReserva(req, res) {
        try {
            const { id } = req.params;
            const reservation = await Reservation.update(id, req.body);

            if (!reservation) {
                return res.status(404).json({
                    error: 'Reserva no encontrada'
                });
            }

            res.json({
                success: true,
                data: reservation,
                message: 'Reserva actualizada exitosamente'
            });
        } catch (error) {
            console.error('Error en actualizarReserva:', error);
            res.status(500).json({
                error: 'Error al actualizar la reserva'
            });
        }
    },

    // Eliminar reserva
    async borrarReserva(req, res) {
        try {
            const { id } = req.params;
            const reservation = await Reservation.delete(id);

            if (!reservation) {
                return res.status(404).json({
                    error: 'Reserva no encontrada'
                });
            }

            res.json({
                success: true,
                message: 'Reserva eliminada exitosamente'
            });
        } catch (error) {
            console.error('Error en borrarReserva:', error);
            res.status(500).json({
                error: 'Error al eliminar la reserva'
            });
        }
    }
};

module.exports = reservasController;