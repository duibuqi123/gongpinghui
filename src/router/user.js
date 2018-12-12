const express=require('express');
const Router=express.Router();

const userModel=require('../model/usermodel.js');
const mail=require('../mail.js');
const util=require('../utils/utils.js');
const obj={};

/**
 * @api {post} /login/ login
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {String} us Users unique ID.
 * @apiParam {String} pass Users unique ID.
 *
 * @apiSuccess {String} err Firstname of the User.
 * @apiSuccess {String} msg  Lastname of the User.
 */

Router.post('/login',(req,res)=>{
	let {us,pass}=req.body.params;
	// console.log({us,pass})
	userModel.find( {us,pass})
	.then((data)=>{
	   // console.log(data)
	   if (data.length>=1) { return res.send('登录ok')}
	   	res.send("登录失败")
	})
	
})

/**
 * @api {post} /reg/ 注册
 * @apiName reg
 * @apiGroup User
 *
 * @apiParam {String} us Users unique ID.
 * @apiParam {String} pass Users unique ID.
 *
 * @apiSuccess {String} err Firstname of the User.
 * @apiSuccess {String} msg  Lastname of the User.
 */

Router.post('/reg',(req,res)=>{
	let {us,pass,code}=req.body.params
	console.log({us,pass,code});
	// 已注册的用户名不可再一次注册
	userModel.find( {us,pass})
	.then((data)=>{
	   	if (data.length>=1) { throw res.send('已注册的用户名不可再一次注册')}	
	   	if(obj[us]!==code){ throw res.send('验证码错误') }
	   	return userModel.insertMany({us,pass})
	})
	.then((data)=>{		
		res.send('注册ok')
	})
	.catch((err)=>{
		console.log(err)
		res.send("注册失败")
	})	
})

Router.post('/mail',(req,res)=>{
	 console.log(req.body.params.email);
	let email=req.body.params.email;
	if (!email||email=="") {return res.send(util.sendData(-1,'邮箱错误',null))}
   let num1=(parseInt(Math.random(0,1)*100000)).toString()
		// console.log(num1);
//       生成验证码
	mail.sendmail(email,num1)
	.then((resolve)=>{
		obj[email]=num1
//   	保存验证码信息
 	// console.log(obj)
		res.send(util.sendData(0,'验证码已发送',null));
	})
	.catch((err)=>{
		console.log(err)
		res.send(util.sendData(-1,'验证码发送失败',null))
	})
})




module.exports=Router;