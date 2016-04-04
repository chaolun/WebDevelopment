module.exports = function(app, model){

    app.get ("/rest/user", findAllUsers);
    app.get("/rest/user/:id", findUserById);

    app.put("/rest/user/:id", updateUserById);
    app.post("/rest/user/", createUser);
    app.delete("/rest/user/:id", deleteUserById);


    function findAllCourses(req, res){
        model
            .findAllCourses()
            .then(function(courses){
                //console.log("find all courses: " + courses);
                res.json(courses);
            });
    }

    function findCourseById(req, res){
        var courseId = req.params.id;
        model
            .findCourseById(courseId)
            .then(function(course){
                res.json(course);
            });
    }

    function createCourse(req, res){
        //var courseId = req.params.id;
        var courseObj = req.body;
        model
            .createCourse(courseObj)
            .then(function(courses){
                res.json(courses);
            });
    }

    function updateCourseById(req, res){
        var courseId = req.params.id;
        var courseObj = req.body;
        model
            .updateCourseById(courseId, courseObj)
            .then(function(course){
                res.json(course);
            });
    }

    function deleteCourseById(req, res){
        var courseId = req.params.id;
        model
            .deleteCourseById(courseId)
            .then(function(courses){
                res.json(courses);
            });
    }
}