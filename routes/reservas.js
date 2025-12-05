const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservasController');

// @route   POST /api/reservas
// @desc    Crear una nueva reserva
router.post('/', reservationController.crearReserva);

// @route   GET /api/reservas
// @desc    Obtener todas las reservas
router.get('/', reservationController.getAllReservations);

// @route   GET /api/reservas/date/:date
// @desc    Obtener reservas por fecha
router.get('/date/:date', reservationController.getReservationsByDate);

// @route   GET /api/reservas/:id
// @desc    Obtener reserva por ID
router.get('/:id', reservationController.getReservationById);

// @route   PUT /api/reservas/:id
// @desc    Actualizar reserva
router.put('/:id', reservationController.actualizarReserva);

// @route   DELETE /api/reservas/:id
// @desc    Eliminar reserva
router.delete('/:id', reservationController.borrarReserva);

module.exports = router;