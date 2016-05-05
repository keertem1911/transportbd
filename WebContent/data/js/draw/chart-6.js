$(function(){
	
	function myChartData6callBack(msg){
		var map={};
		 
		for(var i=0;i<msg.length;++i){
			if(msg[i]["idx_1"]!=undefined){
				var mapp={};
				for(var j=0;j<msg[i]["technoloYears"].length;++j){
					mapp[msg[i]["technoloYears"][j]["idx_year"]]=msg[i]["technoloYears"][j]["idx_value"];
				}
				 
				map[msg[i]["idx_1"]]=mapp;
			}
		}
		 
		myChartData6(map);
	}
	ajaxUnitFirst("data_unitsql.action", 
			{sql:"  t inner join fetch t.technoloYears y " +
					" where idx_1='冷链市场规模' and idx_2=null and idx_7='物流大数据'" +
					" and y.idx_year between 2005 and 2015"}, 
			myChartData6callBack);
function myChartData6(map){
	var myChart = echarts.init(document.getElementById('container2'));
    var year_array=function(){
    	var arr=[];
    	var i=0;
    	for(var attr in map['冷链市场规模']){
    		arr[i++]=attr;
    	}
    	return arr;
    }()
    option = {
    	title : {
    		show : 'true',
			text : '冷链市场规模',
			 
			subtext : '万吨',
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
	            data :year_array
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name:'冷链市场规模',
	            type:'line',
	            stack: '万吨',
	            data:
	            	function(){
	            	var array=[];
	            	for(var i=0;i<year_array.length;++i){
	            		array[i]=map['冷链市场规模'][year_array[i]];
	            	}
	            	return array;
	            }()
	        }
	    ]
	};
    
    myChart.setOption(option);
}     
})
