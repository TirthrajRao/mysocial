var postModel = require('../model/post.model');
var userModel = require('../model/user.model');
const postController = {};

postController.addPost = function(req,res){
	if (!req.file) {
		var userId = req.body.userId;
		var body = req.body;
		var post = new postModel(body);
		console.log("addPost", post);

		post.save(function(err,savedPost){
			if(err){res.status(500).send(err)}
				else{
					userModel.findOne({_id:userId}).exec((err,user)=>{
						console.log("post controller", user)
						if(err){res.status(500).send("Server Error")}
							else{
								user.posts.push(savedPost._id);
								user.save();
								res.status(200).send(savedPost);
							}
						})
				}
			})
	} else {
		var userId = req.body.userId;
		var body = req.body;
		body['postImage'] = req.file.path;
		var post = new postModel(body);
		console.log("addPost", post);

		post.save(function(err,savedPost){
			if(err){res.status(500).send(err)}
				else{
					userModel.findOne({_id:userId}).exec((err,user)=>{
						console.log("post controller", user)
						if(err){res.status(500).send("Server Error")}
							else{
								user.posts.push(savedPost._id);
								user.save();
								res.status(200).send(savedPost);
							}
						})
				}
			})
	}
	
}

postController.getPosts = function(req,res){

	var userId = req.params.userId;
	userModel.findOne({_id:userId})
	.populate('posts')
	.select('posts')
	.exec((err,result)=>{
		if(err){res.status(500).send(err);}
		res.status(200).send(result);
	})	

}

postController.uploadImage = function(req,res){
	
	if (!req.file) {
		console.log("No file received");
		return res.send({
			success: false
		});

	} else {
		console.log('file received');
		return res.send({
			success: true,
			file: req.file 
		})
	}
}
module.exports = postController;