const Router = require("express");
const router = Router();

const diseaseController = require('../controllers/disease.controller')

router.post('/', diseaseController.createDisease)
router.get('/', diseaseController.getDiseases)
router.get('/:id', diseaseController.getDiseaseById)
router.put('/:id', diseaseController.updateDisease)
router.delete('/:id', diseaseController.deleteDisease)


module.exports = router;