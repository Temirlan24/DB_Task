const Router = require("express");
const router = Router();

const countryController = require('../controllers/country.controller')

router.post('/', countryController.createCountry)
router.get('/', countryController.getCountries)
router.get('/:id', countryController.getCountry)
router.put('/:id', countryController.updateCountry)
router.delete('/:id', countryController.deleteCountry)


module.exports = router;