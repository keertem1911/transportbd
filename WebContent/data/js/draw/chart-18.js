$(function(){
	function myChartData18callBack(msg){
		var years=['2011','2012','2013','2014','2015'];
		var months=['2','3','4','5','6','7','8','9','10','11','12'];
	    var mapp={};
	    var mapp2={};
	 
		for(var i=0;i<msg[0]["technoloMonths"].length;++i){
			var month=msg[0]["technoloMonths"][i];
			var year=month["idx_month"].split("-");
			var map={};
			if(year[0]>2010){
				if(year[1]==01)
					mapp2={};
				if(year[0]>2010){
					mapp2[year[1]]=month["idx_value"];
					if(year[1]=='11'){
						mapp[year[0]]=mapp2;
						mapp2={};
					}
				}
			} 
		}
			 
		myChartData18(mapp);
	}
	ajaxUnitFirst("data_unitsql.action", 
			{sql:"where idx_1='集装箱吞吐量' and idx_2='沿海合计' and idx_3='当月值' and idx_7='物流大数据'"}, 
			myChartData18callBack);
function myChartData18(map){
	var myChart = echarts.init(document.getElementById('container'));
	var years=function(){
		var arr=[];
		var cnt=0;
		for(var attr in map){
			arr[cnt++]=attr;
		}
		return arr;
	}();
	 
	var months=['01','02','03','04','05','06','07','08','09','10','11','12'];
	 
    option = {
    	title : {
    		show : 'true',
			text : '全国主要港口集装箱吞吐量',
			 	subtext : '当月值 万吨',
			x : 'center',
			y : 'top',
			textAlign : 'center',
    	},
	    tooltip : {
	        trigger: 'axis'
	    },
	    legend: {
	        data: 
	        	function(){
	        	var arr=[];
	        	for(var i=0;i<years.length;++i)
	        		arr[i]=years[i]+'集装箱吞吐量';
	        	return arr;
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
	            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月']
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	               
	        }
	    ],
	    series :
	    	function (){
	    	var arr=[];
	    	for(var i=0;i<years.length;++i){
	    		arr[i]={
	    	            name:years[i]+'集装箱吞吐量',
	    	            type:'line',
	    	            stack: '当月值',
	    	            data: 
	    	            	function(){
	    	            	var arr1=[];
	    	            	for(var j=0;j<months.length;++j){
	    	            		arr1[j]=map[years[i]][months[j]];
	    	            	}
	    	            	return arr1;
	    	            }()
	    			}
	    	}
	    	return arr;
	    }()
	    	 
	};
    
    myChart.setOption(option);
}       
}) 
