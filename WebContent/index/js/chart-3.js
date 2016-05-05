$(function(){
	
	function myChart3callBack(msg){
		
		 
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
			 
		myChart3(data);
	}
	ajaxUnitfun("where idx_1='港口行业景气指数' and idx_7='物流大数据'", myChart3callBack);

function myChart3(data){
	var myChart = echarts.init(document.getElementById('container'));
    var months=['1','2','3','4','5','6','7','8','9','10','11','12'];
    var months2=['01','02','03','04','05','06','07','08','09','10','11','12'];
 	
 		var myChart = echarts.init(document.getElementById('container'));
		option = {
		    title : {
		        text: '港口行业景气指数',
		        //2583	月	中国港口协会	点	idx_1=港口行业景气指数	idx_7=物流大数据

		        subtext: '',
		        x : 'center',
                Y : 'top',
                textAlign : 'center'
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data://['2012景气指数','2013景气指数','2014景气指数','2015景气指数'],
		        	function(){
		        	var data1=[];
		        	var i=0;
		        	 for(var attr in data){
		        		 data1[i++]=attr+"景气指数";
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
		            data : function(){
		            	var mon=[];
		            	for(var i=0;i<months.length;++i)
		            		mon[i]=months[i]+"月";
		            	return mon;
		            }()
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
			            name:attr+'景气指数',
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
			            /*	markPoint : {
			                data : [
			                    {type : 'max', name: '最大值'},
			                    {type : 'min', name: '最小值'}
			                ]
			            },
			            markLine : {
			                data : [
			                    {type : 'average', name: '平均值'}
			                ]
			            }*/
			         }  
		       	  }
		       	  return map;
		         }()
//		        [{
//		            name:'2012景气指数',
//		            type:'bar',
//		            data:[155.84, 146.02, 159.06, 163.05, 168.89, 164.45, 164.53, 166.04, 169.88, 168.39, 171.52, 170.33],
//		            markPoint : {
//		                data : [
//		                    {type : 'max', name: '最大值'},
//		                    {type : 'min', name: '最小值'}
//		                ]
//		            },
//		            markLine : {
//		                data : [
//		                    {type : 'average', name: '平均值'}
//		                ]
//		            }
		    /*    },
		        {
		            name:'2013年景气指数',
		            type:'bar',
		            data:[176.96, 151.02, 170.52, 174.15, 178.03, 177.00, 179.53, 179.43, 180.31, 183.22, 184.65, 180.32],
		        },
		        {
		            name:'2014年景气指数',
		            type:'bar',
		            data:[190.33, 164.67, 185.69, 191.03, 190.83, 191.17, 186.02, 196.22, 190.50, 198.03, 197.16, 194.97],
		        },
		        {
		            name:'2015年景气指数',
		            type:'bar',
		            data:[200.36, 174.99, 187.76, 196.47, 200.96, 198.37, 198.97, 202.17, 195.29, 196.77, 202.68, 204.55],
		        },
		    ]*/
		} 
	    myChart.setOption(option);
} 
}) 	
