const express=require('express')
const bodyParser=require('body-parser');
const cors= require('cors');
// const bcrypt=require('bcrypt')
const app=express();
// const knex=require('knex')
const ExcelInput=require('./Controllers/ExcelInput');
const ExportFromDb=require('./Controllers/ExportFromDb')
const exportSKU=require('./Controllers/exportSKU')
// const Signin= require('./Controllers/Signin')
// const Profile= require('./Controllers/GetProfile')
// const UpdateImage= require('./Controllers/UpdateImage')
const knex=require('knex')

app.use(bodyParser.json());
app.use(cors());


const db=knex(
	{
	client: 'pg',
	connection: 
	{
	  host : '127.0.0.1',
	  user : 'postgres',
	  password : 'admin',
	  database : 'ExceltoJSON'
	}
  });
app.get('/', (req,res)=>{res.send('it is working')} );
app.post('/Input', (req,res)=>{ExcelInput.handleInput(req,res,db)} );
app.post('/Exportdb', (req,res)=>{ExportFromDb.handleOutput(req,res,db)} );
app.post('/ExportSKU', (req,res)=>{exportSKU.handleExport(req,res,db)} );
// app.listen(process.env.PORT || 3000, ()=>{
// 	console.log(`App is running on port ${process.env.PORT}`)
	 app.listen(3000, ()=>{
	console.log(`App is running on port 3000`)
})

