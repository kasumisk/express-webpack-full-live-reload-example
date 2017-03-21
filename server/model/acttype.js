var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;

var ActTypeSchema = new Schema({
    type_id:{type: String},
    type_name: {type: String},
    type_des:{type:String},
    status:{type: Boolean, default: false},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
})

ActTypeSchema.plugin(BaseModel);

ActTypeSchema.statics={
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
mongoose.model('ActType', ActTypeSchema);