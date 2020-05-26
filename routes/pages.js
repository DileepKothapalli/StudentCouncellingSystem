const path = require('path')
const sessionstorage = require('sessionstorage')



module.exports =  class Router{

    ///user page
    index = (req,res,next) => {
            res.render(path.join(__dirname,"../views","index.ejs"),{message :""} )
        }


    ///Admin pages
    Admin = (req,res,next) => {
        db.query("SELECT * FROM `admin` ",function(err,result,fields){
            if(err) throw err
        res.render(path.join(__dirname,"../views","Admin.ejs") ,{list: result} )
        })
    }
    
    Adminindex = (req,res,next) => {
        res.render(path.join(__dirname,"../views","Adminindex.ejs") )
    }



    Update = (req,res,next,data = {}) => {
            db.query("SELECT * FROM `seats` ORDER BY ID ASC",function(err,result,fields){
                if(err) throw err
            res.render(path.join(__dirname,"../views","Update.ejs") ,{list: result})
        })
    }

    

    Updateseat = (req,res,next,data = {}) => {
            res.render(path.join(__dirname,"../views","Updateseat.ejs") )
    }


    addnew = (req,res,next,data = {}) => {
          
            res.render(path.join(__dirname,"../views","addnew.ejs"),{message :""} )
        
    }


    


    ////Student pages
    home = (req,res,next,data = {}) => {
        var profile = sessionstorage.getItem('profile')
            var username = profile[0].Username;
            var sql = "SELECT * FROM "+username+" "
            db.query(sql,function(err,result,fields){
                if(err) throw err
            res.render(path.join(__dirname,"../views","home.ejs") ,{list: result,profile : sessionstorage.getItem('profile')})
        })
    }

    changepassword = (req,res,next,data = {}) => {
        var profile = sessionstorage.getItem('profile')
            
            res.render(path.join(__dirname,"../views","changepassword.ejs") ,{profile : sessionstorage.getItem('profile'),message:""})
        
    }
    


    Candidateprofile = (req,res,next,data = {}) => {
        var profile = sessionstorage.getItem('profile')
            var username = profile[0].Username;
            var sql = "SELECT * FROM "+username+" "
            db.query(sql,function(err,result,fields){
                if(err) throw err
        res.render(path.join(__dirname,"../views","Candidate_profile.ejs"), {list: result,profile : sessionstorage.getItem('profile')} )
            })
    }

    Updateprofile = (req,res,next) => {
        res.render(path.join(__dirname,"../views","Update_info.ejs"),{message:""})
    }

    choicesAvailable = (req,res,next,data = {}) => {
            var profile = sessionstorage.getItem('profile')
            var username = profile[0].Username;
            var sql = "SELECT * FROM "+username+" "
            db.query(sql,function(err,result,fields){
                if(err) throw err
            res.render(path.join(__dirname,"../views","choices_available.ejs") ,{list: result,profile : sessionstorage.getItem('profile')})
        })
    }

    fillingChoices = (req,res,next) => {
            var profile = sessionstorage.getItem('profile')
            var username = profile[0].Username;

            db.query("SELECT * FROM "+username+" ORDER BY PREFERENCE ASC ",function(err,result,fields){
                if(err) throw err
            res.render(path.join(__dirname,"../views","filling_choices.ejs") ,{list: result})
        })
            
    }

    
    arrangechoice = (req,res,next,data = {}) => {
            var profile = sessionstorage.getItem('profile')
            var username = profile[0].Username;

            db.query("SELECT * FROM "+username+" ORDER BY PREFERENCE ASC",function(err,result,fields){
                if(err) throw err
            res.render(path.join(__dirname,"../views","arrange_choice.ejs") ,{list: result})
        })
    }


    multipledeletion = (req,res,next,data = {}) => {
            var profile = sessionstorage.getItem('profile')
            var username = profile[0].Username;
            
            db.query("SELECT * FROM "+username+" ORDER BY PREFERENCE ASC ",function(err,result,fields){
                if(err) throw err
            res.render(path.join(__dirname,"../views","multiple_deletion.ejs") ,{list: result})
        })
    }


}