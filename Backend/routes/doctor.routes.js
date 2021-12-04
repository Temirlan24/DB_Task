const Router = require("express");
const router = Router();

const doctorController = require('../controllers/doctor.controller')

router.post('/', doctorController.createDoctor)
router.get('/', doctorController.getDoctor)
router.get('/:id', doctorController.getDoctorById)
router.put('/:id', doctorController.updateDoctor)
router.delete('/:id', doctorController.deleteDoctor)


module.exports = router;