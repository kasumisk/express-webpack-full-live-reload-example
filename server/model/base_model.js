/**
 * 给所有的 Model 扩展功能
 * http://mongoosejs.com/docs/plugins.html
 */
var tools = require('../common/tools');

module.exports = function (schema) {
  schema.methods.create_at_ago = function () {
    return tools.formatDate(this.meta.create_at, true);
  };

  schema.methods.updated_at_ago = function () {
    return tools.formatDate(this.meta.update_at, true);
  };
  schema.pre('save',function(next){
    if(this.isNew){
      this.create_at = this.update_at = Date.now();
    }
    else{
      this.update_at = Date.now();
    }
    next();
  });
};
