
import React , {Component} from "react";
import {connect} from 'react-redux';
import {cart,tabbar} from '../actions';

import "../styles/Login.scss";

import src from "../doc/img/LOGO.png";

class Login extends Component{
	constructor(props){
		super(props);
		this.state={
			title:"我是Login界面",
			src:src,
			userfocus:false,
			passfocus:false,
			btn:false,
			usvif:false,
			passvif:false
		}
	}
	componentWillMount(){
//		console.log(this.props)
		this.props.changeTabbarStatus(false);		
	}
	componentWillUnmount(){
		console.log(this.props)
		this.props.changeTabbarStatus(true);
		
	}
	headlerClick(){
		this.setState({btn:true});
		if(this.state.usvif&&this.state.passvif){
			alert("提交成功");
		}
		setTimeout(()=>{this.setState({btn:false});},100)
	}
	//input 获取焦点 
	inputOnFocus(userfocus,passfocus){
	    this.setState({ 
	    	userfocus: userfocus,
	    	passfocus:passfocus
	    })
	}
	//input 失去焦点
	inputOnBlur(userfocus,passfocus){
	    this.setState({ 
	    	userfocus:userfocus,
	    	passfocus: passfocus
	    });
	    var login_user_val=this.refs.loginUserRef.value;
	    var login_pass_val=this.refs.loginPassRef.value;
//	    console.log(login_user_val);
		if(userfocus){
			//验证邮箱是否合法
	    	this.login_user(login_user_val);
		}
	    if(passfocus){
	    	//验证密码是否合法
	    	this.login_pass(login_pass_val);
	    }
	}
	login_user(val){
		var user_text=this.refs.UserText;
		var loginEmail= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		    if(val==''){
				user_text.innerHTML="请输入邮箱";
		    }else if(!loginEmail.test(val)){
		    	console.log("邮箱格式不正确");
				user_text.innerHTML="邮箱格式不正确";
		    }else{
		    	user_text.innerHTML="";
		    	this.setState({usvif:true});
		    }
	}
	login_pass(val){
		var pass_text=this.refs.PassText;
		var mylogin_pass = /^[a-zA-Z]\w{5,11}$/;
			if(!mylogin_pass.test(val)){
				pass_text.innerHTML="以字母开头，长度在6-12之间，只能包含字符、数字和下划线";
			}else{
				pass_text.innerHTML="";
				this.setState({passvif:true});
			}
	}
	render(){
		return (
			<div className="login">
				<div className="login-logo"><img src={this.state.src} /></div>
				<input placeholder="邮箱" ref="loginUserRef" className={ this.state.userfocus ? "login_user_onfocus" : "login_user_left" } onBlur={this.inputOnBlur.bind(this,true,false) } onFocus={this.inputOnFocus.bind(this,true,false) } />
				<p ref="UserText" className="TextStyle"></p>
				<input placeholder="密码" ref="loginPassRef" className={ this.state.passfocus ? "login_user_onfocus" : "login_user_left" } onBlur={this.inputOnBlur.bind(this,false,true) } onFocus={this.inputOnFocus.bind(this,false,true) } />
				<p ref="PassText" className="TextStyle"></p>
				<input type="button" className={ this.state.btn ? "login_btn_onfocus" : "login_btn_left" } value="登录" onClick={this.headlerClick.bind(this)}  />
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
Login= connect(mapStateToProps,mapDispatchToProps)(Login);
export {Login};






