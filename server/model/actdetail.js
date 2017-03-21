var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;

var ActDetailSchema = new Schema({
    act_id : {type: String},
    des:{type:String},
    title: {type: String},
    keywords:{type:String},
    site_des:{type:String},
    type: {type: String},
    platform: {type: String},
    url: {type: String},
    status:{type: Boolean, default: false},
    start_at: { type: Date},
    end_at: {type: Date},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }

})

ActDetailSchema.plugin(BaseModel);

ActDetailSchema.statics={
    fetch:function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById:function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb);
    }
};

mongoose.model('ActDetail', ActDetailSchema);