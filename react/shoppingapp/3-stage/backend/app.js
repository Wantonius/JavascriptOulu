const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/apiroutes");
const UserModel = require("./models/user");
const SessionModel = require("./models/session");

let app = express();

//User databases

mongoose.connect("mongodb://localhost/javascriptoulu").then(
	() => console.log("Connected to MongoDB!"),
	(error) => console.log("Failed to connect to MongoDB. Reason:"+error)
);

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
			loggedSessions[i].ttl = date+ttl;
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
		let user = new UserModel({
			username:req.body.username,
			password:hash
		})
		user.save(function(err,user) {
				if(err) {
					console.log("Register failed. Error:"+err)
					return res.status(409).json({message:"Username is already in use"})
				} else {
					console.log("Register success. Username:"+user.username);
					return res.status(200).json({message:"register success!"})
				}
		})
	})
})

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(422).json({message:"Please provide proper credentials"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(422).json({message:"Please provide proper credentials"});
	}
	if(req.body.password.length < 8 || req.body.username.length < 4) {
		return res.status(422).json({message:"Please provide proper credentials"});
	}
	let user = {
		username:req.body.username,
		password:req.body.password
	}
	let found = false;
	for(let i=0;i<registeredUsers.length;i++) {
		if(user.username === registeredUsers[i].username) {
			found = true;
			bcrypt.compare(req.body.password,registeredUsers[i].password, function(err,success) {
				if(err) {
					return res.status(403).json({message:"Username or password not correct"})
				}
				if(!success) {
					return res.status(403).json({message:"Username or password not correct"})
				}
				let token = tokenizer();
				let temp = Date.now();
				loggedSessions.push({
					user:user.username,
					token:token,
					ttl:temp+ttl
				})
				return res.status(200).json({token:token})
			})
		}
	}
	if(!found) {
		return res.status(403).json({message:"Username or password not correct"})
	}
})

app.post("/logout",function(req,res) {
	let token = req.headers.token;
	if(!token) {
		return res.status(404).json({message:"not found"})
	}
	for(let i=0;i<loggedSessions.length;i++) {
		if(loggedSessions[i].token === token) {
			loggedSessions.splice(i,1)
			return res.status(200).json({message:"logged out"})
		}
	}
	return res.status(404).json({message:"not found"})
})

app.use("/api",isUserLogged,apiRoutes);

app.listen(3001);

console.log("Running in port 3001");