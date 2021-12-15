const { Router } = require('express');
const { getEventos, crearEvento, actualizarEvento, borrarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');


/*
    Event Routes
    /api/events
 */


const router = Router();

// Validar todas las rutas con JWT que aparecen debajo de esta linea
router.use( validarJWT ); 

// Obtener eventos
router.get('/', getEventos );

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento );

// Actualizar Evento
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ], 
    actualizarEvento );

// Borrar Evento
router.delete('/:id', borrarEvento );


module.exports = router;