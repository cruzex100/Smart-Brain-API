const fs=require('fs')
const handleOutput=(req,res,db)=>
{

//  db.select(JSON.stringify('pubdetails'))
//  .returning(*)
//  .from('publisherinfo')
//  .where({id:2})
 
db.select('pubdetails')
.from('publisherinfo')
.where('id','=',7)
.then(function(value){
 res.json(value[0].pubdetails)
})
//  const json1= db.table('publisherinfo')
//  .where({id:2})
//  .update({pub_data:JSON.stringify('pubdetails')})
//  res.json(json1)
}

module.exports={
    handleOutput
}