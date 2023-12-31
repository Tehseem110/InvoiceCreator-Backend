const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { createInvoicePdf } = require('../controller/invoice.controller');

router.get('/createInvoice', createInvoicePdf);

module.exports = router;
