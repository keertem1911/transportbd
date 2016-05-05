$(function(){
	
	function myChart5callBack(msg){
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
			 
			 myChart5(data);
	}
	ajaxUnitfun(" where idx_1='中国物流业景气指数(LPI)' and idx_2='业务总量' and  idx_3='季调' and idx_7='物流大数据'"
			, myChart5callBack);
	function myChart5(data){
	var myChart = echarts.init(document.getElementById('container'));
	 var months2=['01','02','03','04','05','06','07','08','09','10','11','12'];
	 
 		var myChart = echarts.init(document.getElementById('container'));
		option = {
		    title : {
		        text: '中国物流业景气指数(LPI):业务总量',
		        //2224	idx_1=中国物流业景气指数(LPI) idx_2=业务总量 idx_3=季调 idx_7=物流大数据

		        subtext: '',
		        x : 'center',
                Y : 'top',
                textAlign : 'center'
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data://['2012年业务总量','2013年业务总量','2014年业务总量','2015年业务总量'],
		        	function(){
		        	var data1=[];
		        	var i=0;
		        	 for(var attr in data){
		        		 data1[i++]=attr+"年业务总量";
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
			            name:attr+'年业务总量',
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
		    	/*[
		        {
		            name:'2012年业务总量',
		            type:'bar',
		            data:[54.90, 61.20, 63.90, 61.50, 59.20, 61.10, 56.80, 55.60, 56.90, 53.60, 55.70, 58.20],
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
		            name:'2013年业务总量',
		            type:'bar',
		            data:[55.90, 52.40, 57.90, 57.10, 55.80, 55.50, 56.90, 57.10, 57.70, 57.80, 57.00, 55.70],
		        },
		        {
		            name:'2014年业务总量',
		            type:'bar',
		            data:[55.20, 55.50, 55.80, 57.70, 55.20, 56.70, 56.80, 54.10, 56.40, 54.90, 56.50, 57.50],
		        },
		        {
		            name:'2015年业务总量',
		            type:'bar',
		            data:[56.30, 54.90, 58.00, 58.60, 58.00, 55.70, 52.20, 52.00, 52.20, 53.50, 54.20, 55.00],
		        },
		    ]*/
		};
	    myChart.setOption(option);
	}        
})
