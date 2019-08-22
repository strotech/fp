//bring in models
let initialCollection=require('./models/locationDetailsCollection');

module.exports=function(app){

    //home route
    app.get('/',function(req,res){
        res.render('home',{
            varSection:"Home",
            project: "Flood location and amenities tracking"
        })
    });

    //dashboard route
    app.get('/dashboard',function(req,res){
        initialCollection.find({},function(err,initialCollectionDetailsList){
            if(err){
                console.log(err)
            }else{
                res.render('dashboard',{
                    varSection:"Dashboard",
                    details:initialCollectionDetailsList
                })
            }
        })
        
    })

    //post route - dashboard
    app.post('/dashboard',function(req,res){
        async function db_save(){
            var jsonResult;
            jsonResult=await initialCollection.find({},function(err,result){
                jsonResult=JSON.stringify(result);
                console.log(jsonResult)
                return jsonResult;
            }).sort({$natural:-1}).limit(1);
            console.log(jsonResult)
                
            let initialDetail=new initialCollection();
            if(jsonResult.length>0){
                console.log(parseInt(jsonResult[0].slNo)+1)
                initialDetail.slNo=parseInt(jsonResult[0].slNo)+1
            }else{
                initialDetail.slNo=1
            }           
            initialDetail.date=Date(Date.now()).toString();
            initialDetail.latitude=req.body.latitude
            initialDetail.longitude=req.body.longitude
            initialDetail.amenityReq=req.body.amenityReq
            initialDetail.status=req.body.status

            initialDetail.save(function(err){
                if(err){
                    console.log(err);
                    res.render('error');
                    
                }
                res.redirect('/dashboard')
                
            })
        }
        db_save();

        
        return
    })
}