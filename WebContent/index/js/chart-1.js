$(function(){
	 	function myChartcallBack(msg){
			 
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
			 
			mychart1(msg,data);
	 	}
			ajaxUnitfun("where idx_1='港口企业经营指标景气指数' and idx_2='吞吐量' and idx_7='物流大数据'", myChartcallBack);
			
		
	 
	function mychart1(msg,data){
	var myChart = echarts.init(document.getElementById('container'));
    option = {
    	title : {
    		show : 'true',
			text : '港口企业经营指标景气指数:吞吐量',
			//2903	季	上海国际航运研究中心	点	idx_1=港口企业经营指标景气指数	idx_2=吞吐量 idx_7=物流大数据

			subtext : '季度统计',
			x : 'center',
			y : 'top',
			textAlign : 'center',
    	},
	    tooltip : {
	        trigger: 'axis'
	    },
	    legend: {
	        data://['2010吞吐量','2011吞吐量','2012吞吐量','2013吞吐量','2014吞吐量','2015吞吐量'],
	        function(){
	        	var data1=[];
	        	var i=0;
	        	 for(var attr in data){
	        		 data1[i++]=attr+"吞吐量";
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
	         }()
	        /*[{
	            name:'2010吞吐量',
	            type:'line',
	            stack: '累计值',
	            data:[154.38, 196.25, 170.30, 181.70]
	        },]
	        */
	     
	};

    myChart.setOption(option);
	}  
})
