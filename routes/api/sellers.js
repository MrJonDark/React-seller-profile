const express = require('express');
const axios = require('axios');
const firebaseAuth = require('../../firebaseAuth');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { firebase, admin } = require('../../firebaseConfig');
const { GoogleSpreadsheet } = require('google-spreadsheet');
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
      sign = crypto
        .createHash('sha512')
        .update('seller' + authId + authId)
        .digest('hex');
      response = await axios.get(
        process.env.DOMAIN +
          'api/v2/seller_center/web/sellers/' +
          req.query.sellerId +
          '?auth_id=' +
          authId,
        { headers: { sign: sign } }
      );
      res.json({
        seller: response.data,
      });
    } catch (error) {
      return res.status(422).json({ errors: error.message });
    }
  }
);

// router.post(
//     "/become_seller", [
//         check("name", "Name is required").not().isEmpty(),
//         check("email", "Please include a valid Email").isEmail(),
//         check("storeName", "Store Name is required").not().isEmpty(),
//         check("city", "City is required").not().isEmpty(),
//         check("phoneNumber", "Please include a valid Phone Number").isMobilePhone(),
//     ],
//     async(req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.errors[0].msg });
//         }

//         try {
//             const doc = new GoogleSpreadsheet(
//                 "15t7hdXNdNkTO0wuMxYl8z3SL21Mj2IvZry6mm5eVYtM"
//             );
//             await doc.useServiceAccountAuth({
//                 client_email: "sellersignup@shopless-seller-center.iam.gserviceaccount.com",
//                 private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDN8nBG6YHfRuyy\nQxz9uH4TRY0qAB3CAR2dEUpneC5nMyuZCu2Ch931cmHDwMVSkbKlLoMsISrIDawh\nP3w+47HQZftQ9g+kacIg34VfwqCsluqC6MByHvFipTDFBk4iVhuUFOj37JkH3Ok9\nrpGtKRyJILGfCfqBOmhBbM7NaBieQjM/lEUWd88xwMy5U4flcmY1H1qntC/QNR48\nu+dKdbsppFltNhco1kThr9eK7wNGhBDfOAmCjqjxeADqTW4W71IZG+uOjM0gWFzP\newKKjkyMbK6JY/5N0klEpU3U3EkTP6Oby5vW8aNky7L3SRo9EQ3/TUKLBQ2CY6jA\nOcwanG5TAgMBAAECggEAANuL4GYMu1OXuMNx6/YAJcsRBqSj0eaaSeAhqDwiJAw2\n6lh1GYOJAWSAN9WMAzVsXVa6Ljadrv7cjcWwsXh0ULwT+52kpTcBY72g8ZgD7808\nIDNeeNk9Ff6VYpOt1gq5hLgCWt5TwIzgwZg0P4mkEUVVudOuyfsWcfDd0IRQzpbj\naZ/NYlh3m3UD4XEGKQ4wFPZNQGAzAyQjUuggKcuXgrNpbgF9tQxKaZw3KOqbMs+B\nJa4La9FAXZoD0J2iVUl4T8wJbXslx/JVSJPdsJrPGlz+E/vs7aH5qHpsiq9DIn5z\nZGP4i9PaYiFZYMUsYUIcFvTJPtePQJ9cILNFH267zQKBgQD4z5Io7V2RFOnBsXqx\nKYVH8oIgYRWOXJwGCKLwuQrzW0L16jHQSYBIpsqgbn5HZKLonlm86s5cxH/Do2+e\n0HqI1AQ3APkcTTyptzgikE4RG6oVpUSRUDgRaGSERhUpPtPRgyaM8GIXm+JP0vZt\nCLmZu9E8YWLjgeE9EePGXlE3jwKBgQDT5c7xLYMWLZ0xD+GY+RgtE0IjnNO+RdCw\nIv654auHTNkuRYCe2kwBb/l8FZuwwLgOvbegW+KIGoEiGyLfgQL4YNyxBUlGNQ8m\nh3mOfkJRNGILzpbcEMaoSzUqWgDJot2HUOJu1Muzeb9D9diCNmP7qc2ChlcHKQqv\n+rYMVgwa/QKBgQDUpEGb7NEMjz0AJvhetMeNp7qChbZwhsFpfrQS23J6bUKa/N45\nzrduX+3IkuYlieKYv8yd4mcfbWhsASACMNaoXdqET7aW84Om4El/cKjngicofKhP\nMKnaZseRLHwlVeadpmKqDT8oQjd2VSv6H3zP4G6AFhL3sSaYlNN/01fCDQKBgQCE\nmidqngSOeHUKItoWlKsgahDVoGqRg7cYwo2NXT+uJ9UxM6VNw2YU8DG8CPmpHrEP\n6IFlBJs6ePuekES+gUmOjW8OCDTWjpWwks7q8PAnSRSiNuIJTSZEYuweWLxtclIX\nP/KzUM84vVOH/+1BbzAaaSSGLfOAM5rQjaAnECH7MQKBgQDexx5PkHqdUyA2jNRB\nxh2ch0DeiD7ByOkS7YVOvfzN15FmURMGOUgZg0Y2W+qG3PaCWcnNq4IJeVwfrVNB\nQCXV5X+8cK5sl+41hBEQrW2GB8hMJJ60sgQG19UzG5NlyGx014wE521DpJd/Hg1z\nIB621OlAC/jV0/UlQ5O0taJZow==\n-----END PRIVATE KEY-----\n",

