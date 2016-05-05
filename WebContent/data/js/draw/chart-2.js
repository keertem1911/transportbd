$(function(){
	function myChartData2callBack(msg){
 
		var map={};
		 for(var i=0;i<msg.length;++i){
			 if(msg[i]["idx_1"]!=undefined){
				 var mapp={};
				 for(var j=0;j<msg[i]["technoloYears"].length;++j){
					 mapp[msg[i]["technoloYears"][j]["idx_year"]]=msg[i]["technoloYears"][j]["idx_value"];
				 }
				 map[msg[i]["idx_2"]]=mapp;
			 }
			  
		 }
		 var years=[];
		 var cnt=0;
		 for(var i in map['管理物流费用']){
			 years[cnt++]=i;
		 }
		 
		myChartData2(map,years);
	}
	ajaxUnitFirst("data_myChartData2.action", 
			{sql:"  where idx_1='物流业' and idx_2 in('管理物流费用','运输物流费用','保管物流费用')  " +
					" and idx_7='物流大数据' "}, 
			myChartData2callBack);
function myChartData2(map,years){
	var myChart = echarts.init(document.getElementById('container1'));
	var idx=['管理物流费用','运输物流费用','保管物流费用'];
	 option = {
	    title : {
	        text: years[years.length-1]+'年物流业三大费用占比',
	        /*
	         *
	         						idx_1	idx_2						idx_7
	        	3662				物流业	管理物流费用					物流大数据
				3663				物流业	运输物流费用					物流大数据
				3664				物流业	保管物流费用					物流大数据

	         */
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
	            name:years[years.length-1]+'年物流管理成本占比',
	            type:'pie',
	            radius : '55%',
	            center: ['50%', 225],
	            data:[
	                {value:parseInt(map['管理物流费用'][years[years.length-1]]), name:'管理物流费用'},
	                {value:parseInt(map['运输物流费用'][years[years.length-1]]), name:'运输物流费用'},
	                {value:parseInt(map['保管物流费用'][years[years.length-1]]), name:'保管物流费用'}
	            ]
	        }
	    ]
	};
	
	option2 = {
		title : {
	        text: '物流业三大费用变化趋势',
	        subtext: '亿元',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {
	            type: 'shadow'
	        }
	    },
	    legend: {
	        data:idx,
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
	            splitArea : {show : true}
	        }
	    ],
	    grid: {
	        x2:40
	    },
	    series :
	    	function (){
	    	var results=[];
	     
	    	for(var i=0;i<idx.length;++i){
	    		results[i]={
	    	            name:idx[i],
	    	            type:'bar',
	    	            stack: '总量',
	    	            data: 
	    	            	function(){
	    	            	var array=[];
	    	            	 
	    	            	for(var j=0;j<years.length;++j){
	    	            		
	    	            		 
	    	            		array[j]=map[idx[i]][years[j]];
	    	            	}
	    	            	return array;
	    	            }()
	    	        }
	    	}
	    	 
	    	return results;
	    }()
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
