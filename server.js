const express=require('express')
const bodyParser=require('body-parser');
const cors= require('cors');
const bcrypt=require('bcrypt')
const app=express();
const knex=require('knex')
const Register=require('./Controllers/Register')
const Signin= require('./Controllers/Signin')
const Profile= require('./Controllers/GetProfile')
const UpdateImage= require('./Controllers/UpdateImage')


app.use(bodyParser.json());
app.use(cors());

const db=knex({
	client: 'pg',
	connection: 
	{
		connectionString: process.env.DATABASE_URL,
		ssl:true
		}
  });

app.get('/', (req,res)=>{res.send('it is working')} );
app.post('/register', (req,res)=>{Register.handleRegister(req,res,db,bcrypt)} );
app.post('/signin',(req,res)=>{Signin.handleSignin(req,res,db,bcrypt)} );
app.get('/profile/:id', (req,res)=>{Profile.getProfile(req,res)});
app.put('/image', (req,res)=>{UpdateImage.handleEntry(req,res,db)});
app.post('/imageurl', (req,res)=> {UpdateImage.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, ()=>{
	console.log(`App is running on port ${process.env.PORT}`)
	// app.listen(3000, ()=>{
	// 	console.log(`App is running on port 3000`)
})

