const Router = require("express");
const router = Router();

const specializeController = require('../controllers/specialize.controller')

router.post('/', specializeController.createSpecialize)
router.get('/', specializeController.getSpecialize)
router.get('/:specialize_id/:email_id', specializeController.getSpecializeById)
router.put('/:specialize_id/:email_id', specializeController.updateSpecialize)
router.delete('/:specialize_id/:email_id', specializeController.deleteSpecialize)

module.exports = router;