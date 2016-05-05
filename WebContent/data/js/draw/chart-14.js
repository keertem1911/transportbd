$(function(){
		function myChartData14callBack(msg){
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
		 
			myChartData14(map);
		}
		ajaxUnitFirst("data_unitsql.action", 
				{sql:"  t inner join fetch t.technoloYears y  where idx_1='铁路货运量' " +
						"and idx_2 in" +
						"('京哈线','京广线','京沪线','京九线','京包线'," +
						"'滨洲线','滨绥线','大秦线','石太线','石德线'," +
						"'北同蒲线','南同蒲线','包兰线','新石线','太焦线'," +
						"'焦柳线','胶济线','陇海线','沪昆线','宝成线'," +
						"'南昆线','成昆线','兰新线','青藏线') " +
						"  and idx_7='物流大数据' and y.idx_year between 2013 and 2015"}, 
				myChartData14callBack);
	function myChartData14(map){
	var myChart = echarts.init(document.getElementById('container'));
    var years=function(){
    	var arr=[];
    	var i=0;
    	for(var attr in map['京哈线'])
    	arr[i++]=attr;
    		return arr;
    }();
    var idx=['京哈线','京广线','京沪线','京九线','京包线', 
				 '滨洲线','滨绥线','大秦线','石太线','石德线', 
				 '北同蒲线','南同蒲线','包兰线','新石线','太焦线', 
				 '焦柳线','胶济线','陇海线','沪昆线','宝成线', 
				 '南昆线','成昆线','兰新线','青藏线'];
 		var myChart = echarts.init(document.getElementById('container'));
		option = {
		    title : {
		        text: '铁路货运量-分干线（年）',
		        subtext: '万吨',
		        x : 'center',
                Y : 'top',
                textAlign : 'center'
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data: 
		        function(){
		        	var arr=[];
		        	for(var i=0;i<years.length;++i)
		        		arr[i]=years[i]+'年货运量';
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
		            magicType : {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            data : idx
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series :
		    	function(){
		    	var mapp=[];
		    	for(var i=0;i<years.length;++i){
		    		mapp[i]= {
				            name:years[i]+'年货运量',
				            type:'bar',
				            data:
				            	function(){
				            	var array=[];
				            	for(var j=0;j<idx.length;++j){
				            		array[j]=map[idx[j]][years[i]];
				            	}
				            	return array;
				            }()
				            }
		    	}
		    	return mapp;
		    }()
		};
	    myChart.setOption(option);
	}  
})  
