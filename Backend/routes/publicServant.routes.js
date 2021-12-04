const Router = require("express");
const router = Router();

const publicServantController = require('../controllers/publicServant.controller')

router.post('/', publicServantController.createPublicServant)
router.get('/', publicServantController.getPublicServant)
router.get('/:id', publicServantController.getPublicServantById)
router.put('/:id', publicServantController.updatePublicServant)
router.delete('/:id', publicServantController.deletePublicServant)


module.exports = router;