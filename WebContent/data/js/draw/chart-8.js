$(function(){
	
	function myChartData8callBack(msg){
		var map={};
		 
		for(var i=0;i<msg.length;++i){
			if(msg[i]["idx_2"]!=undefined){
				var mapp={};
				for(var j=0;j<msg[i]["technoloYears"].length;++j){
					mapp[msg[i]["technoloYears"][j]["idx_year"]]=msg[i]["technoloYears"][j]["idx_value"];
				}
				 
				map[msg[i]["idx_2"]]=mapp;
			}
		}
	 
		myChartData8(map);
	}
	ajaxUnitFirst("data_unitsql.action", 
			{sql:"  t inner join fetch t.technoloYears y " +
					" where idx_1='仓储业' and	idx_2='营业性通用仓库面积' and idx_7='物流大数据'" +
					" and y.idx_year between 2005 and 2015"}, 
			myChartData8callBack);
function myChartData8(map){
	var myChart = echarts.init(document.getElementById('container2'));
	 var year_array=function(){
	    	var arr=[];
	    	var i=0;
	    	for(var attr in map["营业性通用仓库面积"]){
	    		arr[i++]=attr;
	    	}
	    	return arr;
	    }()
    option = {
    	title : {
    		show : 'true',
			text : "营业性通用仓库面积",
			 
			subtext : '亿平方米',
			x : 'center',
			y : 'top',
			textAlign : 'center'
    	},
	    tooltip : {
	        trigger: 'axis'
	    },
	    legend: {
	    	show : false,
	        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            mark : {show: true},
	            dataView : {show: true, readOnly: false},
	            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            data : year_array
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name:'营业性通用仓储面积',
	            type:'line',
	            stack: '亿平方米',
	            data:function(){
	            	var array=[];
	        
	            	for(var i=0;i<year_array.length;++i){
	            		array[i]=map['营业性通用仓库面积'][year_array[i]];
	            	}
	            	return array;
	            }()
	        }
	    ]
	};
    
    myChart.setOption(option);
}        
}) 
