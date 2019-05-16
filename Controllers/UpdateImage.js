const Clarifai = require('clarifai');

const app= new Clarifai.App(
   {apiKey:'ce0f307de6e14ad895d59575368fa350'});


const handleApiCall=(req,res)=>
{
app.models
.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
.then(data=>{
    res.json(data);
    })
.catch(err=>res.status(400).json('unable to work with API'))

}

const handleEntry=(req,res,db)=>
{
   const { id }= req.body;
     db('users')
    .where('id','=',id)
    .increment('entries',1)	
    .returning('entries')
    .then(entries=>{
        if(entries.length){
            res.json(entries[0])
        } else 
        {
            res.status(400).json('User doesnt exist')
        }
        })
 .catch(err=>res.status(400).json('Unable to count entries...'))
}

    module.exports={
        handleEntry:handleEntry,
        handleApiCall:handleApiCall
    }
