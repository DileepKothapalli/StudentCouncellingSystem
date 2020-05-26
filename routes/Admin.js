const path = require('path')


exports.Allot = function(req,res){
    

    db.query("SELECT * FROM `admin` ",function(err,Allotment,fields){
        if(Allotment[0].Allotment == 2)
        {

            db.query("UPDATE `admin` SET `Allotment` = 1 WHERE 1",function(err,result,fields){

            })
            db.query("SELECT * FROM `ranklist` ORDER BY `ranklist`.`Rank` ASC ",function(err,result,fields){
                var rollnumber = result;
                rollnumber.forEach(function(datum,i) {
                    
                    
                    db.query("SELECT * FROM `students` WHERE Rollnumber = '"+datum['Rollnumber']+"' ",function(err,data,fields){
                        
                        if(data.length > 0)
                        {
                            
                            
                            db.query("SELECT * FROM "+data[0].Username+" WHERE PREFERENCE > 0 ORDER BY `PREFERENCE` ASC  ",function(err,res,fields){
                                var table = res;
                            db.query("SELECT * FROM `seats` ORDER BY `ID` ASC ",function(err,seats,fields){
                                var seat = seats;
                                var count = 0 ;
                                table.forEach(function(info,j){
                                    var id = info['ID'];
                                    var preference = info['PREFERENCE']
                                    if(seat[id-1].Seats > seat[id-1].Filledseats && count == 0)
                                    {
                                        var course = seat[id-1].Course;
                                        var institute = seat[id-1].Institute;
                                        
                                        count = 1;
                                        db.query("UPDATE `students` SET course = '"+course+"',institute = '"+institute+"',choice ='"+preference+"',Rank = '"+datum['Rank']+"' WHERE Rollnumber = '"+datum['Rollnumber']+"' ",function(err,da,fields){
                                            
                                        })
                                        db.query("UPDATE `seats` SET Filledseats = Filledseats+1 WHERE ID = '"+id+"' ")
                                    }  
                                
            
                                })
                            })
                        })
            
                        }
                    })
            
                }) ;
            })             

        }
    })
        res.redirect('/Admin')        
}


exports.clearAllot = function(req,res){
    db.query("UPDATE `seats` SET Filledseats = 0 WHERE 1 ",function(err,result,fields){
        
    })
    var temp = " "
    db.query("UPDATE `students` SET Rank = '"+temp+"', institute = '"+temp+"',course = '"+temp+"',choice = '"+temp+"' WHERE 1 ",function(err,result,fields){
        
    })
    db.query("UPDATE `admin` SET `Allotment` = 2 WHERE 1",function(err,result,fields){

    })
    res.redirect('/Admin')        
    
}



exports.addnew = function(req,res){


    if(req.method == "POST"){
        var post = req.body
        var institute = post.institute;
        var course = post.course;
        var seats = post.seats;
        
    

        db.query("SELECT * from `institutes`WHERE ID = (SELECT MAX(ID) FROM `institutes` )",function(err,max,fields){ 
            var id = max[0].ID
            id = id+1;
         
            if(course && institute)
            {
                var sql = "INSERT INTO `institutes`(`ID`,`INSTITUTE`,`COURSE`,`PREFERENCE`,`COUNT`) VALUES ( '"+id+"' ,'" +institute+"', '"+course+"' , 0, 0 ) "
                db.query(sql,function(err,result){ 
                    
                }) 
                var sql1 = "INSERT INTO `seats`(`ID`,`Institute`,`Course`,`Seats`,`Filledseats`) VALUES ( '"+id+"' ,'" +institute+"', '"+course+"' , '"+seats+"' , 0 ) "

                db.query(sql1,function(err,res,fields){

                })
            res.render(path.join(__dirname,"../views","addnew.ejs"),{message :"Succesfully Added"} )
            }
            else{
            res.render(path.join(__dirname,"../views","addnew.ejs"),{message :" enter proper details "} )
                
            }

             
        })
        
        

    }

           
    
}


exports.Start = function(req,res){
    
    

    db.query("UPDATE `admin` SET `Councelling` = 1 WHERE 1",function(err,result,fields){

    })
    res.redirect('/Admin')        
    
}

exports.Stop = function(req,res){
    
    db.query("UPDATE `admin` SET `Councelling` = 2 WHERE 1",function(err,result,fields){

    })
    res.redirect('/Admin')        
    
}


exports.Adminlogin = function(req,res){
    // var sess = req.session;
    if(req.method == 'POST'){
        var post = req.body;
        var name = post.inputUsername;
        var pass = post.inputPassword;
        var username = "User"
        var password = "User123"
        if(name == username && pass == password )
        {
            res.redirect('/Admin')
            
        }
        else
        {
        res.render('Adminindex.ejs',{message: ""})
        }
    }
    else{
        res.render('index.ejs')
    }

}

exports.deleteinsti = function (req,res){
    var id = req.params.ID
    console.log(id)
    db.query(" DELETE FROM `institutes` WHERE ID = '"+id+"' ",function(err,result,fileds){
        db.query(" UPDATE `institutes` SET ID = ID-1 WHERE ID > '"+id+"' ",function(err,result,fields){
            console.log("im done")
        })
    })
    db.query(" DELETE FROM `seats` WHERE ID = '"+id+"' ",function(err,result,fileds){
        db.query(" UPDATE `seats` SET ID = ID-1 WHERE ID > '"+id+"' ",function(err,result,fields){
            console.log("im done hwere")
        })
    })
    

    res.redirect('/Update')        
}


exports.Updateseatsg = function(req,res){
    var id = req.params.ID
    

    db.query(" SELECT * FROM `seats` WHERE ID = '"+id+"' ",function(err,result,fileds){
           
        var pro = result
        var post = req.body;
        var seat = post.seats;

        db.query(" UPDATE `seats` SET Seats = '"+seat+"' WHERE ID = '"+id+"' ",function(err,result,fields){
                
            })

            
           

    res.render('Updateseat.ejs',{list :pro[0],message:""})    
        // res.redirect('/Updateseats')
    })



}




exports.Updateseats = function(req,res){
    var id = req.params.ID
    

    db.query(" SELECT * FROM `seats` WHERE ID = '"+id+"' ",function(err,result,fileds){
           
        var pro = result
        // pro[0].Institute = ""
        // pro[0].Course =""
        // pro[0].Seats =""
        var post = req.body;
        var seat = post.seats;

        db.query(" UPDATE `seats` SET Seats = '"+seat+"' WHERE ID = '"+id+"' ",function(err,result,fields){
        res.render("Updateseat.ejs",{list :pro[0],message:"Success"})
                
            })        
    })
}
