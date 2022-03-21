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
        'api/v2/seller_center/web/seller_cities/by_seller?seller_id=' +
        req.query.sellerId
    );
    res.json({
      seller_cities: response.data.data,
    });
  } catch (error) {
    return res.status(422).json({ errors: error.message });
  }
});

router.post('/', firebaseAuth, async (req, res) => {
  try {
    authId = firebase.auth().currentUser.uid;
    sign = crypto
      .createHash('sha512')
      .update('seller' + authId + authId)
      .digest('hex');
    response = await axios.post(
      process.env.DOMAIN + 'api/v2/seller_center/web/seller_cities',
      {
        auth_id: authId,
        seller_id: req.query.sellerId,
        city_id: req.body.cityId,
        shipping_fee_cents: Math.floor(req.body.shippingFee * 100),
        min_shipping_day: req.body.minShippingDay,
        max_shipping_day: req.body.maxShippingDay,
        min_order_price_cents: Math.floor(
          (req.body.minOrderPriceCents || 0) * 100
        ),
      },
      { headers: { sign: sign } }
    );
    res.json({
      response: response.data,
    });
  } catch (error) {
    return res.status(422).json({ errors: error.message });
  }
});

router.put(
  '/:id',
  firebaseAuth,
  [check('id', 'Seller City ID is required').not().isEmpty()],
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
        process.env.DOMAIN +
          'api/v2/seller_center/web/seller_cities/' +
          req.params.id,
        {
          auth_id: authId,
          shipping_fee_cents: Math.floor(req.body.shippingFee * 100),
          min_shipping_day: req.body.minShippingDay,
          max_shipping_day: req.body.maxShippingDay,
          min_order_price_cents: Math.floor(
            (req.body.minOrderPriceCents || 0) * 100
          ),
        },
        { headers: { sign: sign } }
      );
      res.json({
        response: response.data,
      });
    } catch (error) {
      return res.status(422).json({ errors: error.message });
    }
  }
);

router.delete(
  '/:id',
  firebaseAuth,
  [check('id', 'Seller City ID is required').not().isEmpty()],
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
          'api/v2/seller_center/web/seller_cities/' +
          req.params.id +
          '?auth_id=' +
          authId,
        { headers: { sign: sign } }
      );
      res.json({
        response: response.data,
      });
    } catch (error) {
      return res.status(422).json({ errors: error.message });
    }
  }
);

module.exports = router;
