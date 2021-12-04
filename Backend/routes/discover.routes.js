const Router = require("express");
const router = Router();

const discoverController = require('../controllers/discover.controller')

router.post('/', discoverController.createDiscovery)
router.get('/', discoverController.getDiscoveries)
router.get('/:cname_id/:disease_code_id', discoverController.getDiscoveryById)
router.put('/:cname_id/:disease_code_id', discoverController.updateDiscovery)
router.delete('/:cname_id/:disease_code_id', discoverController.deleteDiscovery)


module.exports = router;