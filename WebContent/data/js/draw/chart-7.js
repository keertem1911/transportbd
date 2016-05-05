$(function(){
	function myChartData7callBack(msg){
		var map={};
	 
		for(var i=0;i<msg.length;++i){
			if(msg[i]["idx_2"]!=undefined){
				var mapp={};
				for(var j=0;j<msg[i]["technoloYears"].length;++j){
					mapp[msg[i]["technoloYears"][j]["idx_year"]]=msg[i]["technoloYears"][j]["idx_value"];
				}
				 
				map[msg[i]["idx_2"]]=mapp;
			}
		}
	 
		myChartData7(map);
	}
	ajaxUnitFirst("data_unitsql.action", 
			{sql:"  t inner join fetch t.technoloYears y " +
					" where idx_1='冷链流通率' and " +
					"idx_2 in('果蔬','肉类','水产品') and idx_7='物流大数据'" +
					" and y.idx_year = 2014"}, 
			myChartData7callBack);
function myChartData7(map){
	var myChart = echarts.init(document.getElementById('container2'));
	var yeararray=function(){
		var arr=[];
		 var cnt=0;
		for(var attr in  map['果蔬']){
			arr[cnt++]=attr;
		}
		return arr;
	}() 
	var idx=['果蔬','肉类','水产品'];
	option = {
	    title : {
	        text: yeararray[yeararray.length-1]+'冷链流通率',
	        
	        subtext: '',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient : 'vertical',
	        x : 'left',
	        data:
	        	function(){
	        	var arr=[];
	        	for(var i=0;i<idx.length;++i){
	        		arr[i]='冷链流通率-'+idx[i];
	        	}
	        	return arr;
	        }()
	        	//['冷链流通率-果蔬','冷链流通率-肉类','冷链流通率-水产品']
	    },
	    calculable : true,
	    series : [
	        {
	            name:yeararray[yeararray.length-1]+'年物流管理成本占比',
	            type:'pie',
	            radius : '55%',
	            center: ['50%', 225],
	            data:
	            	function(){
                	var mapp=[];
                	for(var i=0;i<idx.length;++i){
                		mapp[i]={value: map[idx[i]][yeararray[yeararray.length-1]],  name:idx[i]};
                	}
                	 
                	return mapp;
                }()
	          
	        }
	    ]
	};
    myChart.setOption(option);
}
})
