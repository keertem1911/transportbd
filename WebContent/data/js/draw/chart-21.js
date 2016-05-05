$(function() {

	function myChartData21callBack(msg) {
		var mapp = {};
		 
		for (var j = 0; j < msg[0]["technoloYears"].length; ++j) {
			 
			if (msg[0]["technoloYears"][j]["idx_year"] > 2005) {
			 
				mapp[msg[0]["technoloYears"][j]["idx_year"]]  =
					msg[0]["technoloYears"][j]["idx_value"];
			}

		}
 
		myChartData21(mapp); 
	}
	ajaxUnitFirst("data_unitsql.action", {
		sql : "  where  idx_1='管道货运量' and idx_7='物流大数据' "
	}, myChartData21callBack);
function myChartData21(mapp) {
	var myChart = echarts.init(document.getElementById('container'));
	var years = function() {
		var arr = [];
		var cnt = 0;
		for ( var attr in mapp)
			arr[cnt++] = attr;
		return arr;
	}();
    option = {
    	title : {
    		show : 'true',
			text : '管道货运量',
			subtext : '万吨',
			x : 'center',
			y : 'top',
			textAlign : 'center'
    	},
	    tooltip : {
	        trigger: 'axis'
	    },
	    legend: {
	    	show : false,
	        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
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
	            data : years
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name:'管道货运量',
	          
	            type:'line',
	            stack: '万吨',
	            data:
	            	function() {
					var array = [];
					for (var i = 0; i < years.length; ++i)
						array[i] = mapp[years[i]];
					return array;
				}()
	        }
	    ]
	};
    myChart.setOption(option);
}	        
}) 
