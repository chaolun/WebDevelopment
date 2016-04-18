var q = require('q');

module.exports = function(mongoose){
  var FormSchema = require('./form.schema.server.js')(mongoose);
  var formModel = mongoose.model("formModel", FormSchema);

  // var forms = require("./user.mock.json");

  var service = {
    getAllFormsByUser: getAllFormsByUser,
    getFormById: getFormById, 
    deleteFormById: deleteFormById,
    createFormWithUser: createFormWithUser,
    updateFormById: updateFormById

  };
  
  return service;
  
  function getAllFormsByUser(userId) {
    
    var deferred = q.defer();
    formModel.findById({userId: userId}, function(err, forms){
        if(err){
            deferred.reject(err);
            console.log("get all forms by user: " + err);
        }
        else{
            deferred.resolve(forms);
        }
    });
    return deferred.promise;
  }


    function getFormByTitle(title) {

        var deferred = q.defer();
        formModel.findById({title: title}, function(err, form){
            if(err){
                deferred.reject(err);
            }else{
            deferred.resolve(form);}
        });
        return deferred.promise;
    }

    function deleteFormByTitle(title) {
        var deferred = q.defer();
        formModel.remove({title: title},function(err, form){
            if(err){
                deferred.reject(err);
            }
            else{
                formModel.find(function(err, form){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(form);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function createFormWithUser(userId, userObj) {

        var deferred = q.defer();

        //delete courseObj._id;
        console.log(userObj);

        formModel.create({userId: userId}, {$set: userObj}, function(err, form) {
            if(err){
                deferred.reject(err);
            }
            else{
                formModel.find(function(err, forms){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(forms);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function updateFormById(userId, userObj) {

        var deferred = q.defer();

        //delete courseObj._id;
        console.log(userObj);

        formModel.update({_id: userId}, {$set: userObj}, function(err, form) {
            if(err){
                deferred.reject(err);
            }
            else{
                formModel.find(function(err, forms){
                    if(err){
                        deferred.reject(err);
                    }
                    else{
                        deferred.resolve(forms);
                    }
                });
            }
        });
        return deferred.promise;
    }
}