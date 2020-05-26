const sessionstorage = require('sessionstorage')


exports.register = function(req,res){
    
    if(req.method == "POST"){
        var post = req.body
        var Rollnumber = post.Rollnumber;
        var username = post.username1;
        var Fullname = post.Fullname;
        var password = post.password1;
        var confirm = post.confirmPassword1;
        db.query("SELECT * FROM `students` WHERE `Username`='"+username+"'",function(err,usercheck,fields){
            
            if(username=="")
            {
                res.render('index.ejs',{message : "Username Cannot be empty"})
            }
            else if(Fullname=="")
            {
                res.render('index.ejs',{message : "Fill out the field Fullname"})
            }
            else if(Rollnumber=="")
            {
                res.render('index.ejs',{message : "Enter your registered Rollnumber"})
            }
            else if(password=="")
            {
                res.render('index.ejs',{message : "Enter a valid password for registration"})
            }
            else if(confirm != password)
            {
                res.render('index.ejs',{message : "confirm Password doesn't match enter same password"})
            }
            else if(usercheck.length!=0)
            {
                res.render('index.ejs',{message : "Username already exists"})
            }
            else
            {
                var sql = "INSERT INTO `students`(`Username`,`Password`,`Rollnumber`,`Fullname`) VALUES ('" +username+"', '"+password+"' , '"+Rollnumber+"','"+Fullname+"') "
                db.query(sql,function(err,result){    
                })

                var sql1 = "CREATE TABLE `studentcouncelling`.`"+username+"` (`ID` int(40) DEFAULT NULL,`INSTITUTE` varchar(255) DEFAULT NULL,`COURSE` varchar(255) DEFAULT NULL,`PREFERENCE` int(10) DEFAULT NULL,`COUNT` int(10) DEFAULT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8;  "
                db.query(sql1,function(err,result){
                })
                var sql2 = "INSERT INTO `studentcouncelling`.`"+username+"`(`ID`, `INSTITUTE`, `COURSE`, `PREFERENCE`, `COUNT`) SELECT `ID`, `INSTITUTE`, `COURSE`, `PREFERENCE`, `COUNT` FROM `studentcouncelling`.`institutes`;"
                db.query(sql2,function(err,result){
                
                })
                res.render('index.ejs',{message : ""})
            }
        })

        
    }else{
        res.render('index')
    }
    
}

exports.login = function(req,res){
    // var sess = req.session;
    if(req.method == 'POST'){
        var post = req.body;
        var name = post.inputUsername;
        var password = post.inputPassword;

        var sql = "SELECT Username,Password FROM `students` WHERE `Username`='"+name+"' and password = '"+password+"' ";
        db.query(sql,function(err,results){
            if(results.length==1){
                var profile = []
                
                var sql1 = "SELECT * FROM `students` WHERE `Username` = '"+name+"' "
                db.query(sql1,function(err,result,fields){
                    if(err) throw err
                    profile = result;
                    sessionstorage.setItem('profile',profile)
            
                })

                res.redirect('/home')
                
            }
            else{
                res.render('index.ejs',{message : "Wrong credentials"})
            }
        })
    }
    else{
        res.render('index.ejs')
    }

}

exports.logout = function(req,res){
    req.session.destroy(function(err){
        res.redirect("/")
    })
}








