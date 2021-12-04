const Router = require("express");
const router = Router();

const recordController = require('../controllers/record.controller')

router.post('/', recordController.createRecord)
router.get('/', recordController.getRecords)
router.get('/:email_id/:cname_id/:disease_code_id', recordController.getRecordById)
router.put('/:email_id/:cname_id/:disease_code_id', recordController.updateRecord)
router.delete('/:email_id/:cname_id/:disease_code_id', recordController.deleteRecord)

module.exports = router;