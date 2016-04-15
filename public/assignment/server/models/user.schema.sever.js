module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
        "_id" : String,
        "firstName": String,
        "lastName" : String,
        "username" : String,
        "password" : String,
        "emails" : [String],
        "phones" : [String]
    }, {collection: "users"});

    return UserSchema;
};