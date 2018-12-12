
let initState={
	//是否显示底部菜单
	footerStatus:true
}
let commonReducer=(state=initState,action)=>{
	switch(action.type){
		case "CHANGE_TABBAR_STATUS":
			return {...state,footerStatus:action.payload}
		default:
			return state;
	}
}

export {commonReducer};








