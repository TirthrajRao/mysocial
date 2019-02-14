var userModel = require('../model/user.model');
var QRCode = require('qrcode');

const userController = {};

userController.signup = function(req,res){
	var user = new userModel(req.body);

	user.save(function(err,savedUser){
		console.log(err,savedUser);
		res.send(savedUser);
		console.log(savedUser);
	})
}

userController.login = function(req,res){

	
	
	var useremail = req.body.email;
	
	userModel.findOne({email:useremail}).exec((err,foundUser)=>{
		if(err){
			res.status(500).send(err);
		}else if(foundUser){
			console.log(foundUser);
			if(foundUser.password == req.body.password){
				res.status(200).json(foundUser);
			}else{
				res.status(403).json({msg:"Password do not match"});
				}
			}else{
				res.status(403).json({msg:"unauthorised access"});
			}
	})
}

userController.getProfile = function(req,res){

	var currentUser = req.params.myId;
	userModel.findOne({_id:currentUser},function(err,foundUser){
		console.log(foundUser,err);
		res.send(foundUser);
	})
}


userController.searchUser = function(req,res){

	var key = req.query.key;
	userModel.find({$or:[{firstname:key},{lastname:key}]},function(err,foundUser){
		res.send(err || foundUser);
	})
}

userController.updateProfile = function(req,res){
	if (!req.file){
		var userId = req.body.myId;

		var detail = {
			firstname:req.body.firstname,
			lastname:req.body.lastname,
			email:req.body.email,
			dob:req.body.dob
		}

		userModel.findOneAndUpdate({_id:userId},{$set:detail},{upsert:true,new:true},function(err,updateUser){
			res.send(updateUser);
		})

	} else{

		 var userId = req.body.myId;

		 var detail = {
			firstname:req.body.firstname,
			lastname:req.body.lastname,
			email:req.body.email,
			dob:req.body.dob
		}
		detail['profileImage'] = req.file.path;
		detail['coverImage'] = req.file.path;

		var profile = new userModel(detail);
		console.log("profile updated", profile);

		userModel.findOneAndUpdate({_id:userId},{$set:detail},{upsert:true,new:true},function(err,updateUser){
			res.send(updateUser);
		})	
		
	}

}

userController.addFriend = function (req,res){
	var currentUser = req.body.requestedUser;
	var user = req.body.otherUser;
	userModel.findOne({_id: currentUser},function(err,foundUser){
		console.log("respponse from controller.........", foundUser);
		foundUser.friends.push(user);
		foundUser.save();
		res.send(foundUser);
	})
}


module.exports = userController;
