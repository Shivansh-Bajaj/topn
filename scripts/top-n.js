'use strict';

const _ = require('underscore');


function stripAndLowerCase(str) {
    return str.replace(/^\s+|\s+$/g, '').toLowerCase();
}


function swap(hash) {
    let newHash = Object.keys(hash).reduce((obj, key)=>{
        if(obj.hasOwnProperty(hash[key])) {
            obj[ hash[key] ].push(key);
        } else {
            obj[ hash[key] ] = [key];
        }
        return obj;
    }, {});
    return newHash;
}

function extractN(hash, n) {
    return new Promise((resolve) => {
        let result = {};
        let keys = Object.keys(hash).reverse();
        _.some(keys, function (key, index) {
            if(n > hash[key].length) {
                result[key] = hash[key];
                n = n - hash[key].length;
            } else {
                result[key] = hash[key].slice(0, n);
                n = 0;
            }
            if (n < 1 || index + 1 === keys.length ) {
                resolve(result);
                console.log( 'return');
                return true;
            }
        });
    });
}

function removeStopWords(hash, stopwords) {
    return new Promise((resolve)=> {
        delete hash[''];
        if(stopwords.length === 0) {
            resolve(hash);
        }
        _.each(stopwords, function (word, index) {
            word = stripAndLowerCase(word);
            if(hash.hasOwnProperty(word)) {
                delete hash[word];
            }
            if(index + 1 === stopwords.length) {
                resolve(hash);
            }
        });
    });
}

module.exports = function (text, stopwords, n) {
    return new Promise((resolve)=>{
        text = text.replace(/\n|\?|\./g, ' ');
        let array = text.split(' ');
        let hash = {};
        _.each(array, function (word, index) {
            word = stripAndLowerCase(word);
            if(hash.hasOwnProperty(word)) {
                hash[word] += 1;
            } else {
                hash[word] = 1;
            }
            if(index + 1 === array.length) {
                removeStopWords(hash, stopwords)
                    .then(function(cleanHash) {
                        let swapedHash = swap(cleanHash);
                        extractN(swapedHash, n)
                            .then(result => {
                                console.log('done');
                                resolve(result);});
                    });
            }
        });
    });
};