//                 // client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//                 // private_key: process.env.GOOGLE_PRIVATE_KEY,
//             });
//             await doc.loadInfo();
//             const sheet = doc.sheetsByIndex[1];
//             await sheet.addRow([
//                 req.body.name,
//                 req.body.storeName,
//                 req.body.email,
//                 req.body.city,
//                 "'" + req.body.phoneNumber,
//                 Date(),
//             ]);
//             res.status(200).json("Application Submitted");
//         } catch (err) {
//             return res.status(422).json({ errors: err.message });
//         }
//     }
// );

router.post('/create', firebaseAuth, async (req, res) => {
  try {
    authId = firebase.auth().currentUser.uid;
    sign = crypto
      .createHash('sha512')
      .update('seller' + authId + authId)
      .digest('hex');
    response = await axios.post(
      process.env.DOMAIN + 'api/v2/sellers/create',
      {
        auth_id: authId,
        name: req.body.name,
        phone_number: req.body.phoneNumber,
        description_en: req.body.descriptionEn,
        description_ar: req.body.descriptionAr,
        logo: req.body.logo,
        cover: req.body.cover,
        category_id: req.body.categoryId,
        user_id: req.body.userId,
        cashback_percentage: req.body.cashbackPercentage,
      },
      { headers: { sign: sign } }
    );
    res.json({
      message: response.data.message,
      user: response.data.user,
      seller: response.data.seller,
    });
  } catch (error) {
    return res.status(422).json({ errors: error.response.data });
  }
});

router.put('/update_cover', firebaseAuth, async (req, res) => {
  try {
    authId = firebase.auth().currentUser.uid;
    sign = crypto
      .createHash('sha512')
      .update('seller' + authId + authId)
      .digest('hex');
    response = await axios.put(
      process.env.DOMAIN + 'api/v2/seller_center/web/sellers/update_cover',
      {
        auth_id: authId,
        seller_id: req.body.sellerId,
        cover: req.body.cover,
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

router.put('/update_logo', firebaseAuth, async (req, res) => {
  try {
    authId = firebase.auth().currentUser.uid;
    sign = crypto
      .createHash('sha512')
      .update('seller' + authId + authId)
      .digest('hex');
    response = await axios.put(
      process.env.DOMAIN + 'api/v2/seller_center/web/sellers/update_logo',
      {
        auth_id: authId,
        seller_id: req.body.sellerId,
        logo: req.body.logo,
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

router.put('/update_info', firebaseAuth, async (req, res) => {
  try {
    authId = firebase.auth().currentUser.uid;
    sign = crypto
      .createHash('sha512')
      .update('seller' + authId + authId)
      .digest('hex');
    response = await axios.put(
      process.env.DOMAIN + 'api/v2/seller_center/web/sellers/update_info',
      {
        auth_id: authId,
        seller_id: req.query.sellerId,
        description_en: req.body.descriptionEn,
        description_ar: req.body.descriptionAr,
        phone_number: req.body.phoneNumber,
        cashback_percentage: req.body.cashbackPercentage,
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

router.put('/update_status', firebaseAuth, async (req, res) => {
  try {
    authId = firebase.auth().currentUser.uid;
    sign = crypto
      .createHash('sha512')
      .update('seller' + authId + authId)
      .digest('hex');
    response = await axios.put(
      process.env.DOMAIN + 'api/v2/seller_center/web/sellers/update_status',
      {
        auth_id: authId,
        seller_id: req.query.sellerId,
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
