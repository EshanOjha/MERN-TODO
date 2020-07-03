const express = require('express');
const router = express.Router();
const deployController = require('../controllers/deployController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/api/getAllDeployments', deployController.newsApi);

router.post('/api/addDeployment', deployController.addDeployment);

router.post('/api/deleteDeployment', deployController.deleteDeployment)

module.exports = router;
