$(function(){
	function myChart8callBack(msg){
		 var j=1;
			var data={};
			var flag=0;
			var month={};
			for(var i=0;i<msg[0]["technoloMonths"].length;++i,++j){
				var year=msg[0]["technoloMonths"][i]["idx_month"].split("-");
				
				 month[year[1]]=msg[0]["technoloMonths"][i]["idx_value"]
				if(j==12){
				 data[year[0]]=month;
				 month={};
				 j=0;
				}
	 
	}
			 
			myChart8(data);
	}
	ajaxUnitfun("where idx_1='中国物流业景气指数(LPI)' and idx_2='主营业务成本' and idx_3='季调' and  idx_7='物流大数据'",
			myChart8callBack);
	function myChart8(data){
	var myChart = echarts.init(document.getElementById('container'));
	var months2=['01','02','03','04','05','06','07','08','09','10','11','12'];
	
 		var myChart = echarts.init(document.getElementById('container'));
		option = {
		    title : {
		        text: '中国物流业景气指数(LPI):主营业务成本',
		    //    2231	idx_1=中国物流业景气指数(LPI) idx_2=主营业务成本	idx_3=季调 idx_7=物流大数据

		        subtext: '',
		        x : 'center',
                Y : 'top',
                textAlign : 'center'
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data://['2012年主营业务成本','2013年主营业务成本','2014年主营业务成本','2015年主营业务成本'],
		        	function(){
		        	var data1=[];
		        	var i=0;
		        	 for(var attr in data){
		        		 data1[i++]=attr+"年主营业务成本";
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
		            magicType : {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            max : '80',
		            min : '40'
		        }
		    ],
		    series : 
		    	function (){
		       	 var map=[];
		       	 var cnt=0;
		       
		       	  for(var attr in data){
		       		 map[cnt++]={
			            name:attr+'年主营业务成本',
			            type:'bar',
			            data: 
			            	 function(){
	       		            	var array=[];
	       		            	 
	       		            	var i=0;
	       		            	for(var j=0;j<months2.length;++j){
	       		            		array[j]=data[attr][months2[j]];
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
