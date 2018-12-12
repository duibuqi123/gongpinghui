
import React , {Component} from "react";
import {connect} from 'react-redux';
import {cart,tabbar} from '../actions';
import axios from 'axios';
import qs from 'qs';

import "../styles/Reg.scss";

import src from "../doc/img/LOGO.png";

class Reg extends Component{
	constructor(props){
		super(props);
		this.state={
			title:"我是Reg界面",
			src:src,
			userfocus:false,
			passfocus:false,
			emailfocus:false,
			reg_user_val:"",
			reg_pass_val:"",
			emailbtn:false,
			btn:false,
			usvif:false,
			passvif:false,
			numvif:false,
			num:"",
			EmailText:"点击获取验证码",
			time:60
		}
	}
	componentWillMount(){
//		console.log(this.props)
		this.props.changeTabbarStatus(false);			
	}
	componentDidMount(){
		var inpClick=this.refs.emailBtn;
//		console.log(inpClick);
		inpClick.style.pointerEvents="auto";	
	}
	componentWillUnmount(){
		console.log(this.props)
		this.props.changeTabbarStatus(true);
	}
	//倒计时60s
	SetTime(time){
		clearInterval(timer);	
		this.setState({time:60});			
		var timer = setInterval(()=>{
			this.state.time--;
			this.setState({EmailText:this.state.time+"s之后重新获取"});
			var inpClick=this.refs.emailBtn;
			inpClick.style.pointerEvents="none";			
			if(this.state.time<0){
				clearInterval(timer);
				this.setState({time:60});	
				this.setState({EmailText:"点击获取验证码"});
				var inpClick=this.refs.emailBtn;
				inpClick.style.pointerEvents="none";	
			}
		},1000);
	}
	//点击发送邮箱验证码1350296586@qq.com
	headlerEmailClick(){
		this.setState({emailbtn:true});
		var key=this.state.usvif&&this.state.passvif;
		if(!key){
			alert('请输入正确的邮箱和密码');
			setTimeout(()=>{
				this.setState({emailbtn:false});
			},20);
			return "";
		}
    	axios.post('http://localhost:8001/api/user/mail',{
	    	params:{
	    		email:this.state.reg_user_val
	    	}
    	})
    	.then((res)=>{
//			console.log(typeof(res.data.code));
			alert(res.data.msg);			
			if(res.data.code==0){
				//调用倒计时
				this.SetTime(this.state.time);			
			}			
    	})
    	.catch((error)=>{
			console.log(error);			
    	})
    	setTimeout(()=>{
			this.setState({emailbtn:false});
		},20);
	}
	//点击注册按钮
	headlerClick(){
		this.setState({btn:true});
		var key=this.state.usvif&&this.state.passvif&&this.state.numvif;
//		console.log(this.state.usvif,this.state.passvif,this.state.numvif);
		if(!key){
			alert("请先填好信息");
			setTimeout(()=>{this.setState({btn:false});},20);
			return ""
		}
		axios.post('http://localhost:8001/api/user/reg',{
	    	params:{
	    		us:this.state.reg_user_val,
	    		pass:this.state.reg_pass_val,
	    		code:this.state.num
	    	}
    	})
    	.then((res)=>{
//  		console.log(res.data);
    		alert(res.data);
    		if(res.data=="注册ok"){
    			alert("可以跳转到登录界面了");
//				this.$router.push({path: '/Des'});
			}    		
    	})
    	.catch((error)=>{
    		console.log(error);
    		console.log("注册失败");
    	})
		setTimeout(()=>{this.setState({btn:false});},20)
	}
	//input 获取焦点 
	inputOnFocus(userfocus,passfocus,emailfocus){
	    this.setState({ 
	    	userfocus: userfocus,
	    	passfocus:passfocus,
	    	emailfocus:emailfocus
	    })
	}
	//input 失去焦点
	inputOnBlur(userfocus,passfocus,emailfocus){
	    this.setState({ 
	    	userfocus:userfocus,
	    	passfocus: passfocus,
	    	emailfocus:emailfocus
	    });
	    var reg_user_val=this.refs.regUserRef.value;
	    var reg_pass_val=this.refs.regPassRef.value;
	    this.setState({
	    	reg_user_val:reg_user_val,
	    	reg_pass_val:reg_pass_val
	    })
//	    console.log(reg_user_val);
		if(userfocus){
			//验证邮箱是否合法
	    	this.reg_user(reg_user_val);
		}
	    if(passfocus){
	    	//验证密码是否合法
	    	this.reg_pass(reg_pass_val);
	    }
	    if(emailfocus){
	    	var email=this.refs.regEmailRef.value;
//	    	console.log(email);
	    	this.setState({num:email,numvif:true});	    	
	    }
	}
	reg_user(val){
		var user_text=this.refs.UserText;
		var regEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		    if(val==''){
				user_text.innerHTML="请输入邮箱";
		    }else if(!regEmail.test(val)){
		    	console.log("邮箱格式不正确");
				user_text.innerHTML="邮箱格式不正确";
		    }else{
		    	user_text.innerHTML="";
		    	this.setState({usvif:true});
		    }
	}
	reg_pass(val){
		var pass_text=this.refs.PassText;
		var myreg_pass = /^[a-zA-Z]\w{5,11}$/;
			if(!myreg_pass.test(val)){
				pass_text.innerHTML="以字母开头，长度在6-12之间，只能包含字符、数字和下划线";
			}else{
				pass_text.innerHTML="";
				this.setState({passvif:true});
			}
	}
	render(){
		return (
			<div className="reg">
				<div className="reg-logo"><img src={this.state.src} /></div>
				<input placeholder="邮箱" ref="regUserRef" className={ this.state.userfocus ? "reg_user_onfocus" : "reg_user_left" } onBlur={this.inputOnBlur.bind(this,true,false,false) } onFocus={this.inputOnFocus.bind(this,true,false,false) } />
				<p ref="UserText" className="TextStyle"></p>
				<input placeholder="密码" ref="regPassRef" className={ this.state.passfocus ? "reg_user_onfocus" : "reg_user_left" } onBlur={this.inputOnBlur.bind(this,false,true,false) } onFocus={this.inputOnFocus.bind(this,false,true,false) } />
				<p ref="PassText" className="TextStyle"></p>
				<div className="email-div">
					<input placeholder="请输入邮箱验证码" ref="regEmailRef" className={ this.state.emailfocus ? "reg_email_onfocus" : "reg_email_left" } onBlur={this.inputOnBlur.bind(this,false,false,true) } onFocus={this.inputOnFocus.bind(this,false,false,true) } />
					<div ref="emailBtn" className={ this.state.emailbtn ? "EmailBtn_onfocus" : "EmailBtn" } onClick={this.headlerEmailClick.bind(this)}>{this.state.EmailText}</div>
				</div>
				<p ref="emailText" className="TextStyle"></p>
				<input type="button" className={ this.state.btn ? "reg_btn_onfocus" : "reg_btn_left" } value="注册" onClick={this.headlerClick.bind(this)}  />
			</div>
		)
	}
}
let mapStateToProps=state=>({footerStatus:state.commonReducer.footerStatus});
let mapDispatchToProps = dispatch=>{
    return {
        // 把changeTabbarStatus方法映射到props
        changeTabbarStatus(status){
            dispatch(tabbar(status));
        }
    }
}
Reg= connect(mapStateToProps,mapDispatchToProps)(Reg);
export {Reg};






