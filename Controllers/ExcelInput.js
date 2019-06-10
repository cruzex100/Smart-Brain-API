const excelToJson=require('convert-excel-to-json')
const fs=require('fs')
const handleInput=(req,res,db)=>
{
const {input} = req.body;

// if(!input){
// return res.status(400).json('Incorrect form submission')

const result = excelToJson({
sourceFile: input,
    sheets:[{
         name: 'MasterTracking',
         columnToKey: 
         {
         A:'Publisher',
         B:'Offer Id',
         D:'SKU',
         E:'version',
         H:'Vulnerability',
         L:'Reference Number',
        //  AE:'email',
         O:'Threat',
         Q:'Impact',
         P:'Solution'
        }
     }]
});
   

//  db.transaction(trx=>{
//         trx.insert({
//         json:result.MasterTracking
//     }) 
//     .into('publisherinfo')
//  .then(trx.commit)
//  .catch(trx.rollback)
//  const json1= db.table('publisherinfo')
//    .where({id:1})
//    .update({pubdetails: JSON.stringify('result')})
//    res.json(result);

db("publisherinfo").insert({pubdetails:result})
.then(function(value){
res.json(value);
 });
  
}

module.exports={
    handleInput
}