const sessionstorage = require('sessionstorage')
const path = require('path')



exports.add = function (req,res){
    var id = req.params.ID
    var profile = sessionstorage.getItem('profile')
    var username = profile[0].Username;
    
    db.query( " UPDATE "+username+" SET PREFERENCE=COUNT+1 WHERE ID = '"+id+"' " ,function(err,result,fields){
        
    })
    db.query("UPDATE "+username+" SET COUNT = COUNT+1 WHERE 1",function(err,result,fields){
        
    })
        res.redirect('/filling_choices')        
}


exports.delete = function (req,res){
    var id = req.params.ID
    var profile = sessionstorage.getItem('profile')
    var username = profile[0].Username;


    db.query(" SELECT PREFERENCE FROM "+username+" WHERE ID = '"+id+"' ",function(err,result,fileds){

        var res = result[0].PREFERENCE;
        db.query(" UPDATE "+username+" SET PREFERENCE = 0 WHERE PREFERENCE = '"+res+"' ",function(err,result,fields){

        })

        
        db.query(" UPDATE "+username+" SET PREFERENCE = PREFERENCE-1 WHERE PREFERENCE > '"+res+"' ",function(err,result,fields){
            
        }) 


        db.query("UPDATE "+username+" set COUNT = COUNT-1 WHERE 1",function(err,result,fields){
        })

    })

    res.redirect('/filling_choices')        
}


exports.Up = function(req,res){
    var id = req.params.ID
    var profile = sessionstorage.getItem('profile')
    var username = profile[0].Username;

    db.query(" SELECT PREFERENCE FROM "+username+" WHERE ID = '"+id+"' ",function(err,result,fileds){

        var res = result[0].PREFERENCE;
        
        var prev = res-1;
        
        if(res>1)
        {
            db.query(" UPDATE "+username+" SET PREFERENCE = PREFERENCE+1 WHERE PREFERENCE = '"+prev+"' ",function(err,result,fields){
                
            })

            
            db.query(" UPDATE "+username+" SET PREFERENCE = PREFERENCE-1 WHERE ID = '"+id+"' ",function(err,result,fields){
                
            })

        }
    })


    res.redirect('/filling_choices')        

}




exports.Down = function(req,res){
    var id = req.params.ID
    var profile = sessionstorage.getItem('profile')
    var username = profile[0].Username;

    db.query(" SELECT PREFERENCE FROM "+username+" WHERE ID = '"+id+"' ",function(err,result,fileds){

        var res = result[0].PREFERENCE;
        var next = res+1;

        db.query("SELECT COUNT FROM "+username+" WHERE ID = 1",function(err,result,fileds){
            var count = result[0].COUNT;
        
            if(res<count)
            {
                db.query(" UPDATE "+username+" SET PREFERENCE = PREFERENCE-1 WHERE PREFERENCE = '"+next+"' ",function(err,result,fields){
                    
                    
                })

                
                db.query(" UPDATE "+username+" SET PREFERENCE = PREFERENCE+1 WHERE ID = '"+id+"' ",function(err,result,fields){
                    
                })

            }
        })
        
    })


    res.redirect('/filling_choices')        

}






exports.delete1 = function (req,res){
    var id = req.params.ID
    var profile = sessionstorage.getItem('profile')
    var username = profile[0].Username;


    db.query(" SELECT PREFERENCE FROM "+username+" WHERE ID = '"+id+"' ",function(err,result,fileds){

        var res = result[0].PREFERENCE;
        db.query(" UPDATE "+username+" SET PREFERENCE = 0 WHERE PREFERENCE = '"+res+"' ",function(err,result,fields){

        })

        
        db.query(" UPDATE "+username+" SET PREFERENCE = PREFERENCE-1 WHERE PREFERENCE > '"+res+"' ",function(err,result,fields){
            
        }) 


        db.query("UPDATE "+username+" set COUNT = COUNT-1 WHERE 1",function(err,result,fields){
        })

    })

    res.redirect('/arrange_choice')        
}


exports.Up1 = function(req,res){
    var id = req.params.ID
    var profile = sessionstorage.getItem('profile')
    var username = profile[0].Username;

    db.query(" SELECT PREFERENCE FROM "+username+" WHERE ID = '"+id+"' ",function(err,result,fileds){

        var res = result[0].PREFERENCE;
        
        var prev = res-1;
        
        if(res>1)
        {
            db.query(" UPDATE "+username+" SET PREFERENCE = PREFERENCE+1 WHERE PREFERENCE = '"+prev+"' ",function(err,result,fields){
            
            })

            
            db.query(" UPDATE "+username+" SET PREFERENCE = PREFERENCE-1 WHERE ID = '"+id+"' ",function(err,result,fields){
                
            })

        }
    })


    res.redirect('/arrange_choice')        

}




exports.Down1 = function(req,res){
    var id = req.params.ID
    var profile = sessionstorage.getItem('profile')
    var username = profile[0].Username;

    db.query(" SELECT PREFERENCE FROM "+username+" WHERE ID = '"+id+"' ",function(err,result,fileds){

        var res = result[0].PREFERENCE;
        var next = res+1;

        db.query("SELECT COUNT FROM "+username+" WHERE ID = 1",function(err,result,fileds){
            var count = result[0].COUNT;
            
            if(res<count)
            {
                db.query(" UPDATE "+username+" SET PREFERENCE = PREFERENCE-1 WHERE PREFERENCE = '"+next+"' ",function(err,result,fields){
                    
                    
                })

                
                db.query(" UPDATE "+username+" SET PREFERENCE = PREFERENCE+1 WHERE ID = '"+id+"' ",function(err,result,fields){
                    
                })

            }
        })
        
    })


    res.redirect('/arrange_choice')        

}



