module.exports = function(mongoose) {
    var CourseSchema = mongoose.Schema({
        "_id" : String,
        "firstName": String,
        "lastName" : String,
        "username" : String,
        "password" : String
    }, {collection: "users"});

    return CourseSchema;
};