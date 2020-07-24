const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const apiRoutes = require("./routes/apiroutes");

let app = express();

//User databases
const registeredUsers = [];
const loggedSessions = [];
const ttl = 1000*60*60

//Middlewares

app.use(bodyParser.json());

tokenizer = () => {
	let token = "";
	let letters = "abcdefghijABCDEFGHIJ0123456789"
	for(let i=0;i<256;i++) {
		let temp = Math.floor(Math.random()*30)
		token = token + letters[temp]
	}
	return token;
}

isUserLogged = (req,res,next) => {
	let token = req.headers.token;
	if(!token) {
		return res.status(403).json({message:"forbidden"})
	}
	for(let i=0;i<loggedSessions.length;i++) {
		if(token === loggedSessions[i].token) {
			let date = Date.now();
			if(date > loggedSessions[i].ttl) {
				loggedSessions.splice(i,1);
				return res.status(403).json({message:"forbidden"})
			}
			loggedSessions[i].ttl = date;
			req.session = {};
			req.session.user = loggedSessions[i].user;
			return next();
		}
	}
	return res.status(403).json({message:"forbidden"})
}

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(422).json({message:"Please provide proper credentials"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(422).json({message:"Please provide proper credentials"});
	}
	if(req.body.password.length < 8 || req.body.username.length < 4) {
		return res.status(422).json({message:"Please provide proper credentials"});
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			return res.status(422).json({message:"Please provide proper credentials"});	
		}
		let user = {
			username:req.body.username,
			password:hash
		}
		for(let i=0;i<registeredUsers.length;i++) {
			if(user.username === registeredUsers[i].username) {
				return res.status(409).json({message:"Username is already in use"})
			}
		}
		registeredUsers.push(user);
		console.log(registeredUsers);
		return res.status(200).json({message:"register success!"})
	})
})

app.use("/api",apiRoutes);

app.listen(3001);

console.log("Running in port 3001");