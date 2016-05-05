$(function(){
	
	function myChartData5callBack(msg){
		 
		var map={};
		for(var i=0;i<msg.length;++i){
			if(msg[i]["idx_3"]!=undefined){
				var mapp={};
				for(var j=0;j<msg[i]["technoloYears"].length;++j){
					mapp[msg[i]["technoloYears"][j]["idx_year"]]=msg[i]["technoloYears"][j]["idx_value"];
				}
				 
				map[msg[i]["idx_3"]]=mapp;
			}
		}
		 
	 
		myChartData5(map);
	}
	ajaxUnitFirst("data_unitsql.action", 
			{sql:"  t inner join fetch t.technoloYears y  where idx_1='物流业' and idx_2='物流用主要设施' " +
					"and idx_3 in('铁路里程','公路里程','内河航道里程','民用航空航线里程','输油(气)管道里程') " +
					"  and idx_7='物流大数据' and y.idx_year between 2010 and 2015"}, 
			myChartData5callBack);
function myChartData5(map){
	var idx=['铁路里程','公路里程','内河航道里程','民用航空航线里程','输油(气)管道里程'];
	var years=function(){
    	var arr=[];
    	var i=0;
    	for(var attr in map['公路里程'])
    		arr[i++]=attr;
    	return arr;
    }
	var cnt=1;
	var cntarray=years();
	 
	option = {
	    timeline : {
	        data :cntarray
	        	,
	        label : {
	            formatter : function(s) {
	                return s.slice(0, 7);
	            }
	        }
	    },
	    options : [
	        {
	            title : {
	                text: '物流用主要设施里程',
	                
	                subtext: '万公里',
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
	                	
	                    name:years()[0],
	                    type:'pie',
	                    center: ['50%', '45%'],
	                    radius: '50%',
	                    data:
	                    	function(){
	                    	var mapp=[];
	                    	for(var i=0;i<idx.length;++i){
	                    		mapp[i]={value: map[idx[i]][cntarray[0]],  name:idx[i]};
	                    	}
	                    	return mapp;
	                    }()
	                     
	                }
	            ]
	        },
	           
	    
	          {
	            series : [
	                {
	                    name:cntarray[cnt],
	                    type:'pie',
	                    data:function(){
	                    	var mapp=[];
	                    	for(var i=0;i<idx.length;++i){
	                    		mapp[i]={value: map[idx[i]][cntarray[cnt]],  name:idx[i]};
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
	  	                    name:cntarray[cnt],
	  	                    type:'pie',
	  	                    data:function(){
	  	                    	var mapp=[];
	  	                    	for(var i=0;i<idx.length;++i){
	  	                    		mapp[i]={value: map[idx[i]][cntarray[cnt]],  name:idx[i]};
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
	  	                    name:cntarray[cnt],
	  	                    type:'pie',
	  	                    data:function(){
	  	                    	var mapp=[];
	  	                    	for(var i=0;i<idx.length;++i){
	  	                    		mapp[i]={value: map[idx[i]][cntarray[cnt]],  name:idx[i]};
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
	  	                    name:cntarray[cnt],
	  	                    type:'pie',
	  	                    data:function(){
	  	                    	var mapp=[];
	  	                    	for(var i=0;i<idx.length;++i){
	  	                    		mapp[i]={value: map[idx[i]][cntarray[cnt]],  name:idx[i]};
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
		  	                    name:cntarray[cnt],
		  	                    type:'pie',
		  	                    data:function(){
		  	                    	var mapp=[];
		  	                    	for(var i=0;i<idx.length;++i){
		  	                    		mapp[i]={value: map[idx[i]][cntarray[cnt]],  name:idx[i]};
		  	                    	}
		  	                    	cnt++;
		  	                    	return mapp;
		  	                    }()
		  	                }
		  	            ]
		        }, 
	        
	    ]
	};

myChart2 = echarts.init(document.getElementById('container2'));
                    
      	
myChart2.setOption(option);
}	        
})
