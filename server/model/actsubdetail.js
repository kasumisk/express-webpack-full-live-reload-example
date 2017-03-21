var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;

var ActSubDetailSchema = new Schema({
    act_id : {type: String},
    title: {type: String},
    keywords:{type:String},
    site_des:{type:String},
    url: {type: String},
    status:{type: Boolean, default: false},
    start_at: { type: Date},
    end_at: {type: Date},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
})

ActSubDetailSchema.plugin(BaseModel);

ActSubDetailSchema.statics={
    fetchactid:function(id,cb){
        return this
            .find({act_id:id})
            .sort('start_at')
            .exec(cb)
    },
    findById:function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb);
    }
};

mongoose.model('ActSubDetail', ActSubDetailSchema);