'use strict';const documentArray=require('../../DocumentArray'),document=require('../../Document'),find=({elasticSearchClient:a,index:b,type:c,schema:d})=>({find:(e={},f={})=>a.search({index:b,type:c,size:f.size||25,from:f.from||0,body:e}).then(g=>documentArray(g,d,f).getDocuments())}),findById=({elasticSearchClient:a,index:b,type:c,schema:d,options:e})=>({findById:f=>a.get({index:b,type:c,id:f}).then(g=>document(g,d,e).getDocument())});/**
 *
 * @param {object} - elasticSearchClient
 * @param {string} - index
 * @param {string} - type
 * @param {object} - schema
 * @
 *//**
 *
 * @param {object} - elasticSearchClient
 * @param {string} - index
 * @param {type} -
 */module.exports={find,findById};