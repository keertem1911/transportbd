$(function(){
	
	function myChartData20callBack(msg){
		 
		var map={};
		var mapp={};
		var pro={};
		var keys=[];
		 
		for(var i=0;i<msg.length;++i){
			var yearsvalue={};
		  
			var city=msg[i]["idx_2"].split("-");
			if(pro[city[0]]==undefined){
				
				pro[city[0]]={"length":0,"desc":[]};
				keys[city[0]]={"length":0,desc:[]}; 
			}
			  
			pro[city[0]].desc[pro[city[0]].length++]={"city":city[1],"value":msg[i]["technoloYears"][0]["idx_value"]};
		 	keys[city[0]].desc[keys[city[0]].length++]=  city[1];
		}
		  
		 var html="<option value=\"-1\">请选择起始地</option>";
		 for(var attr in pro)
			 html+="<option value='"+attr+"'>"+attr+"</option>";
		 $("#src").empty();
		 
		 $("#src").append(html);
	$("#src").change(function(){
		$("#desc").empty();
		$("#years").empty().append("<option value=\"-1\">无</option>");
		
		var src=$(this).val();//起始点
		if(src!=-1){
	 var html="<option value=\"-1\">请选择目的地</option>";
	for(var i=0;i<keys[src]["desc"].length;++i){
		 html+="<option value='"+i+"'>"+keys[src]["desc"][i]+"</option>";
		}
		
		$("#desc").append(html);
			
		}
		
		
	});
	 
	
	 
	 $("#select_pro").click(function(){
		var src=$("#src").val();
		 
		if(src!=-1){
			var desc=$("#desc").val();
			if(desc!=-1){
		 	 	myChartData20([[{
                name: src
            },
            {
                name: pro[src]["desc"][desc]["city"],
                value: pro[src]["desc"][desc]["value"]
            }]],[parseInt(pro[src]["desc"][desc]["value"])-Math.round(pro[src]["desc"][desc]["value"])*0.2,
                 parseInt(pro[src]["desc"][desc]["value"])+Math.round(pro[src]["desc"][desc]["value"])*0.2]);
		}else{
			var data=[];
			var minax =[0,0];
		 
			for(var i=0;i<pro[src]["desc"].length;++i){
				if(minax[0]>Math.round(pro[src]["desc"][i]["value"]))
				minax[0]=pro[src]["desc"][i]["value"];
				if(minax[1]<Math.round(pro[src]["desc"][i]["value"]))
				minax[1]=pro[src]["desc"][i]["value"];
				data[i]=[{
                    name: src
                },
                {
                    name: pro[src]["desc"][i]["city"],
                    value: pro[src]["desc"][i]["value"]
                }]
			}
		 
			myChartData20(data,minax);
		}
		}else{
			alert("请选择起始地点");
		}
	 })
	
	}
	 myChartData20([],[0,0]);
	ajaxUnitFirst("data_unitsql.action", 
			{sql:" t inner join fetch t.technoloYears y where idx_1='货邮运输量'" +
					" and y.idx_year =2014 "}, 
			myChartData20callBack);
function myChartData20(data,minax){
			var myChart;
	        var eCharts;
	        // 路径配置
	    
	        var fileLocation = './js/commen/echarts-map';
	        require.config({
	            paths: {
	                echarts: fileLocation,
	                'echarts/chart/map': fileLocation
	            }
	        });
	
	        // 使用
	        require(
	            [
	                'echarts',
	                'echarts/chart/map', // 使用柱状图就加载bar模块，按需加载
	            ], DrawEChart //异步加载的回调函数绘制图表  
			)
	        /**
	        * 根据数据渲染地图
	        */
	        function DrawEChart(ec) {
	            eCharts = ec;
	            // 基于准备好的dom，初始化echarts图表
	            myChart = eCharts.init(document.getElementById('container'));
	            var option = {
	                backgroundColor: '#1b1b1b',
	                color: ['gold', 'aqua', 'lime'],
	                title: {
	                    text: '民航主要航段运量',
	                    // idx_id between 3466 and 3732
	                    x: 'center',
	                    textStyle: {
	                        color: '#fff'
	                    }
	                },
	                legend: {
	                	show : false,
	                    orient: 'vertical',
	                    x: 'right',
	                    y: 'center',
	                    data: ['计费重量（吨）'],
	                    selectedMode: 'single',
	                    textStyle: {
	                        color: '#fff'
	                    }
	                },
	                tooltip: {
	                    trigger: 'item'
	                },
	                dataRange: {
	                    min:  parseInt(minax[0])+100,
	                    max: parseInt(minax[1])+Math.round(minax[1])*0.2,
	                    calculable: true,
	                    color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
	                    textStyle: {
	                        color: '#fff'
	                    }
	                },
	                series: [
	                    {
	                        name: '计费重量（吨）',
	                        type: 'map',
	                        roam: true,
	                        hoverable: false,
	                        mapType: 'china',
	                        scaleLimit: { min: 0.8, max: 1.5 },
	                        itemStyle: {
	                            normal: {
	                                label: {
	                                    show: true,
	                                    textStyle: {
	                                        color: '#fff'
	                                    }
	
	                                },
	                                borderColor: 'rgba(100,149,237,1)',
	                                borderWidth: 0.5,
	                                areaStyle: {
	                                    color: '#1b1b1b'
	                                }
	                            }
	                        },
	                        data: [],
	                        markLine: {
	                            smooth: true,
	                            effect: {
	                                show: true,
	                                scaleSize: 1,
	                                period: 30,
	                                color: '#fff',
	                                shadowBlur: 10
	                            },
	                            itemStyle: {
	                                normal: {
	                                    borderWidth: 1,
	                                    label: {
	                                        show: false
	                                    },
	                                    lineStyle: {
	                                        type: 'solid',
	                                        shadowBlur: 10
	                                    }
	                                }
	                            },
	                            data:data
	                        }, markPoint: {
	                            symbol: 'emptyCircle',
	                            symbolSize: function (v) {
	                                return 6;
	                            },
	                            effect: {
	                                show: true,
	                                shadowBlur: 0
	                            },
	                            itemStyle: {
	                                normal: {
	                                    label: { show: false }
	                                },
	                                emphasis: {
	                                    label: { position: 'top' }
	                                }
	                            },
	                            data: [
	
	                            ]
	                        },                       
	                        geoCoord: geoCoord
	                    }
	                ]
	            }
	            // 为echarts对象加载数据 
	            myChart.setOption(option);
	        }
}
})