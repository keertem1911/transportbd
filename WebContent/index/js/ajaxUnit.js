 
function ajaxUnitfun(data,callBack){
$.ajax({
		type:"post",
		url:"chart_unitsql.action",
		dataType:"json",
		data:{
			sql:data},
		success:function(msg){
				callBack(msg);
		}
	});
}
 