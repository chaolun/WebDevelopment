module.exports = function(app, model){

    app.get ("/rest/course", findAllCourses);
    app.get("/rest/course/:id", findCourseById);

    app.put("/rest/course/:id", updateCourseById);
    app.post("/rest/course/", createCourse);
    app.delete("/rest/course/:id", deleteCourseById);


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