$(function(){
	
	function myChartData23callBack(msg){
		 
		var map={};
		var data={};
		for(var i=0;i<msg.length;++i){
			for(var j=0;j<msg[i]["technoloMonths"].length;++j){
				var years=msg[i]["technoloMonths"][j]["idx_month"].split("-");
				 if(years[0]>2010){
					if(map[years[0]]==undefined)
						map[years[0]]=0;
					map[years[0]]+=Math.round(msg[i]["technoloMonths"][j]["idx_value"]);
				}
				 
			}
			data[msg[i]["idx_2"]]=map;
		}
 
		myChartData23(data);
	}
	ajaxUnitFirst("data_unitsql.action", 
			{sql:" where  idx_id between 2804 and 2827"}, 
			myChartData23callBack);
function myChartData23(map){
	 
	var myChart = echarts.init(document.getElementById('container'));
	var years=function(){
		var arr=[];
		var cnt=0;
		for(var attr in map["上海"])
			arr[cnt++]=attr;
		return arr;
	}();
	
	var idx=function(){
		var arr=[];
		var i=0;
		for(var attr in map) 
			arr[i++]=attr;
		 
		return arr;
	}();
 
	var cnt=0;
	option = {
	    timeline:{
	        data:years,
	        label : {
	            formatter : function(s) {
	                return s.slice(0, 4);
	            }
	        },
	        autoPlay : true,
	        playInterval : 2000
	    },
	    options:[
	        {
	            title : {
	                'text':years[cnt]+'货运量分地区',
	                   'subtext':'(吨)',
	                x : 'center',
	                y : 'top'
	            },
	            tooltip : {'trigger':'item'},
	            toolbox : {
	                'show':true, 
	                'feature':{
	                    'mark':{'show':true},
	                    'dataView':{'show':true,'readOnly':false},
	                    'restore':{'show':true},
	                    'saveAsImage':{'show':true}
	                }
	            },
	            dataRange: {
	                min: 100000,
	                max : 3000000,
	                text:['高','低'],           // 文本，默认为数值文本
	                calculable : true,
	                x: 'left',
	                color: ['orangered','yellow','lightskyblue']
	            },
	            series : [
	                {
	                    'name':years[cnt]+'各地公路货运量',
	                    'type':'map',
	                    'data': 
	                    	function(){
	                    	var array=[];
	                    	for(var i=0;i<idx.length;++i){
	                    		 
	                    		array[i]={
	    	             				name:idx[i],
	    	             				value: map[idx[i]][years[cnt]]
	    	             			}
	                    	}
	                    	cnt++;
	                    	return array;
	                    }()
	                }
	            ]
	        },
	        
	         {
	            title : {'text':years[cnt]+'各地水路货运量'},
	            series : [
	                {'data': function(){
                    	var array=[];
                    	for(var i=0;i<idx.length;++i){
                    		 
                    		array[i]={
    	             				name:idx[i],
    	             				value: map[idx[i]][years[cnt]]
    	             			}
                    	}
                    	cnt++;
                    	return array;
                    }()}
	            ]
	        } ,
	        {
	            title : {'text':years[cnt]+'各地水路货运量'},
	            series : [
	                {'data': function(){
                    	var array=[];
                    	for(var i=0;i<idx.length;++i){
                    		 
                    		array[i]={
    	             				name:idx[i],
    	             				value: map[idx[i]][years[cnt]]
    	             			}
                    	}
                    	cnt++;
                    	return array;
                    }()}
	            ]
	        } ,
	        {
	            title : {'text':years[cnt]+'各地水路货运量'},
	            series : [
	                {'data': function(){
                    	var array=[];
                    	for(var i=0;i<idx.length;++i){
                    		 
                    		array[i]={
    	             				name:idx[i],
    	             				value: map[idx[i]][years[cnt]]
    	             			}
                    	}
                    	cnt++;
                    	return array;
                    }()}
	            ]
	        } ,
	        {
	            title : {'text':years[cnt]+'各地水路货运量'},
	            series : [
	                {'data': function(){
                    	var array=[];
                    	for(var i=0;i<idx.length;++i){
                    		 
                    		array[i]={
    	             				name:idx[i],
    	             				value: map[idx[i]][years[cnt]]
    	             			}
                    	}
                    	cnt++;
                    	return array;
                    }()}
	            ]
	        } ,
	        {
	            title : {'text':years[cnt]+'各地水路货运量'},
	            series : [
	                {'data': function(){
                    	var array=[];
                    	for(var i=0;i<idx.length;++i){
                    		 
                    		array[i]={
    	             				name:idx[i],
    	             				value: map[idx[i]][years[cnt]]
    	             			}
                    	}
                    	cnt++;
                    	return array;
                    }()}
	            ]
	        } 
	    ]
	}
    myChart.setOption(option);
}
}) 
