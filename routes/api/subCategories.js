const express = require('express');
const axios = require('axios');
const firebaseAuth = require('../../firebaseAuth');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { firebase } = require('../../firebaseConfig');
var crypto = require('crypto');

router.get(
  '/',
  firebaseAuth,
  [check('sellerId', 'Seller ID is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.errors[0].msg });
    }
    try {
      response = await axios.get(
        process.env.DOMAIN +
          '/api/v2/seller_center/web/sub_categories/by_seller?seller_id=' +
          req.query.sellerId
      );
      res.json({
        subCategories: response.data.data,
      });
    } catch (error) {
      return res.status(422).json({ errors: error.message });
    }
  }
);

module.exports = router;
