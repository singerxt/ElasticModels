'use strict';const Promise=require('bluebird'),R=require('Ramda'),isSimpleField=a=>!(!a||a.dependencies||a.translation),isSimpleTranslationField=a=>'string'==typeof a.translation,isTranslationWithDepField=a=>Array.isArray(a.translation),isTranslationFunctionField=a=>'function'==typeof a.translation,handleSimpleTranslationField=(a,b)=>b&&R.view(R.lensPath(b.split('.')),a),handleTranslationArray=(a,{translation:b})=>b.map(handleSimpleTranslationField.bind(null,a)).filter(c=>c)[0],handleTranslationFunction=Promise.coroutine(function*(a,b,{translateOptions:c}){const d=b.dependencies?b.dependencies.map(handleSimpleTranslationField.bind(null,a)):[];let f;d.push(c);try{f=yield b.translation.apply(null,d)}catch(g){f=b.translation.apply(null,d)}return f}),translateField=Promise.coroutine(function*(a,b,c,d){if(isSimpleField(b[d]))return a[d];return isSimpleTranslationField(b[d])?handleSimpleTranslationField(a,b[d].translation):isTranslationWithDepField(b[d])?handleTranslationArray(a,b[d]):isTranslationFunctionField(b[d])?yield handleTranslationFunction(a,b[d],c):null}),translateDocument=Promise.coroutine(function*(a,b,c){const d={},f=Object.keys(b);for(let g=0;g<f.length;g++)d[f[g]]=yield translateField(a,b,c,f[g]);return d}),getters=({data:a,schema:b,options:c})=>({getDocument:translateDocument.bind(null,a,b,c),getValueForKey:translateField.bind(null,a,b,c)}),setters=({data:a,schema:b,options:c})=>({setValueForKey:()=>{}}),validateInitialParams=({data:a,schema:b})=>{if(!b)throw new Error('schema is missing');return!0},document=(a,b,c)=>{const d={data:a._source||a,id:a._id,schema:b,options:c};return validateInitialParams(d)&&Object.assign({},getters(d),setters(d))};/**
 * Handle for for simple fields what a translation is a string.
 * eg: {
 *   type: String,
 *   translation: ['namespace.cms.title'],
 * }
 *
 * returning value.
 * @param {object} - Current data from elasticsearch
 * @param {object} - Schema field
 * @returns {any}
 *//**
 * Handle translation for fields what have translation as array
 * eg.
 * field: {
 *   type: String,
 *   translation: ['drupal.title', 'title']
 * }
 *
 * returning first possible not empty value.
 * @param {object} - Current data from elasticsearch
 * @param {object} - Schema field
 * @return {any}
 *//**
 * Handle translation for fields what have function as translation.
 *
 *//**
 * Each field in schema can have translation property what is
 * definition what should happen with field when we reading doc.
 *
 * eg. of schema fields to handle in translateField
 *
 * name: {          // Simple field without translation
 *   type: String,
 * },
 * surname: {
 *   type: String,
 * },
 * fullName: {      // field with function as translation
 *   type: String,
 *   dependencies: ['name', 'surname'],
 *   translation: (name, surname) => `${name} ${surname}`
 * },
 * facebookLikes: { // translation as asynchronus function
 *   type: String,
 *   dependencies: ['authToken'],
 *   translation: getLikeForUser(authToken), // need to return Promise
 * },
 * id: {           // translation of array of string if first one
 *                 //will be empty second value will be returned
 *   type: String,
 *   translation: ['social.securityNumber', 'social.peselNumber']
 * }
 *
 * @param {object} - Current data from elasticsearch
 * @param {object} - Schema field
 * @params {object} - options
 * @params {string} - current field to translate
 * @returns {any} - translated field.
 *//**
 * Translate Schema to Document.
 *
 * @param {object} - Current data from elasticsearch
 * @param {object} - Schema field
 * @params {object} - options
 * @returns {any} - translated document.
 *//**
 *
 * @param data
 * @param schema
 * @param options
 * @returns {*}
 */module.exports=document;