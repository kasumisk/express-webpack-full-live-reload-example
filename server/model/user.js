var mongoose  = require('mongoose');
var BaseModel = require("./base_model");
var Schema    = mongoose.Schema;

var UserSchema = new Schema({
    name: {type: String},
    login_name: {type: String},
    pass: {type: String},
    email: {type: String},
    url: {type: String},
    is_admin:{type: Boolean, default: false},
    level: { type: String },
    accessToken: {type: String},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }
})

UserSchema.plugin(BaseModel);

UserSchema.statics={
    findByLoginName:function(loginname,cb){
        return this
            .findOne({login_name:loginname})
            .exec(cb);

    },
    findById:function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb);
    }
};


mongoose.model('User', UserSchema);
