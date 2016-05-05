$(function(){
	function myChart7callBack(msg){
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
			myChart7(data);
	}
	ajaxUnitfun("where idx_1='中国物流业景气指数(LPI)' and idx_2='设备利用率' and idx_3='季调' and idx_7='物流大数据'", myChart7callBack);
	function myChart7(data){
	var myChart = echarts.init(document.getElementById('container'));
	 var months2=['01','02','03','04','05','06','07','08','09','10','11','12'];
		
 		var myChart = echarts.init(document.getElementById('container'));
		option = {
		    title : {
		        text: '中国物流业景气指数(LPI):设备利用率',
		        //2227	idx_1=中国物流业景气指数(LPI) idx_2=设备利用率 idx_3=季调	idx_7=物流大数据

		        subtext: '',
		        x : 'center',
                Y : 'top',
                textAlign : 'center'
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data://['2012年设备利用率','2013年设备利用率','2014年设备利用率','2015年设备利用率'],
		        	function(){
		        	var data1=[];
		        	var i=0;
		        	 for(var attr in data){
		        		 data1[i++]=attr+"年设备利用率";
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
			            name:attr+'年设备利用率',
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
		    /*	[{
		            name:'2012年设备利用率',
		            type:'bar',
		            data:[52.80, 51.50, 58.50, 56.60, 50.00, 53.50, 49.50, 51.50, 51.50, 51.50, 54.60, 54.20],
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
		            name:'2013年设备利用率',
		            type:'bar',
		            data:[51.60, 51.30, 58.20, 56.50, 54.30, 51.30, 51.50, 50.70, 51.00, 52.90, 51.00, 50.10],
		        },
		        {
		            name:'2014年设备利用率',
		            type:'bar',
		            data:[50.00, 50.40, 51.90, 55.40, 53.40, 54.40, 57.40, 55.00, 58.70, 53.10, 56.50, 56.50],
		        },
		        {
		            name:'2015年设备利用率',
		            type:'bar',
		            data:[54.70, 52.10, 56.50, 56.80, 56.20, 51.20, 49.30, 48.80, 49.80, 51.70, 52.10, 53.30],
		        },
		    ]
*/		};
	    myChart.setOption(option);
	}
})
