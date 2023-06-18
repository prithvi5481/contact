const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Contact list
router.get('/', contactController.list);
router.post('/add', contactController.add);
router.get('/delete/:id', contactController.delete);

module.exports = router;