exports.update = function(req,res){

    if(req.method == "POST"){
        var post = req.body
        var profile = sessionstorage.getItem('profile')
        var Rollnumber = profile[0].Rollnumber;
        var email = post.email1;
        var contact = post.contact;
        
        if(!post.email1 && post.contact == 0)
        {
            res.render(path.join(__dirname,"../views","Update_info.ejs"),{message:"Enter details to update"} )
        }
        
        else if(!post.email1)
        {
            db.query(" UPDATE `students` SET Contact = '"+contact+"'  WHERE `Rollnumber`= '"+Rollnumber+"' ",function(err,result){      
                res.render(path.join(__dirname,"../views","Update_info.ejs"),{message:"Details updated Succcesfully"} )
                
            })
        }

        else if(post.contact == 0)
        {
            db.query(" UPDATE `students` SET Email = '"+email+"'  WHERE `Rollnumber`= '"+Rollnumber+"' ",function(err,result){    
                res.render(path.join(__dirname,"../views","Update_info.ejs"),{message:"Details updated Succcesfully"} )
            
            })
        }
     
        else{
            db.query(" UPDATE `students` SET Contact = '"+contact+"',Email= '"+email+"'  WHERE `Rollnumber`= '"+Rollnumber+"' ",function(err,result){           
                res.render(path.join(__dirname,"../views","Update_info.ejs"),{message:"Details updated Succcesfully"} )
    
            })
        }


    }
    
    else{}   
    
    

}



exports.search = function(req,res)
{
    if(req.method == "POST"){
        var search = req.body.search
        var keyword = " %"+search+"% "
        console.log(search)
        var profile = sessionstorage.getItem('profile')
            var username = profile[0].Username;
            var sql = "SELECT * FROM "+username+" WHERE COURSE LIKE '"+'%'+search+'%'+"' OR INSTITUTE LIKE '"+'%'+search+'%'+"'   "

            db.query(sql,function(err,result,fields){
                if(err) throw err
            res.render(path.join(__dirname,"../views","choices_available.ejs") ,{list: result,profile : sessionstorage.getItem('profile')})
            })
    }
    
    else{
      

    }   
    
}




exports.searchf = function(req,res)
{
    if(req.method == "POST"){
        var search = req.body.search
        var keyword = " %"+search+"% "
        console.log(search)
        var profile = sessionstorage.getItem('profile')
            var username = profile[0].Username;
            var sql = "SELECT * FROM "+username+"  WHERE COURSE LIKE '"+'%'+search+'%'+"' OR INSTITUTE LIKE '"+'%'+search+'%'+"' ORDER BY PREFERENCE ASC   "

            db.query(sql,function(err,result,fields){
                if(err) throw err
            res.render(path.join(__dirname,"../views","filling_choices.ejs") ,{list: result,profile : sessionstorage.getItem('profile')})
            })
    }
    
    else{
     

    }   
    
}


exports.searchr = function(req,res)
{
    if(req.method == "POST"){
        var search = req.body.search
        var keyword = " %"+search+"% "
        console.log(search)
        var profile = sessionstorage.getItem('profile')
            var username = profile[0].Username;
            var sql = "SELECT * FROM "+username+"  WHERE COURSE LIKE '"+'%'+search+'%'+"' OR INSTITUTE LIKE '"+'%'+search+'%'+"' ORDER BY PREFERENCE ASC   "

            db.query(sql,function(err,result,fields){
                if(err) throw err
            res.render(path.join(__dirname,"../views","arrange_choice.ejs") ,{list: result,profile : sessionstorage.getItem('profile')})
            })
    }
    
    else{
     

    }   
    
}


exports.changepassword = function(req,res)
{
    if(req.method == "POST"){
        var post = req.body
        var old = post.old;
        var newpassword = post.new;
        var confirm = post.confirm;

        var profile = sessionstorage.getItem('profile')
            var username = profile[0].Username;
            var sql = "SELECT * FROM `students`  WHERE Username = '"+username+"' "
            db.query("SELECT * FROM `students`  WHERE Username = '"+username+"' ",function(err,result,fileds){
                if(result[0].Password == old)
                {
                    if(newpassword== "")
                    {
                        res.render(path.join(__dirname,"../views","changepassword.ejs") ,{profile : sessionstorage.getItem('profile'),message: "Enter a new valid password to change password"})
                    }
                    else if(newpassword != confirm)
                    {
                        res.render(path.join(__dirname,"../views","changepassword.ejs") ,{profile : sessionstorage.getItem('profile'),message: "Re enter same password to change password"})
                    }
                    else if(newpassword == confirm)
                    {
                        db.query("UPDATE `students` SET Password = '"+newpassword+"' WHERE Username = '"+username+"' ",function(err,result,fields){
                            res.render(path.join(__dirname,"../views","changepassword.ejs") ,{profile : sessionstorage.getItem('profile'),message :""})
                        }) 
                    }
                    
                
                }
                else{
                    res.render(path.join(__dirname,"../views","changepassword.ejs") ,{profile : sessionstorage.getItem('profile'),message :"Type your old password correctly"})

                }
            })

            
    }
    
    else{
     

    }   
    
}


