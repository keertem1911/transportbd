$(function(){
	function myChart10callBack(msg){
		 
		myChart10(msg);
	}
	$.ajax({
		url:"chart_Chart10fun.action",
		type:"post",
		dataType:"json",
		data:{sql:"where idx_1='中国物流业景气指数(LPI)' and idx_7='物流大数据' "},
		success:function(msg){
			myChart10callBack(msg);
		}
	});
function myChart10(msg){
	var myChart = echarts.init(document.getElementById('container'));
    var idx=['业务总量','新订单','设备利用率','主营业务利润','主营业务成本'];
 		var myChart = echarts.init(document.getElementById('container'));
		option = {
		    title : {
		        text: '中国物流业景气指数(LPI):汇总',
		        subtext: '',
		        x : 'center',
                Y : 'top',
                textAlign : 'center'
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:idx,
		        x : 'center',
		    	y : 'bottom',
		    	orient : 'horizontal',//horizontal
		    	padding : '3',
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            data : function(){
		            	var month=[];
		            	var i=0;
		            	for(var attr in msg['业务总量']){
		            		if(attr ==2016)
		            			break;
		            		month[i++]=attr;
		            	}
		            	 
		            	return month;
		            }()
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            max : '800',
		            min : '80'
		        }
		    ],
		    series :
		    	function (){
		       	 var map=[];
		       	 var cnt=0;
		       	for(var j=0;j<idx.length;++j){
		       		  
		       		  map[cnt++]={
		       		            name:idx[j],
		       		            type:'bar',
		       		             
		       		            data:function(){
		       		            	var array=[];
		       		            	var years=[];
		       		            	var cnt=0;
		       		            	 
		       		            	var i=0;
		       		            	for(var attr in msg[idx[j]]){
		       		            		array[i++]=Math.round(msg[idx[j]][attr]);
		       		            	 
		       		            	}
		       		            	 
		       		            	return array;
		       		            }()
		       		        }
		       	 } 
		       	 
		       	  return map;
		         }()
		};
	    myChart.setOption(option);
	}        
})
