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
      process.env.DOMAIN +
        'api/v2/seller_center/web/stocks/by_product?product_id=' +
        req.query.productId
    );
    res.json({
      sizes: response.data.data,
    });
  } catch (error) {
    return res.status(422).json({ errors: error.message });
  }
});

router.post(
  '/',
  firebaseAuth,
  [check('productId', 'Product ID is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.errors[0].msg });
    }
    try {
      authId = firebase.auth().currentUser.uid;
      sign = crypto
        .createHash('sha512')
        .update('seller' + authId + authId)
        .digest('hex');
      response = await axios.post(
        process.env.DOMAIN + 'api/v2/seller_center/web/stocks',
        {
          auth_id: authId,
          product_id: req.body.productId,
          size_id: req.body.sizeId,
          quantity: req.body.quantity,
        },
        { headers: { sign: sign } }
      );
      res.json({
        result: response.data,
      });
    } catch (error) {
      return res.status(422).json({ errors: error.message });
    }
  }
);

router.put(
  '/:id',
  firebaseAuth,
  [check('id', 'Stock ID is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.errors[0].msg });
    }
    try {
      authId = firebase.auth().currentUser.uid;
      sign = crypto
        .createHash('sha512')
        .update('seller' + authId + authId)
        .digest('hex');
      response = await axios.put(
        process.env.DOMAIN + 'api/v2/seller_center/web/stocks/' + req.params.id,
        {
          auth_id: authId,
          quantity: req.body.quantity,
        },
        { headers: { sign: sign } }
      );
      res.json({
        sizes: response.data,
      });
    } catch (error) {
      return res.status(422).json({ errors: error.message });
    }
  }
);

router.delete(
  '/:id',
  firebaseAuth,
  [check('id', 'Stock ID is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.errors[0].msg });
    }
    try {
      authId = firebase.auth().currentUser.uid;
      sign = crypto
        .createHash('sha512')
        .update('seller' + authId + authId)
        .digest('hex');
      response = await axios.delete(
        process.env.DOMAIN +
          'api/v2/seller_center/web/stocks/' +
          req.params.id +
          '?auth_id=' +
          authId,
        { headers: { sign: sign } }
      );
      res.json({
        sizes: response.data,
      });
    } catch (error) {
      return res.status(422).json({ errors: error.message });
    }
  }
);

module.exports = router;
