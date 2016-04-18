module.exports = function(mongoose) {
    var FormSchema = mongoose.Schema({
        "userId" : String,
        "title": String,
        "fields" : [FieldSchema],
        "created" : String,
        "updated" : Date
    }, {collection: "form"});

    return FormSchema;
};