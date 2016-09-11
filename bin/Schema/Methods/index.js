'use strict';const{findById,find}=require('../Find'),methods=a=>({addMethod:function(b,c){if('string'!=typeof b)throw new Error('Cannot add methods without name. Name need to be a string');if('function'!=typeof c)throw new Error('Cannot add method without function.');if(this.methods[b])throw new Error(`${b} method is already defined!`);this.methods=this.methods||{},this.methods[b]=c.bind(this)}.bind(Object.assign({},a,findById(a),find(a))),deleteMethod:function(b){this.methods[b]&&(this.methods[b]=null)}.bind(a)});/**
 *
 *
 * @param {object} - state of schema instance
 * @return {object} - methods
 *         {function} - methods.addMethod - Helper for extending schema
 *         {function} - methods.delete - Helper for removing methods from schema
 */module.exports={methods};