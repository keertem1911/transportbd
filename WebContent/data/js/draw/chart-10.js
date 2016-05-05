$(function(){
	
	function myChartData10callBack(msg){
		var map={};
		for(var i=0;i<msg.length;++i){
			if(msg[i]["idx_1"]!=undefined){
				var mapp={};
				for(var j=0;j<msg[i]["technoloYears"].length;++j){
					mapp[msg[i]["technoloYears"][j]["idx_year"]]=msg[i]["technoloYears"][j]["idx_value"];
				}
				if(msg[i]["idx_2"]!=undefined)
				map[msg[i]["idx_2"]]=mapp;
				else
				map[msg[i]["idx_1"]]=mapp;
			}
		}
	 
		myChartData10(map);
	}
	ajaxUnitFirst("data_unitsql.action", 
			{sql:"  t inner join fetch t.technoloYears y  where idx_1='规模以上快递业务收入' " +
					"and (idx_2 in('同城快递','异地快递','国际及港澳台快递') or t.idx_id=3448) " +
					"  and idx_7='物流大数据' and y.idx_year between 2010 and 2015"}, 
			myChartData10callBack);
function myChartData10(map){
	var myChart = echarts.init(document.getElementById('container1'));
	var idx=['同城快递','异地快递','国际及港澳台快递'];
	var year_array=function(){
    	var arr=[];
    	var i=0;
    	for(var attr in map["规模以上快递业务收入"]){
    		arr[i++]=attr;
    	}
    	return arr;
    }()
    var cnt=0;
	option = {
	    timeline : {
	        data :  year_array,
	        label : {
	            formatter : function(s) {
	                return s.slice(0, 7);
	            }
	        }
	    },
	    options : [
	        {
	            title : {
	                text: '规模以上快递业务收入',
	               
	                subtext: '亿元',
	                x : 'center',
	                Y : 'top'
	            },
	            tooltip : {
	                trigger: 'item',
	                formatter: "{a} <br/>{b} : {c} ({d}%)"
	            },
	            legend: {
	                data:idx,
	                x : 'center',
	                y : '330'
	            },
	            toolbox: {
	                show : true,
	                feature : {
	                    mark : {show: true},
	                    dataView : {show: true, readOnly: false},
	                    magicType : {
	                        show: true, 
	                        type: ['pie', 'funnel'],
	                        option: {
	                            funnel: {
	                                x: '25%',
	                                width: '50%',
	                                funnelAlign: 'left',
	                                max: 1700
	                            }
	                        }
	                    },
	                    restore : {show: true},
	                    saveAsImage : {show: true}
	                }
	            },
	            series : [
	                {
	                    name:year_array[cnt],
	                    type:'pie',
	                    center: ['50%', '45%'],
	                    radius: '50%',
	                    data:function(){
	                    	var mapp=[];
	                    	for(var i=0;i<idx.length;++i){
	                    		mapp[i]={value: map[idx[i]][year_array[cnt]],  name:idx[i]};
	                    	}
	                    	cnt++;
	                    	return mapp;
	                    }()
	                }
	            ]
	        },
	        {
	            series : [
	                {
	                    name:year_array[cnt],
	                    type:'pie',
	                    data:function(){
	                    	var mapp=[];
	                    	for(var i=0;i<idx.length;++i){
	                    		mapp[i]={value: map[idx[i]][year_array[cnt]],  name:idx[i]};
	                    	}
	                    	cnt++;
	                    	return mapp;
	                    }()
	                }
	            ]
	        },
	        {
	            series : [
	                {
	                    name:year_array[cnt],
	                    type:'pie',
	                    data:function(){
	                    	var mapp=[];
	                    	for(var i=0;i<idx.length;++i){
	                    		mapp[i]={value: map[idx[i]][year_array[cnt]],  name:idx[i]};
	                    	}
	                    	cnt++;
	                    	return mapp;
	                    }()
	                }
	            ]
	        },
	        {
	            series : [
	                {
	                    name:year_array[cnt],
	                    type:'pie',
	                    data:function(){
	                    	var mapp=[];
	                    	for(var i=0;i<idx.length;++i){
	                    		mapp[i]={value: map[idx[i]][year_array[cnt]],  name:idx[i]};
	                    	}
	                    	cnt++;
	                    	return mapp;
	                    }()
	                }
	            ]
	        },
	        {
	            series : [
	                {
	                    name:year_array[cnt],
	                    type:'pie',
	                    data:function(){
	                    	var mapp=[];
	                    	for(var i=0;i<idx.length;++i){
	                    		mapp[i]={value: map[idx[i]][year_array[cnt]],  name:idx[i]};
	                    	}
	                    	cnt++;
	                    	return mapp;
	                    }()
	                }
	            ]
	        },
	        {
	            series : [
	                {
	                    name:year_array[cnt],
	                    type:'pie',
	                    data:function(){
	                    	var mapp=[];
	                    	for(var i=0;i<idx.length;++i){
	                    		mapp[i]={value: map[idx[i]][year_array[cnt]],  name:idx[i]};
	                    	}
	                    	cnt++;
	                    	return mapp;
	                    }()
	                }
	            ]
	        }
	    ]
	};	
	
	option2 = {
		title : {
	        text: '规模以上快递业务收入',
	        subtext: '合计（亿元）',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {
	            type: 'shadow'
	        }
	    },
	    legend: {
	    	show : false,
	        data:['管理物流费用','运输物流费用','保管物流费用'],
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
	            data : year_array
	            	
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            splitArea : {show : false}
	        }
	    ],
	    grid: {
	        x2:40
	    },
	    series : [
	        {
	            name:'规模以上快递业务收入',
	            type:'line',
	            stack: '总量',
	            data:
	            	function(){
	            	var arr=[];
	            	for(var i=0;i<year_array.length;++i){
	            		arr[i]=map['规模以上快递业务收入'][year_array[i]];
	            		}
	            	return arr;
	            }()
	        }
	    ]
	};
	
	myChart2 = echarts.init(document.getElementById('container2'));
	myChart2.setOption(option2);
	
	myChart.connect(myChart2);
	myChart2.connect(myChart);
	
	setTimeout(function (){
	    window.onresize = function () {
	        myChart.resize();
	        myChart2.resize();
	    }
	},200)
		
    myChart.setOption(option);
}	        
}) 
