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
      authId = firebase.auth().currentUser.uid;
      subCategoryId = '';
      if (req.query.subCategoryId !== 'all') {
        subCategoryId = req.query.subCategoryId;
      }
      sign = crypto
        .createHash('sha512')
        .update('seller' + authId + authId)
        .digest('hex');
      response = await axios.get(
        process.env.DOMAIN +
          'api/v2/seller_center/web/products/by_seller?seller_id=' +
          req.query.sellerId +
          '&auth_id=' +
          authId +
          '&sub_category_id=' +
          subCategoryId,
        { headers: { sign: sign } }
      );
      res.json({
        products: response.data.data,
      });
    } catch (error) {
      return res.status(422).json({ errors: error.message });
    }
  }
);

router.get(
  '/:id',
  firebaseAuth,
  [check('id', 'Product ID is required').not().isEmpty()],
  async (req, res) => {
    res;
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
      response = await axios.get(
        process.env.DOMAIN +
          'api/v2/seller_center/web/products/' +
          req.params.id +
          '?auth_id=' +
          authId,

        { headers: { sign: sign } }
      );
      res.json({
        product: response.data.data,
      });
    } catch (error) {
      return res.status(422).json({ errors: error.message });
    }
  }
);

router.post(
  '/new',
  firebaseAuth,
  [check('sellerId', 'Seller ID is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.errors[0].msg, test: 'error' });
    }
    try {
      authId = firebase.auth().currentUser.uid;
      sign = crypto
        .createHash('sha512')
        .update('seller' + authId + authId)
        .digest('hex');
      response = await axios.post(
        process.env.DOMAIN + 'api/v2/seller_center/web/products/create',
        {
          auth_id: authId,
          body: {
            seller_id: req.query.sellerId,
            sub_category_id: req.body.subCategoryId,
            child_sub_category_id: req.body.childSubCategoryId,
            name_en: req.body.nameEn,
            name_ar: req.body.nameAr,
            description_en: req.body.descriptionEn,
            description_ar: req.body.descriptionAr,
            color: 'n/a',
            price_cents: Math.floor(req.body.priceCents * 100),
            discount_price_cents: Math.floor(
              (req.body.discountPriceCents || 0) * 100
            ),
            quantity: 0,
            status: 'available',
            featured: false,
            gender_compatibility: req.body.genderCompatibility,
            stocks: req.body.stocks,
          },
          image: req.body.image.link,
          sub_image1:
            req.body.subImage1.edited == true ? req.body.subImage1.link : null,
          sub_image2:
            req.body.subImage2.edited == true ? req.body.subImage2.link : null,
          sub_image3:
            req.body.subImage3.edited == true ? req.body.subImage3.link : null,
          sub_image4:
            req.body.subImage4.edited == true ? req.body.subImage4.link : null,
        },
        { headers: { sign: sign } }
      );
      res.json({
        result: response.data,
      });
    } catch (error) {
      return res.status(422).json({ errors: error.response.data });
    }
  }
);

router.put(
  '/update',
  firebaseAuth,
  [check('id', 'Product ID is required').not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(res);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.errors[0].msg });
    }
    try {
      authId = firebase.auth().currentUser.uid;
      sign = crypto
        .createHash('sha512')
        .update('seller' + authId + authId)
        .digest('hex');

      const editedImages = [
        req.body.subImage1,
        req.body.subImage2,
        req.body.subImage3,
        req.body.subImage4,
      ].filter((image) => image.removed == true && image.id);
      const editedImagesId = editedImages.map((edited) => edited.id);
      response = await axios.put(
        process.env.DOMAIN + 'api/v2/seller_center/web/products/update',
        {
          auth_id: authId,
          id: req.body.id,
          name_en: req.body.nameEn,
          name_ar: req.body.nameAr,
          description_en: req.body.descriptionEn,
          description_ar: req.body.descriptionAr,
          price_cents: Math.floor(req.body.priceCents * 100),
          discount_price_cents: Math.floor(
            (req.body.discountPriceCents || 0) * 100
          ),
          status: req.body.status,
          gender_compatibility: req.body.genderCompatibility,
          image:
            typeof req.body.image !== 'undefined' &&
            req.body.image.edited == true
              ? req.body.image.link
              : null,
          sub_image1:
            typeof req.body.subImage1 !== 'undefined' &&
            req.body.subImage1.edited == true
              ? req.body.subImage1.link
              : null,
          sub_image2:
            typeof req.body.subImage2 !== 'undefined' &&
            req.body.subImage2.edited == true
              ? req.body.subImage2.link
              : null,
          sub_image3:
            typeof req.body.subImage3 !== 'undefined' &&
            req.body.subImage3.edited == true
              ? req.body.subImage3.link
              : null,
          sub_image4:
            typeof req.body.subImage4 !== 'undefined' &&
            req.body.subImage4.edited == true
              ? req.body.subImage4.link
              : null,
          deleted_sub_images_ids:
            typeof editedImagesId !== 'undefined' ? editedImagesId : null,
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

router.delete(
  '/:id',
  firebaseAuth,
  [check('id', 'Product ID is required').not().isEmpty()],
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
          'api/v2/seller_center/web/products/' +
          req.params.id +
          '?auth_id=' +
          authId,
        { headers: { sign: sign } }
      );
      res.json({
        message: response.data.message,
      });
    } catch (error) {
      return res.status(422).json({ errors: error.message });
    }
  }
);

router.put('/update_status', firebaseAuth, async (req, res) => {
  try {
    authId = firebase.auth().currentUser.uid;
    sign = crypto
      .createHash('sha512')
      .update('seller' + authId + authId)
      .digest('hex');
    response = await axios.put(
      process.env.DOMAIN + 'api/v2/seller_center/web/products/update_status',
      {
        auth_id: authId,
        product_id: req.query.productId,
        status: req.body.status,
      },
      { headers: { sign: sign } }
    );
    res.json({
      result: response.data,
    });
  } catch (error) {
    return res.status(422).json({ errors: error.response.data });
  }
});

module.exports = router;
