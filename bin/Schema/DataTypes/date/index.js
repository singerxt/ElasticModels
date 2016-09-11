'use strict';const moment=require('moment');/**
 *
 *
 * @type {{date: (function(): {name: string, validate: (function(): *)})}}
 */module.exports={date:()=>({name:'date',validate:(a,b)=>moment(a,Array.isArray(b)?b:[b],!0``).isValid()})};