const express = require('express');
const axios = require('axios');
const firebaseAuth = require('../../firebaseAuth');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { firebase } = require('../../firebaseConfig');
var crypto = require('crypto');

router.get('/', firebaseAuth, async (req, res) => {
  try {
    response = await axios.get(
      process.env.DOMAIN + '/api/v2/seller_center/web/cities/'
    );
    res.json({
      cities: response.data.data,
    });
  } catch (error) {
    return res.status(422).json({ errors: error.message });
  }
});

module.exports = router;
