$(function(){
	function myChart4callBack(msg){
		 
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
			 
		myChart4(data);
	}
	ajaxUnitfun("where idx_1='港口行业景气指数' and idx_2='货物吞吐量指数' and idx_7='物流大数据'", myChart4callBack);
})
function myChart4(data){
	var myChart = echarts.init(document.getElementById('container'));
	  
	    var months2=['01','02','03','04','05','06','07','08','09','10','11','12'];
	 
 		var myChart = echarts.init(document.getElementById('container'));
		option = {
		    title : {
		        text: '港口行业景气指数-货物吞吐量',
		        //2584	月	中国港口协会	点	idx_1=港口行业景气指数	idx_2=货物吞吐量指数	 idx_7=物流大数据

		        subtext: '',
		        x : 'center',
                Y : 'top',
                textAlign : 'center'
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data://['2012货物吞吐量','2013货物吞吐量','2014货物吞吐量','2015货物吞吐量'],
		        	function(){
		        	var data1=[];
		        	var i=0;
		        	 for(var attr in data){
		        		 data1[i++]=attr+"货物吞吐量";
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
		            max : '250',
		            min : '140'
		        }
		    ],
		    series :
		    	function (){
		       	 var map=[];
		       	 var cnt=0;
		       
		       	  for(var attr in data){
		       		 map[cnt++]={
			            name:attr+'货物吞吐量',
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
	 
		};
	    myChart.setOption(option);
}

