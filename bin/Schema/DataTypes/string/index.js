'use strict';const validate=a=>'string'==typeof a;/**
 *
 *
 * @type {{string: (function(): {name: string, validate: (function(): boolean)})}}
 */module.exports={string:()=>({name:'string',validate})};