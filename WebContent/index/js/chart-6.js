$(function(){
	function myChart6callBack(msg){
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
			myChart6(data);
	}
	ajaxUnitfun("where idx_1='中国物流业景气指数(LPI)' and idx_2='新订单' and idx_3='季调' and idx_7='物流大数据'",
			myChart6callBack);
	function myChart6(data){
	var myChart = echarts.init(document.getElementById('container'));
	 var months2=['01','02','03','04','05','06','07','08','09','10','11','12'];
		
 		var myChart = echarts.init(document.getElementById('container'));
		option = {
		    title : {
		        text: '中国物流业景气指数(LPI):新订单',
		        //2225	idx_1=中国物流业景气指数(LPI) idx_2=新订单	idx_3=季调	idx_7=物流大数据

		        subtext: '',
		        x : 'center',
                Y : 'top',
                textAlign : 'center'
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data://['2012年新订单','2013年新订单','2014年新订单','2015年新订单'],
		        	function(){
		        	var data1=[];
		        	var i=0;
		        	 for(var attr in data){
		        		 data1[i++]=attr+"年新订单";
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
		            max : '70',
		            min : '40'
		        }
		    ],
		    series :
		    	function (){
		       	 var map=[];
		       	 var cnt=0;
		       	 
		       	  for(var attr in data){
		       		 map[cnt++]={
			            name:attr+'年新订单',
			            type:'bar',
			            data://[155.84, 146.02, 159.06, 163.05, 168.89, 164.45, 164.53, 166.04, 169.88, 168.39, 171.52, 170.33],
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
		   /* 	[ {
		            name:'2012年新订单',
		            type:'bar',
		            data:[54.40, 59.70, 61.00, 59.50, 54.80, 57.10, 53.90, 52.90, 53.60, 53.10, 54.10, 52.70],
		            markPoint : {
		                data : [
		                    {type : 'max', name: '最大值'},
		                    {type : 'min', name: '最小值'}
		                ]
		            },
		            markLine : {
		                data : [
		                    {type : 'average', name: '平均值'}
		                ]
		            }
		        },
		        {
		            name:'2013年新订单',
		            type:'bar',
		            data:[51.30, 50.90, 55.50, 54.90, 53.10, 54.60, 52.30, 52.60, 53.10, 52.80, 52.20, 52.50],
		        },
		        {
		            name:'2014年新订单',
		            type:'bar',
		            data:[51.80, 52.20, 53.00, 55.40, 53.70, 55.30, 56.00, 54.20, 58.10, 53.50, 54.50, 53.70],
		        },
		        {
		            name:'2015年新订单',
		            type:'bar',
		            data:[53.20, 55.30, 59.80, 60.10, 57.10, 53.70, 52.50, 51.60, 51.60, 53.00, 53.70, 54.20],
		        },
		    ]
*/		};
	    myChart.setOption(option);
	}        
})
