'use strict';

const async = require('async');
const express = require('express');
const router = express.Router();
const request = require('request');
const topn = require('../scripts/top-n');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});


router.post('/api/v1/topn', function (req, res) {
    async.waterfall([function(done) {
        if(req.body.hasOwnProperty('n') && req.body.hasOwnProperty('stopwords') &&
            req.body.hasOwnProperty('URL')) {
            request(req.body.URL, function (err, response) {
                if (err) {
                    done(err);
                } else {
                    done(null, response, req.body);
                }
            });
        } else {
            done('n, stopwords, URL fields are neccesary');
        }
    }, function(response, query,done) {
        topn(response.body, query.stopwords, query.n)
            .then(result => {
                done(null, result);
            }).catch(err => {
                done(err);  
        });
    }], function(err, result) {
        console.log(result);
        if(err) {
            res.status(500).json({
                'status': 'fail',
                'data': err
            });
        } else {
            res.status(200).json({
                'status': 'success',
                'data': result
            });
        }
    });
});

module.exports = router;
