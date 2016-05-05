$(function(){
	function myChartData1callBack(msg){
		var years=['2011','2012','2013','2014','2015'];
		var months=['2','3','4','5','6','7','8','9','10','11','12'];
	    var mapp={};
	    var mapp2={};
	 
		for(var i=0;i<msg[0]["technoloMonths"].length;++i){
			var month=msg[0]["technoloMonths"][i];
			var year=month["idx_month"].split("-");
			if(year[0]>2010){
			 
				if(year[1]>1){
					mapp2[year[1]]=month["idx_value"];
					if(year[1]=='12'||(year[0]==2015&&year[1]==11)){
						mapp[year[0]]=mapp2;
						mapp2={};
					}
					
				}
				
			} 
		}
		 
		myChartData1(mapp);
	}
	ajaxUnitFirst("data_unitsql.action", 
			{sql:"where idx_1='物流业' and idx_2='全国社会物流总额' and	idx_3='累计值' and idx_7='物流大数据'"}, 
			myChartData1callBack);
function myChartData1(mapp){
	var myChart = echarts.init(document.getElementById('container'));
	var years=['2011','2012','2013','2014','2015'];

    option = {
    	title : {
    		show : 'true',
			text : '全国社会物流总额',
			//2475	idx_1=物流业	idx_2=全国社会物流总额	idx_3=累计值	idx_7=物流大数据

			subtext : '累计值(万亿元)',
			x : 'center',
			y : 'top',
			textAlign : 'center',
    	},
	    tooltip : {
	        trigger: 'axis'
	    },
	    legend: {
	        data:['2011物流总额','2012物流总额','2013物流总额','2014物流总额','2015物流总额'],
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
	            data : ['2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
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
	    	 for(var i=0;i<years.length;++i){
	    		 map[cnt++]={
	    		            name:years[i]+'物流总额',
	    		            type:'line',
	    		            stack: '累计值',
	    		            data: 
	    		            	function(){
	    		            	var array=[];
	    		            	var months=['02','03','04','05','06','07','08','09','10','11','12'];
	    		            	for(var j=0;j<months.length;++j){
	    		            		 
	    		            		var value=mapp[years[i]][months[j]];
	    		            		
	    		            		if(value==undefined){
	    		            			value=0;
	    		            		}
	    		            		array[j]=value;
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
