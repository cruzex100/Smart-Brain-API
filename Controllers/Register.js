const handleRegister=(req,res,db,bcrypt)=>
{
const { name, email, password} = req.body;
if(!email||!password||!name){
	return res.status(400).json('Incorrect form submission')
}
const saltrounds=10;
const hash= bcrypt.hashSync(password,saltrounds);
db.transaction(trx =>
	{
		trx.insert({
		hash: hash,
		email: email
    })
	.into('login')
	.returning('email')
	.then(loginemail=>
		{
		 return trx('users')
		 .returning('*')
		 .insert({
				name:name,
				email:loginemail[0],
				joined: new Date()
			})
		.then(user=> 
			{
			res.json(user[0])
			})
	})
	.then(trx.commit)
	.catch(trx.rollback)
	})
	.catch(err=>res.status(400).json('unable to register'))
}

module.exports={
    handleRegister:handleRegister
}
