const excelToJson=require('convert-excel-to-json')
const fs=require('fs')
const handleInput=(req,res,db)=>
{
const {input} = req.body;
const result = excelToJson({
sourceFile: input,
// Use any spreadsheet here.

sheets:[{
         name: 'MasterTracking', // Change Sheet name if you want to create JSON from specific sheet
         columnToKey: 
         {
         A:'Publisher',
         //Add as many columns as needed...
         }
     }]
});
   
db("publisherinfo").insert({pubdetails:result})
.then(function(value){
res.json(value);
 });
  
}

module.exports={
    handleInput
}