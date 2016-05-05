$(function() {

	function myChartData11callBack(msg) {
		var mapp = {};
		var map={};
		for(var i=0;i<msg.length;++i){
			mapp={};
		for (var j = 0; j < msg[i]["technoloMonths"].length; ++j) {
			var years = msg[i]["technoloMonths"][j]["idx_month"].split("-");

			if (years[0] > 2005) {
				if (mapp[years[0]] == undefined)
					mapp[years[0]] = 0;
				mapp[years[0]] += Math.round(msg[i]["technoloMonths"][j]["idx_value"]);

			}

		}
		map[msg[i]["idx_1"]]=mapp;
		}
		var data={};
		for(var year in map["水路货运量"]){
			for(var attr in map){
				data[year]=map[attr][year];
			}
		}
 
		myChartData11(data);
	}
	ajaxUnitFirst("data_unitsql.action", 
			{sql:" where idx_id in('2828','3941','3945')"}, 
			myChartData11callBack);
function myChartData11(mapp){
var myChart = echarts.init(document.getElementById('container'));
var years = function() {
	var arr = [];
	var cnt = 0;
	for ( var attr in mapp)
		arr[cnt++] = attr;
	return arr;
}();
	        var option = {
				title : {
					show : 'true',
					text : '交通运输业货运量总计',
					 
					subtext : '(万亿元)',
					x : 'center',
					y : 'top',
					textAlign : 'center',
				},
				tooltip : {
				        trigger: 'Axsi'
			    },
			    legend: {
			    	show : false,
			    	x : 'right',
			    	y : 'bottom',
			    	orient : 'vertical',//horizontal
			    	padding : '3',
			        data:['交通运输业货运量总计']
			    },
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: false},
			            dataView : {show: true, readOnly: false},
			            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    dataRange : {
			    	show : false,
			    	min : '0',
			    	max : '500'
			    },
			    calculable : true,
			    grid : {
			    	x : '100',
			    	y : '100',
	//		    	x2 : '10',
	//		    	y2 : '10',
			    	width : '600',
			    	height : '200',
			    },
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : years//['2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015']
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : [
			        {
			            name: '货运量总计',
			            type:'line',
			            stack: '总量',
			            data:
			            	function() {
							var array = [];
							for (var i = 0; i < years.length; ++i)
								array[i] = mapp[years[i]];
							return array;
						}()//[1483446.86, 1564491.54, 1706412.00, 1862066.00, 2037059.70, 2275821.61, 2585937.32, 2825221.94, 3241806.69, 3696961.09, 4099400.31, 4098900.03, 4386799.83, 4171000.00]
			        },
			    ]
			};
	        myChart.setOption(option);
}        
}) 
