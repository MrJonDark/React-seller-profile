const express = require('express');
const axios = require('axios');
const firebaseAuth = require('../../firebaseAuth');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { firebase } = require('../../firebaseConfig');
const jwt = require('jwt-encode');
const generateNonce = require('./apple_auth')
const secret = `d143baae7d29f9c1e66687b82e1bc9ce
9e2ce51374f98333075c9419014d86cf
faaa2e64c0e3d1e25337810cb2499cf3
ae0b58d9ead51f7843383c4d045d1afa
911dcc7ad643220d4feee587c6b171e4`;
var crypto = require('crypto');

router.post(
    '/login', [
        //check('email', 'Please include a valid email').isEmail(),
        // check('password', 'Password is required').not().isEmpty(),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.errors[0].msg });
        }
        try {
            firebase
                .auth()
                .signInWithEmailAndPassword(req.body.email, req.body.password)
                .then(function() {
                    firebase
                        .auth()
                        .currentUser.getIdToken(true)
                        .then(async function(idToken) {
                            authId = firebase.auth().currentUser.uid;
                            sign = crypto
                                .createHash('sha512')
                                .update('seller' + authId + authId)
                                .digest('hex');
                            response = await axios.get(
                                process.env.DOMAIN + 'api/v2/seller_center/web/users/' + authId, { headers: { sign: sign } }
                            );
                            res.setHeader('Authorization', idToken);
                            const data = {
                                user: response.data.user,
                                seller: response.data.seller,
                            };
                            res.json(jwt(data, secret));
                        })
                        .catch(function(error) {

                            return res.status(422).json({ errors: error.message });
                        });
                })
                .catch(function(error) {

                    return res.status(422).json({ errors: error.message });
                });
        } catch (error) {

            return res.status(422).json({ errors: error.message });
        }
    }
);

router.post(
    '/signup', [
        check('name', 'Name is required').not().isEmpty(),
        check('phoneNumber', 'Phone Number is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 }),
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.errors[0].msg });
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(req.body.email, req.body.password)
            .then(async function() {
                response = await axios.post(
                    process.env.DOMAIN + 'api/v2/seller_center/web/users/create', {
                        email: req.body.email,
                        phone_number: req.body.phoneNumber,
                        status: 'active',
                        user_type: 'seller',
                        name: req.body.name,
                        auth_id: firebase.auth().currentUser.uid,
                    }
                );
                if (res.statusCode !== 200) {
                    res.send('Error');
                    res.end();
                }
                firebase
                    .auth()
                    .currentUser.getIdToken(true)
                    .then(function(idToken) {
                        res.setHeader('Authorization', idToken);
                        const data = {
                            user: response.data.user,
                        };
                        res.json(jwt(data, secret));
                    })
                    .catch(function(error) {
                        return res.status(422).json({ errors: error.message });
                    });
            })
            .catch((error) => {

                if (firebase.auth().currentUser != undefined) {
                    firebase.auth().currentUser.delete();
                    return res
                        .status(422)
                        .json({ errors: error.response.data.errors.message });
                } else {
                    return res.status(422).json({ errors: error.message });
                }
            });
    }
);

router.post('/google_auth', async(req, res) => {
    var credential = firebase.auth.GoogleAuthProvider.credential(
        req.body.id_token
    );
    firebase
        .auth()
        .signInWithCredential(credential)
        .then(async function() {
            currentUser = firebase.auth().currentUser;
            response = await axios.post(
                process.env.DOMAIN + 'api/v2/seller_center/web/users/oauth', {
                    email: currentUser.email,
                    status: 'active',
                    user_type: 'seller',
                    name: currentUser.displayName,
                    auth_id: currentUser.uid,
                }
            );
            currentUser.getIdToken(true).then(function(idToken) {
                res.setHeader('Authorization', idToken);
                const data = {
                    user: response.data.user,
                    seller: response.data.seller,
                };
                res.json(jwt(data, secret));
            });
        })
        .catch((error) => {
            if (firebase.auth().currentUser != undefined) {
                firebase.auth().currentUser.delete();
                return res
                    .status(422)
                    .json({ errors: error.response.data.errors.message });
            } else {

                return res.status(422).json({ errors: error.message });
            }
        });
});

router.post('/facebook_auth', async(req, res) => {
    var credential = firebase.auth.FacebookAuthProvider.credential(
        req.body.access_token
    );
    firebase
        .auth()
        .signInWithCredential(credential)
        .then(async function() {
            currentUser = firebase.auth().currentUser;
            response = await axios.post(
                process.env.DOMAIN + 'api/v2/seller_center/web/users/oauth', {
                    email: currentUser.email,
                    status: 'active',
                    user_type: 'seller',
                    name: currentUser.displayName,
                    auth_id: currentUser.uid,
                }
            );
            currentUser.getIdToken(true).then(function(idToken) {
                res.setHeader('Authorization', idToken);
                const data = {
                    user: response.data.user,
                    seller: response.data.seller,
                };
                res.json(jwt(data, secret));
            });
        })
        .catch((error) => {
            if (firebase.auth().currentUser != undefined) {
                firebase.auth().currentUser.delete();
                return res
                    .status(422)
                    .json({ errors: error.response.data.errors.message });
            } else {
                return res.status(422).json({ errors: error.message });
            }
        });
});





router.post('/apple_auth', async(req, res) => {
    const provider = new firebase.auth.OAuthProvider('apple.com');
    const credential = provider.credential({
        idToken: req.body.id_token,
        rawNonce: generateNonce(10),
    });
    firebase
        .auth()
        .signInWithCredential(credential)
        .then(async function() {
            currentUser = firebase.auth().currentUser;
            response = await axios.post(
                process.env.DOMAIN + 'api/v2/seller_center/web/users/oauth', {
                    email: currentUser.email,
                    status: 'active',
                    user_type: 'seller',
                    name: currentUser.displayName,
                    auth_id: currentUser.uid,
                }
            );
            currentUser.getIdToken(true).then(function(idToken) {
                res.setHeader('Authorization', idToken);
                const data = {
                    user: response.data.user,
                    seller: response.data.seller,
                };
                res.json(jwt(data, secret));
            });
        })
        .catch((error) => {
            if (firebase.auth().currentUser != undefined) {
                firebase.auth().currentUser.delete();
                return res
                    .status(422)
                    .json({ errors: error.response.data.errors.message });
            } else {
                return res.status(422).json({ errors: error.message });
            }
        });
});

module.exports = router;