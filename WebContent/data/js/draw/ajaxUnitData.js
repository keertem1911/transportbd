function ajaxUnitFirst(url,param,callBack){
	$.ajax({
		url:url,
		dataType:"json",
		data:param,
		type:"post",
		success:function(msg){
			callBack(msg);
		}
	})
}