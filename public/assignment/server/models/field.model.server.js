var q = require('q');

module.exports = function(mongoose){
    var FieldSchema = require('./field.schema.server.js')(mongoose);
    var fieldModel = mongoose.model("fieldModel", FieldSchema);
   
    var FormSchema = require('./field.schema.server.js')(mongoose);
    var formModel = mongoose.model('formModel', FormSchema);

    // var users = require("./field.mock.json");

    var service = {
        getFieldsByFormId: getFieldsByFormId,
        getFieldByFormAndFieldId: getFieldByFormAndFieldId, 
        deleteFieldByFormAndFieldId: deleteFieldByFormAndFieldId,
        createFieldWithFormId: createFieldWithFormId,
        updateFieldWithFormId: updateFieldWithFormId
    };
  
    return service;

    function getFieldsByFormId(formId) {

        var deferred = q.defer();
        fieldModel.findById({title: formId}, function(err, fields){
            if(err){
                deferred.reject(err);
            }else{
            deferred.resolve(fields);}
        });
        return deferred.promise;
    }

    function getFieldByFormAndFieldId(fieldId, formId) {
        var deferred = q.defer();
        formModel.findById({title:formId}, function(err, form){
            if (err){
                deferred.reject(err);
            }
            else {
                form.findById({label: fieldId}, function(err, field){
                    if (err){
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(field);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function deleteFieldByFormAndFieldId(fieldId, formId) {
        var deferred = q.defer();
        formModel.findById({title:formId}, function(err, form){
            if (err){
                deferred.reject(err);
            }
            else {
                form.remove({label: fieldId}, function(err, field){
                    if (err){
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(field);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function createFieldWithFormId(formId, userObj){
        var deferred = q.defer();
        formModel.where({ title: formId }).update(userObj, function (err, form){
            if(err){
                deferred.reject(err);
            }
            else{
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(form);
                }
            }
        });
    }

    function updateFieldWithFormId(formId, userObj) {

        var deferred = q.defer();

        fieldModel.update({label: formId}, {$set: userObj}, function(err, field) {
            if(err){
                deferred.reject(err);
            }
            else{
                fieldModel.find(function(err, fields){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(fields);
                    }
                });
            }
        });
        return deferred.promise;
    }
}