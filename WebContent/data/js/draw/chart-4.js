$(function(){
	function myChartData4callBack(msg){
		 
		var map={};
		for(var i=0;i<msg.length;++i){
			var mapp=[];
			if(msg[i]["idx_3"]!=undefined){
				
				for(var j=0;j<msg[i]["technoloYears"].length;++j){
					mapp[j]=msg[i]["technoloYears"][j];
				}
				map[msg[i]["idx_3"]]=mapp;
			}
		}
	 
		myChartData4(map);
	}
	ajaxUnitFirst("data_unitsql.action", 
			{sql:" t inner join fetch t.technoloYears y where idx_1='物流业' and idx_2='物流总费用占GDP比重' " +
					"and idx_3 in('合计','运输费用','保管费用','管理费用')  " +
					" and idx_7='物流大数据' and y.idx_year between 2005 and 2015"}, 
			myChartData4callBack);
function myChartData4(map){
	myChart4 = echarts.init(document.getElementById('container2'));
	
	var idx=['合计','运输费用','保管费用','管理费用'];
	option2 = {
		title : {
	        text: '物流总费用占GDP比重',
	        
	        subtext: '',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {
	            type: 'shadow'
	        }
	    },
	    legend: {
	        data:idx,
	        x : 'center',
	    	y : 'bottom'
	    },
	    toolbox: {
	        show : true,
	        orient : 'vertical',
	        y : 'center',
	        feature : {
	            mark : {show: true},
	            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            data : function(){
	            	var array=[];
	            	for(var i=0;i<map['合计'].length;++i)
	            		array[i]=map['合计'][i]["idx_year"];
	            	return array;
	            	}()
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            splitArea : {show : true}
	        }
	    ],
	    grid: {
	        x2:40
	    },
	    series : 
	    	function(){
	    	var mapp=[];
	    	for(var i=0;i<idx.length;++i){
	    		mapp[i]={
	    	            name:idx[i],
	    	            type:'line',
	    	            stack: '总量',
	    	            data:
	    	            	function(){
	    	            	var array=[];
	    	            	for(var j=0;j<map[idx[i]].length;++j){
	    	            		array[j]=map[idx[i]][j]["idx_value"];
	    	            	}
	    	            	return array;
	    	            }()
	    	        }
	    	}
	    	return mapp;
	    }()
	    	/*[{
	            name:'合计',
	            type:'line',
	            stack: '总量',
	            data:[17.37, 17.54, 16.90, 16.60,16.30]
	        },
	        {
	            name:'运输费用',
	            type:'line',
	            stack: '总量',
	            data:[9.40, 9.40, 9.50, 8.80,8.70]
	        },
	        {
	            name:'保管费用',
	            type:'line',
	            stack: '总量',
	            data:[6.30, 6.30, 6.40, 5.80,5.90]
	        },
	        {
	            name:'管理费用',
	            type:'line',
	            stack: '总量',
	            data:[2.20, 2.20, 2.30, 2.00,1.90]
	        }
	    ]*/
	};
	
//	setTimeout(function (){
//	    window.onresize = function () {
//	        myChart.resize();
//	        myChart2.resize();
//	    }
//	},200)
	myChart4.setOption(option2);
	
    myChart4.setOption(option2);
}  
})
