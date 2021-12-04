const Router = require("express");
const router = Router();

const diseaseTypeController = require('../controllers/diseaseType.controller')

router.post('/', diseaseTypeController.createDiseaseType)
router.get('/', diseaseTypeController.getDiseaseType)
router.get('/:id', diseaseTypeController.getDiseaseTypeById)
router.put('/:id', diseaseTypeController.updateDiseaseType)
router.delete('/:id', diseaseTypeController.deleteDiseaseType)

module.exports = router;