angular.module("app").controller("cardChartCtrl1",cardChartCtrl1).controller("cardChartCtrl2",cardChartCtrl2).controller("cardChartCtrl3",cardChartCtrl3).controller("cardChartCtrl4",cardChartCtrl4).controller("trafficDemoCtrl",trafficDemoCtrl).controller("socialBoxCtrl",socialBoxCtrl).controller("sparklineChartCtrl",sparklineChartCtrl).controller("barChartCtrl",barChartCtrl).controller("horizontalBarsCtrl",horizontalBarsCtrl).controller("horizontalBarsType2Ctrl",horizontalBarsType2Ctrl).controller("usersTableCtrl",usersTableCtrl);function convertHex(a,t){return a=a.replace("#",""),r=parseInt(a.substring(0,2),16),g=parseInt(a.substring(2,4),16),b=parseInt(a.substring(4,6),16),result="rgba("+r+","+g+","+b+","+t/100+")",result}cardChartCtrl1.$inject=["$scope"];function cardChartCtrl1(a){a.labels=["January","February","March","April","May","June","July"],a.data=[[65,59,84,84,51,55,40]],a.colors=[{backgroundColor:brandPrimary,borderColor:"rgba(255,255,255,.55)"}],a.options={maintainAspectRatio:!1,scales:{xAxes:[{gridLines:{color:"transparent",zeroLineColor:"transparent"},ticks:{fontSize:2,fontColor:"transparent"}}],yAxes:[{display:!1,ticks:{display:!1,min:Math.min.apply(Math,a.data[0])-5,max:Math.max.apply(Math,a.data[0])+5}}]},elements:{line:{borderWidth:1},point:{radius:4,hitRadius:10,hoverRadius:4}}}}cardChartCtrl2.$inject=["$scope"];function cardChartCtrl2(a){a.labels=["January","February","March","April","May","June","July"],a.data=[[1,18,9,17,34,22,11]],a.colors=[{backgroundColor:brandInfo,borderColor:"rgba(255,255,255,.55)"}],a.options={maintainAspectRatio:!1,scales:{xAxes:[{gridLines:{color:"transparent",zeroLineColor:"transparent"},ticks:{fontSize:2,fontColor:"transparent"}}],yAxes:[{display:!1,ticks:{display:!1,min:Math.min.apply(Math,a.data[0])-5,max:Math.max.apply(Math,a.data[0])+5}}]},elements:{line:{tension:1e-5,borderWidth:1},point:{radius:4,hitRadius:10,hoverRadius:4}}}}cardChartCtrl3.$inject=["$scope"];function cardChartCtrl3(a){a.labels=["January","February","March","April","May","June","July"],a.data=[[78,81,80,45,34,12,40]],a.data4=[[35,23,56,22,97,23,64]],a.colors=[{backgroundColor:"rgba(255,255,255,.2)",borderColor:"rgba(255,255,255,.55)"}],a.options={maintainAspectRatio:!1,scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]},elements:{line:{borderWidth:2},point:{radius:0,hitRadius:10,hoverRadius:4}}}}function random(a,r){return Math.floor(Math.random()*(r-a+1)+a)}cardChartCtrl4.$inject=["$scope"];function cardChartCtrl4(a){for(var r=[],t=[],e=2e3;e<=2016;e++)r.push(e),t.push(random(40,100));a.labels=r,a.data=[t],a.colors=[{backgroundColor:"rgba(255,255,255,.3)",borderWidth:0}],a.options={maintainAspectRatio:!1,scales:{xAxes:[{display:!1,barPercentage:.6}],yAxes:[{display:!1}]}}}trafficDemoCtrl.$inject=["$scope"];function trafficDemoCtrl(a){function r(a,r){return Math.floor(Math.random()*(r-a+1)+a)}for(var t=[],e=[],n=[],o=0;o<=27;o++)t.push(r(50,200)),e.push(r(80,100)),n.push(65);a.labels=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Thursday","Wednesday","Thursday","Friday","Saturday","Sunday"],a.series=["Current","Previous","BEP"],a.data=[t,e,n],a.colors=[{backgroundColor:convertHex(brandInfo,10),borderColor:brandInfo,pointHoverBackgroundColor:"#fff"},{backgroundColor:"transparent",borderColor:brandSuccess,pointHoverBackgroundColor:"#fff"},{backgroundColor:"transparent",borderColor:brandDanger,pointHoverBackgroundColor:"#fff",borderWidth:1,borderDash:[8,5]}],a.options={responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{gridLines:{drawOnChartArea:!1},ticks:{callback:function(a){return a.charAt(0)}}}],yAxes:[{ticks:{beginAtZero:!0,maxTicksLimit:5,stepSize:Math.ceil(50),max:250}}]},elements:{point:{radius:0,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}}}}dateRangeCtrl.$inject=["$scope"];function dateRangeCtrl(a){a.date={startDate:moment().subtract(5,"days"),endDate:moment()},a.opts={drops:"down",opens:"left",ranges:{Today:[moment(),moment()],Yesterday:[moment().subtract(1,"days"),moment().subtract(1,"days")],"Last 7 days":[moment().subtract(7,"days"),moment()],"Last 30 days":[moment().subtract(30,"days"),moment()],"This month":[moment().startOf("month"),moment().endOf("month")]}},a.$watch("date",function(a){},!1)}socialBoxCtrl.$inject=["$scope"];function socialBoxCtrl(a){a.labels=["January","February","March","April","May","June","July"],a.data1=[[65,59,84,84,51,55,40]],a.data2=[[1,13,9,17,34,41,38]],a.data3=[[78,81,80,45,34,12,40]],a.data4=[[35,23,56,22,97,23,64]],a.colors=[{backgroundColor:"rgba(255,255,255,.1)",borderColor:"rgba(255,255,255,.55)",pointHoverBackgroundColor:"#fff"}],a.options={responsive:!0,maintainAspectRatio:!1,scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]},elements:{point:{radius:0,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}}}}sparklineChartCtrl.$inject=["$scope"];function sparklineChartCtrl(a){a.labels=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],a.data1=[[65,59,84,84,51,55,40]],a.data2=[[1,13,9,17,34,41,38]],a.data3=[[78,81,80,45,34,12,40]],a.data4=[[35,23,56,22,97,23,64]],a.default=[{backgroundColor:"transparent",borderColor:"#d1d4d7"}],a.primary=[{backgroundColor:"transparent",borderColor:brandPrimary}],a.info=[{backgroundColor:"transparent",borderColor:brandInfo}],a.danger=[{backgroundColor:"transparent",borderColor:brandDanger}],a.warning=[{backgroundColor:"transparent",borderColor:brandWarning}],a.success=[{backgroundColor:"transparent",borderColor:brandSuccess}],a.options={scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]},elements:{point:{radius:0,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}}}}horizontalBarsCtrl.$inject=["$scope"];function horizontalBarsCtrl(a){a.data=[{day:"Monday",new:34,recurring:78},{day:"Tuesday",new:56,recurring:94},{day:"Wednesday",new:12,recurring:67},{day:"Thursday",new:43,recurring:91},{day:"Friday",new:22,recurring:73},{day:"Saturday",new:53,recurring:82},{day:"Sunday",new:9,recurring:69}]}horizontalBarsType2Ctrl.$inject=["$scope"];function horizontalBarsType2Ctrl(a){a.gender=[{title:"Male",icon:"icon-user",value:43},{title:"Female",icon:"icon-user-female",value:37}],a.source=[{title:"Organic Search",icon:"icon-globe",value:191235,percent:56},{title:"Facebook",icon:"icon-social-facebook",value:51223,percent:15},{title:"Twitter",icon:"icon-social-twitter",value:37564,percent:11},{title:"LinkedIn",icon:"icon-social-linkedin",value:27319,percent:8}]}usersTableCtrl.$inject=["$scope","$timeout"];function usersTableCtrl(a,r){a.users=[{avatar:"1.jpg",status:"active",name:"Yiorgos Avraamu",new:!0,registered:"Jan 1, 2015",country:"USA",flag:"USA.png",usage:"50",period:"Jun 11, 2015 - Jul 10, 2015",payment:"mastercard",activity:"10 sec ago",satisfaction:"48"},{avatar:"2.jpg",status:"busy",name:"Avram Tarasios",new:!1,registered:"Jan 1, 2015",country:"Brazil",flag:"Brazil.png",usage:"10",period:"Jun 11, 2015 - Jul 10, 2015",payment:"visa",activity:"5 minutes ago",satisfaction:"61"},{avatar:"3.jpg",status:"away",name:"Quintin Ed",new:!0,registered:"Jan 1, 2015",country:"India",flag:"India.png",usage:"74",period:"Jun 11, 2015 - Jul 10, 2015",payment:"stripe",activity:"1 hour ago",satisfaction:"33"},{avatar:"4.jpg",status:"offline",name:"Enéas Kwadwo",new:!0,registered:"Jan 1, 2015",country:"France",flag:"France.png",usage:"98",period:"Jun 11, 2015 - Jul 10, 2015",payment:"paypal",activity:"Last month",satisfaction:"23"},{avatar:"5.jpg",status:"active",name:"Agapetus Tadeáš",new:!0,registered:"Jan 1, 2015",country:"Spain",flag:"Spain.png",usage:"22",period:"Jun 11, 2015 - Jul 10, 2015",payment:"google",activity:"Last week",satisfaction:"78"},{avatar:"6.jpg",status:"busy",name:"Friderik Dávid",new:!0,registered:"Jan 1, 2015",country:"Poland",flag:"Poland.png",usage:"43",period:"Jun 11, 2015 - Jul 10, 2015",payment:"amex",activity:"Yesterday",satisfaction:"11"}]}clientsTableCtrl.$inject=["$scope","$timeout"];function clientsTableCtrl(a,r){a.users=[{avatar:"1.jpg",status:"active",name:"Yiorgos Avraamu",registered:"Jan 1, 2015",activity:"10 sec ago",transactions:189,comments:72},{avatar:"2.jpg",status:"busy",name:"Avram Tarasios",registered:"Jan 1, 2015",activity:"5 minutes ago",transactions:156,comments:76},{avatar:"3.jpg",status:"away",name:"Quintin Ed",registered:"Jan 1, 2015",activity:"1 hour ago",transactions:189,comments:72},{avatar:"4.jpg",status:"offline",name:"Enéas Kwadwo",registered:"Jan 1, 2015",activity:"Last month",transactions:189,comments:72},{avatar:"5.jpg",status:"active",name:"Agapetus Tadeáš",registered:"Jan 1, 2015",activity:"Last week",transactions:189,comments:72},{avatar:"6.jpg",status:"busy",name:"Friderik Dávid",registered:"Jan 1, 2015",activity:"Yesterday",transactions:189,comments:72}]}function random(a,r){return Math.floor(Math.random()*(r-a+1)+a)}barChartCtrl.$inject=["$scope"];function barChartCtrl(a){for(var r=[],t=[],e=[],n=[],o=0;o<=16;o++)r.push("1"),t.push(random(40,100)),e.push(random(20,100)),n.push(random(60,100));a.labels=r,a.data=[t],a.data1=[e],a.data2=[n],a.options={showScale:!1,scaleFontSize:0,scaleShowGridLines:!1,barStrokeWidth:0,barBackground:"rgba(221, 224, 229, 1)"},a.colors=[{backgroundColor:brandInfo,borderColor:"rgba(0,0,0,1)",highlightFill:"#818a91",pointborderColor:"#000"}]}