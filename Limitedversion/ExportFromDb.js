const fs=require('fs')
const handleOutput=(req,res,db)=>
{

db.select('pubdetails')
.from('publisherinfo')
.where('id','=',7)
.then(function(value){
 res.json(value[0].pubdetails)
})

}

module.exports={
    handleOutput
}