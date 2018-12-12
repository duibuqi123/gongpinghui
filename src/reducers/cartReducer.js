
let initState={
	//购物车列表
	goodsList:[]
}
let cartReducer=(state=initState,action)=>{
	switch (action.type){
		case "ADD_TO_CART":
			return {
				...state,
				goodsList:[...state.goodsList,action.payload]
			}
		case "CHANGE_FORM_CART":
			return {
				...state,
				goodsList:state.goodsList.filter((goods)=>{
					if(goods.proId==action.payload.proId){
						goods.qty=action.payload.qty
					}
					return true;
				})
			}
		default :
			return state;
	}
}

export {cartReducer};









