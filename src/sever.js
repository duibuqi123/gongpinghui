const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const db=require('./dbconnect.js');
const path=require("path");
const cors=require("cors");
app.use(cors());
//post参数解析
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//router
const user=require('./router/user.js')
app.use('/api/user',user)

app.listen(8001,()=>{
	console.log('server start in port'+8001)
})