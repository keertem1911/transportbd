$(function(){
	
	function myChartData19callBack(msg){
		 
		var map={};
	 
		var mapp={};
		 for(var i=0;i<msg.length;++i){
			 mapp={};
		for(var j=0;j<msg[i]["technoloMonths"].length;++j){
			var years=msg[i]["technoloMonths"][j]["idx_month"].split("-");
			 
			if(years[0]>2010){
				if(mapp[years[0]]==undefined)
					mapp[years[0]]=0;
				mapp[years[0]]+= Math.round(msg[i]["technoloMonths"][j]["idx_value"]);
				 
				}
			 
			}
		if(msg[i]["idx_3"]==undefined)
			map[msg[i]["idx_1"]]=mapp;
		else {
			if(msg[i]["idx_2"]=="地区航线")
				map["港澳台地区"]=mapp;	
			else
			map[msg[i]["idx_2"]]=mapp;
		}
		}
		 
		myChartData19(map);
	}
	ajaxUnitFirst("data_unitsql.action", 
			{sql:" where idx_id in (3006,3007,3008)"}, 
			myChartData19callBack);
function myChartData19(map){
	var idx=function(){
		var arr=[];
		var cnt=0;
		for(var attr in map)
			arr[cnt++]=attr;
		return arr;
	}();
	var years=function(){
		var arr=[];
		var cnt=0;
		for(var attr in map['国内航线'])
			arr[cnt++]=attr;
		return arr;
	}();
	var mapp={};
	
		for(var j=0;j<years.length;++j){
			var sum=0;
			for(var i=0;i<idx.length;++i){
				sum+=Math.round(map[idx[i]][years[j]]);
			}
			mapp[years[j]]=sum;
	}
	map["民航货邮运输量"]=mapp;	 
	 
	idx=function(){
		var arr=[];
		var cnt=0;
		for(var attr in map)
			arr[cnt++]=attr;
		return arr;
	}();
	
	option = {
	    title : {
	        text: '民航货邮运输量',
	         
	        subtext: '万吨',
	        x : 'center',
	        y : 'top'
	    },
	    tooltip : {
	        trigger: 'axis'
	    },
	    legend: {
	    	show : false,
	        data:['运输成本','管理成本','保管成本','仓储成本','利息成本','配送加工包装','保险','信息及相关服务']
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
	            data :idx
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series :
	    	function(){
	    	var arr=[];
	    	for(var i=0;i<years.length;++i){
	    		arr[i]={
	    	            name:years[i],
	    	            type:'bar',
	    	            data: 
	    	            	function(){
	    	            	var arr=[];
	    	            	for(var j=0;j<idx.length;++j)
	    	            		arr[j]=map[idx[j]][years[i]];
	    	            	return arr;
	    	            }()
	    			}
	    		}
	    	return arr;
	    }()
 };
	var myChart = echarts.init(document.getElementById('container'));
    myChart.setOption(option);
}        
}) 
