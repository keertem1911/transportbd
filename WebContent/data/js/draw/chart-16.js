$(function(){
	function myChartData16callBack(msg){
		 
		var map={};
		for(var i=0;i<msg.length;++i){
			if(msg[i]["idx_1"]!=undefined){
				var mapp={};
				for(var j=0;j<msg[i]["technoloYears"].length;++j){
					if(msg[i]["technoloYears"][j]["idx_year"]>2009)
					mapp[msg[i]["technoloYears"][j]["idx_year"]]=msg[i]["technoloYears"][j]["idx_value"];
				}
				map[msg[i]["idx_2"]]=mapp;
			}
		}
	 
		myChartData16(map);
	}
	ajaxUnitFirst("data_unitsql.action", 
			{sql:" where idx_1='公路货运量'	and  idx_id between 3233 and 3263 and idx_7='物流大数据'"}, 
			myChartData16callBack);
function myChartData16(map){
	 
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
	                'text':'货运量分地区',
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
	                min: 0,
	                max : 300000,
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
	            title : {'text':years[cnt]+'各地公路货运量'},
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
	        },
	        {
	            title : {'text':years[cnt]+'各地公路货运量'},
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
	        },
	        {
	            title : {'text':years[cnt]+'各地公路货运量'},
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
	        },
	        {
	            title : {'text':years[cnt]+'各地公路货运量'},
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
