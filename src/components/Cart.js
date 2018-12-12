import React , {Component} from "react";

class Cart extends Component{
	constructor(props){
		super(props);
		this.state={
			title:"我是Cart"
		}
	}
	render(){
		return (
			<div>
				{this.state.title}
			</div>
		)
	}
}

export {Cart};













