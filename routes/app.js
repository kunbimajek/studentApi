var mongo = require('mongodb');



var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_j2fx5zmg:ujs2o3rsud81ft3jslq06u352e@ds163010.mlab.com:63010/heroku_j2fx5zmg');


var Student = require("../model/model.js");


exports.index = function(req, res) {
    
    console.log("main route requested");

    var data = {
        status: 'OK',
        message: 'Welcome to the STUDENT RESOURCES API'
    }

  
    res.json(data);

}



exports.create = function(req,res){

    console.log(req.body);

   
    var surname = req.body.surname;
    var firstname = req.body.firstname;
    var matric_number = req.body.matric_number;
    var level = req.body.level;
    var department= req.body.department;
    var college=req.body.college;

      var student = Student({
        surname: surname,
        firstname: firstname,
        matric_number: matric_number,
        level:level,
        department: department,
        college: college

        
      });
     
      student.save(function(err,data){
        
        if (err){
            var jsonData = {status:'ERROR', message: 'Error saving student'};
            return res.json(jsonData);
        }

        console.log('saved a new student!');
        console.log(data);

        
        var jsonData = {
            status: 'OK',
            student: data
        }

        return res.json(jsonData);

      })
 
}


exports.getOne = function(req,res){

    var requestedId = req.param('id');

    
    Student.findById(requestedId, function(err,data){

      
        if(err || data == null){
        var jsonData = {status:'ERROR', message: 'Could not find that student'};
         return res.json(jsonData);
    }

    var jsonData = {
        status: 'OK',
        student: data
    }

    return res.json(jsonData);
    
    })
}



exports.getAll = function(req,res){

    Student.find(function(err, data){
    if(err || data == null){
        var jsonData = {status:'ERROR', message: 'Could not find students'};
        return res.json(jsonData);
    }

  

    var jsonData = {
        status: 'OK',
        student: data
    }   

    res.json(jsonData);

    })

}



exports.update = function(req,res){

    var requestedId = req.param('id');

   
    var surname = req.body.surname;
    var firstname = req.body.firstname;
    var matric_number = req.body.matric_number;
    var level = req.body.level;
    var department=req.body.department;
    var college=req.body.college
   

    

      var dataToUpdate = {
        surname: surname,
        firstname: firstname,
        matric_number: matric_number,
        level:level,
        department: department,
        college: college
        
      };

     
      Student.findByIdAndUpdate(requestedId, dataToUpdate, function(err,data){
       
        if (err){
            var jsonData = {status:'ERROR', message: 'Error updating student data'};
            return res.json(jsonData);
        }

        console.log('updated the student data!');
        console.log(data);

       
        var jsonData = {
            status: 'OK',
            student: data
        }

        return res.json(jsonData);

      })

   
}



exports.remove = function(req,res){

    var requestedId = req.param('id');

   
    Student.findByIdAndRemove(requestedId,function(err, data){
        if(err || data == null){
        var jsonData = {status:'ERROR', message: 'Could not find that student to delete'};
        return res.json(jsonData);
        }

        
        var jsonData = {
            status: 'OK',
            message: 'Successfully deleted id ' + requestedId
        }

        res.json(jsonData);

    })

}