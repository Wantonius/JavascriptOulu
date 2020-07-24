const express = require("express");
const bodyParser = require("body-parser");

let app = express();

//Dummy database

let database = [];
let id = 100;

//Middlewares

app.use(bodyParser.json());

//Shopping REST API

app.get("/api/shopping",function(req,res) {
	return res.status(200).json(database);
})

app.post("/api/shopping",function(req,res) {
	let item = {
		id:id,
		type:req.body.type,
		count:req.body.count,
		price:req.body.price
	}
	database.push(item);
	id++;
	return res.status(200).json({message:"success"});
})

app.delete("/api/shopping/:id",function(req,res) {
	let id = req.params.id;
	for(let i=0;i<database.length;i++) {
		if(database[i].id == id) {
			database.splice(i,1);
			return res.status(200).json({message:"success"})
		}
	}
	return res.status(404).json({message:"not found"})
})

app.put("/api/shopping/:id",function(req,res) {
	let id = parseInt(req.params.id,10);
	let item = {
		id:id,
		type:req.body.type,
		count:req.body.count,
		price:req.body.price
	}
	for(let i=0;i<database.length;i++) {
		if(database[i].id == id) {
			database.splice(i,1,item);
			return res.status(200).json({message:"success"})
		}
	}
	return res.status(404).json({message:"not found"})
})

app.listen(3001);

console.log("Running in port 3001");