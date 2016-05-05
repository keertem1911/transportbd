$(function(){
	 function myChart2callBack(msg){
		 
		 var j=1;
			var data={};
			var flag=0;
			var month={};
			for(var i=0;i<msg[0]["technoloMonths"].length;++i,++j){
				var year=msg[0]["technoloMonths"][i]["idx_month"].split("-");
				
				 month[year[1]]=msg[0]["technoloMonths"][i]["idx_value"]
				if(j==4){
				 data[year[0]]=month;
				 month={};
				 j=0;
				}
	 
     	}
			 
			myChart2(msg,data);
	 }
	 
	ajaxUnitfun("where idx_1='航运服务企业经营指标景气指数' and 	idx_2='业务量' and idx_7='物流大数据'", myChart2callBack);
	 
	
function myChart2(msg,data){
	var myChart = echarts.init(document.getElementById('container'));
    option = {
    	title : {
    		show : 'true',
			text : '港口企业经营指标景气指数:业务量',
			//2904	季	上海国际航运研究中心	点	idx_1=航运服务企业经营指标景气指数	idx_2=业务量 物流大数据
			subtext : '季度统计',
			x : 'center',
			y : 'top',
			textAlign : 'center',
    	},
	    tooltip : {
	        trigger: 'axis'
	    },
	    legend: {
	        data://['2010业务量','2011业务量','2012业务量','2013业务量','2014业务量','2015业务量'],
	        	function(){
	        	var data1=[];
	        	var i=0;
	        	 for(var attr in data){
	        		 data1[i++]=attr+"业务量";
	        	 }
	        	return data1;
	        }(),
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
	            data : ['3月','6月','9月','12月']
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : 
	    	function (){
       	 var map=[];
       	 var cnt=0;
       	  for(var attr in data){
       		  
       		  map[cnt++]={
       		            name:attr+'业务量',
       		            type:'line',
       		            stack: '累计值',
       		            data:function(){
       		            	var array=[];
       		            	var month=["03","06","09","12"];
       		            	var i=0;
       		            	for(var j=0;j<month.length;++j){
       		            		array[j]=data[attr][month[j]];
       		            	}
       		            	 
       		            	return array;
       		            }()
       		        }
       	 } 
       	 
       	  return map;
         }()/*[
	        {
	            name:'2010业务量',
	            type:'line',
	            stack: '累计值',
	            data:[87.50, 158.90, 122.20, 95.65]
	        },
	        {
	            name:'2011业务量',
	            type:'line',
	            stack: '累计值',
	            data:[107.85, 95.32, 120.77, 94.22]
	        },
	        {
	            name:'2012业务量',
	            type:'line',
	            stack: '累计值',
	            data:[59.25, 95.31, 65.20, 59.01]
	        },
	        {
	            name:'2013业务量',
	            type:'line',
	            stack: '累计值',
	            data:[75.19, 74.83, 108.16, 100.56]
	        },
	        {
	            name:'2014业务量',
	            type:'line',
	            stack: '累计值',
	            data:[77.04, 84.48, 108.52, 113.31]
	        },
	        {
	            name:'2015业务量',
	            type:'line',
	            stack: '累计值',
	            data:[82.19, 90.57, 67.02, 43.34]
	        }
	    ]*/
	};
 
    myChart.setOption(option);
}
}) 
