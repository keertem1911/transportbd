$(function(){
	function myChartData3callBack(msg){
		 
		var map={};
		 for(var i=0;i<msg.length;++i){
			 if(msg[i]["idx_1"]!=undefined){
				 var mapp={};
				 for(var j=0;j<msg[i]["technoloYears"].length;++j){
					 mapp[msg[i]["technoloYears"][j]["idx_year"]]=msg[i]["technoloYears"][j]["idx_value"];
				 }
				 
				 map[msg[i]["idx_3"]]=mapp;
			 }
			  
		 }
		 
		  var years=[];
		 var cnt=0;
		 for(var i in map['农产品']){
			 years[cnt++]=i;
		 }  
		myChartData3(map,years);
	}
	ajaxUnitFirst("data_unitsql.action", 
			{sql:" t inner join fetch t.technoloYears y where idx_1='物流业' and idx_2='单位GDP物流需求系数' and " +
					"idx_3 in('农产品','再生资源','进口货物','单位与居民物品','工业品','合计') " +
					"  and idx_7='物流大数据' and y.idx_year between 2005 and 2015"}, 
			myChartData3callBack);
function myChartData3(map,years){
	var myChart = echarts.init(document.getElementById('container1'));
	var idx=['农产品','再生资源','进口货物','单位与居民物品','工业品'];
	 option = {
	    title : {
	        text: years[years.length-1]+'年单位GDP物流需求系数占比',
	         
	        subtext: '',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient : 'vertical',
	        x : 'left',
	        data:idx
	    },
	    calculable : true,
	    series : [
	        {
	            name:'单位GDP物流需求系数细项',
	            type:'pie',
	            radius : '55%',
	            center: ['50%', 225],
	            data:[
	                {value:map['农产品'][years[years.length-1]], name:'农产品'},
	                {value:map['再生资源'][years[years.length-1]], name:'再生资源'},
	                {value:map['进口货物'][years[years.length-1]], name:'进口货物'},
	                {value:map['单位与居民物品'][years[years.length-1]], name:'单位与居民物品'},
	                {value:map['工业品'][years[years.length-1]], name:'工业品'}
	            ]
	        }
	    ]
	};
	
	option2 = {
		title : {
	        text: '单位GDP物流需求系数',
	        subtext: '合计（年）',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {
	            type: 'shadow'
	        }
	    },
	    legend: {
	    	show : false,
	        data:['管理物流费用','运输物流费用','保管物流费用'],
	        x : 'center',
	    	y : 'bottom'
	    },
	    toolbox: {
	        show : true,
	        orient : 'vertical',
	        y : 'center',
	        feature : {
	            mark : {show: true},
	            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            data : years
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            splitArea : {show : false}
	        }
	    ],
	    grid: {
	        x2:40
	    },
	    series : [
	        {
	            name:'单位GDP物流需求系数',
	            type:'line',
	            stack: '总量',
	            data:
	            	function(){
	            	var array=[];
	            	for(var i=0;i<years.length;++i){
	            		array[i]=map['合计'][years[i]];
	            	}
	            	return array;
	            }()
	        }
	    ]
	};
	
	myChart2 = echarts.init(document.getElementById('container2'));
	myChart2.setOption(option2);
	
	myChart.connect(myChart2);
	myChart2.connect(myChart);
	
	setTimeout(function (){
	    window.onresize = function () {
	        myChart.resize();
	        myChart2.resize();
	    }
	},200)
		
    myChart.setOption(option);
}    
}) 
