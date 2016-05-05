$(function(){
	
	function myChartData9callBack(msg){
		var map={};
		for(var i=0;i<msg.length;++i){
			if(msg[i]["idx_3"]!=undefined){
				var mapp={};
				for(var j=0;j<msg[i]["technoloYears"].length;++j){
				 
					mapp[msg[i]["technoloYears"][j]["idx_year"]]=msg[i]["technoloYears"][j]["idx_value"];
				}
				 
				map[msg[i]["idx_3"]]=mapp;
			}
		}
	 
		myChartData9(map);
	}
	ajaxUnitFirst("data_unitsql.action", 
			{sql:"  t inner join fetch t.technoloYears y " +
					" where idx_1='物流成本' and	idx_2='工业、批发和零售业企业' " +
					"and idx_3 in ('运输成本','管理成本','保管成本','仓储成本','利息成本','配送流通加工包装成本','保险成本','信息及相关服务成本')" +
					" and idx_4='同比' and idx_7='物流大数据'" +
					" and y.idx_year between 2011 and 2015"}, 
			myChartData9callBack);
function myChartData9(map){
	var idx=['运输成本','管理成本','保管成本','仓储成本','利息成本','配送流通加工包装成本','保险成本','信息及相关服务成本'];
	var year_array=function(){
    	var arr=[];
    	var i=0;
    	for(var attr in map["保管成本"]){
    		arr[i++]=attr;
    	}
    	return arr;
    }()
	option = {
	    title : {
	        text: '工业、批发和零售业同比成本',
	        subtext: ''
	    },
	    tooltip : {
	        trigger: 'axis'
	    },
	    legend: {
	    	show : false,
	        data:idx
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
	            data : idx
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : 
	    	function (){
	    	var mapp=[];
	    	for(var i=0;i<year_array.length;++i){
	    		mapp[i]={
	    	            name:year_array[i],
	    	            type:'bar',
	    	            data: 
	    	            	function(){
	    	            	var arr=[];
	    	            	for(var j=0;j<idx.length;++j){
	    	            		var value=map[idx[j]][year_array[i]];
	    	            		if(value==undefined)
	    	            			value=0;
	    	            		arr[j]=value;
	    	            	}
	    	            	return arr;
	    	            }()
	    		}
	    	}
	    	return mapp;
	    }()
	    	 
	};
	var myChart = echarts.init(document.getElementById('container2'));
    myChart.setOption(option);
}   
})
