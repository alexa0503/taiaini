/**
 * ...
 * @author wj
 */

function WJstart() {
	window.pages = ['home','GZ','YWL','CYDD','share']
	all = document.getElementsByTagName('div')
	console.log(all.length)
	didnotInitGZ=false
	//hidePage()
	showPage(0)

	//活动规则
	WJclick('home_HuoDongGuiZe',function(){
		showPageGZ()
	})
	WJclick('GZ_btnX',function(){
		hidePage('GZ')
	})
	//首页-->我要分享
	WJclick('home_WoYaoFenXiang',function(){
		showPage('share')
	})
	WJclick('share_msk',function(){
		hidePage('share')
	})
	//关闭YWL
	WJclick('YWL_btnX',function(){
		hidePage('YWL')
	})
	//差一点点-->XXX
	WJclick('CYDD_btnX',function(){
		hidePage('CYDD')
	})
	//差一点点-->继续抽奖
	WJclick('CYDD_HuoDongGuiZe',function(){
		hidePage('CYDD')
	})
	//差一点点-->我要分享
	WJclick('CYDD_WoYaoFenXiang',function(){
		hidePage('CYDD')
		showPage('share')
	})
	//用完了-->XXX
	WJclick('YWL_btnX',function(){
		hidePage('YWL')
	})
	//用完了-->XXX
	WJclick('YWL_HuoDongGuiZe',function(){
		hidePage('YWL')
		showPage('share')
	})
	//表单-->XXX
	WJclick('FORM_btnX',function(){
		hidePage('FORM')
	})
	//表单-->提交按钮
	WJclick('FORM_submit',function(){
		//hidePage('FORM')
		doSubmit() //测试提交表单
	})



	window.clickCount=0
	//开始
	WJhide("home_DJKS2_SS")
	WJhide("home_XuanKuang")
	WJclick('home_DianJiKaiShi1',function(){
		//showPage(2)
		WJshow('home_DJKS2_SS')
		window.clickCount++;

		//单元测试
		//启动
		console.log('UnitTest','START')
		//oldCount=window.UnitTest_TargetCount

		//setTimeout(function(){
		//关闭，到目标值
		//window.UnitTest_TargetCount=window.UnitTest_TargetCount%7
		//console.log("UnitTest--TargetCount", window.UnitTest_TargetCount);
		//UnitTest_TargetCount = 7

		//停在哪一格，常量0-7,其中2,4,7是中奖

		//Ge9start();
		//newArr = Ge9StopAt(2);

		$.ajax('/lottery', {
            type: 'post',
            dataType: 'json',
            success: function(json) {
				if(json.ret == 1001){
					showPage("YWL");
					return;
				}
				else if (json.ret==0 && json.prize == 1){//中奖
					tarArr=[2,4,7]
				}else{
					tarArr=[0,1,3,5,6] //不中
				}
				Ge9start();
				targetID=tarArr[parseInt(Math.random()*tarArr.length)]
				//alert(targetID);
				newArr = Ge9StopAt(targetID)
				wait4Nxt=true

            },
            error: function() {
            }
        })


		//newArr = Ge9StopAt(window.UnitTest_TargetCount)
		//window.UnitTest_TargetCount++

		//},2000);


		//doMSG1()
		//doMSG2()
	})

	window.UnitTest_TargetCount=0

	//mx = 8
	//j = 0
	//while(j>-100){
		//cc = (mx+j%mx-1)
		////cc = (j%mx-1)
		//console.log( cc,j)
		//j--
	//}
	Ge9prepare();

	//input
var ui1 = WJget("FORM_input_name");
ui1.innerHTML +='<input    maxlength="13" autocomplete="off"  id="wjname" class="inputS" style="position:absolute;width: 450px;font-size:2rem; height: 63px; left:10px; top: -15px;"></input>'

var ui2 = WJget("FORM_input_mobile");
ui2.innerHTML +='<input   type="tel"  maxlength="11" autocomplete="off"  id="wjmobile" class="inputS" style="position:absolute;width: 450px;font-size:2rem; height: 63px; left:10px; top:-15px;"></input>'

	//showPage("GZ")
};

function showPageGZ(){
	showPage('GZ')
	if(!didnotInitGZ){
		didnotInitGZ=true
		prepareGZ()
	}
}
function doSubmit()
{
	var wjname = document.getElementById("wjname").value;
	var wjmobile = document.getElementById("wjmobile").value;
	//alert([wjname,wjmobile].join("\n"))

	if(wjname==""){
		alert("请填写个人姓名");
		return;
	}
	else if(wjmobile==""){
		alert("请填写联系电话");
		return;
	}
	else if(wjmobile.length<11){
		alert("手机号格式错误，不足11位");
		return;
	}
	else{
		$.ajax('/info', {
			data: {name:wjname,mobile:wjmobile},
            type: 'post',
            dataType: 'json',
            success: function(json) {
				if(json.ret == 0){
					alert('提交成功~');
					clearInpit();
				}
				else{
					alert(json.msg);
				}
            },
            error: function() {
            }
        })
	}

	//提交
	//...


	//清空输入框
	//clearInpit()
}

function clearInpit(){
	document.getElementById("wjname").value="";
	document.getElementById("wjmobile").value="";
}
function prepareGZ(){
	var myScroll = new iScroll('GZ_WenZi', { scrollbarClass: 'myScrollbar' });	//定义颜色
}

function doMSG1()
{
	//弹出提示框1--差一点点
	showPage('CYDD')
}
function doMSG2()
{
	//弹出提示框2--用完了
	showPage('YWL')
}
function Ge9prepare(){
	geBasic=30//达标步数
	geCount=0//计数
	geID=0//当前值
	window.wait4Nxt=false;
	oldCount = geCount
	order = [1,2,3,6,9,8,7,4]
	spdDir=-1 //步速方向，负数是快，正数是慢
	spdArr=[60,70,80,90,100,120,150,200,250,300,350,400]//定义步速
	spdCount=spdArr.length-1//步速位置
	window.geArrORI = doOrder(WJgetGroup("home_ge"),order)
	window.geArr = window.geArrORI.concat()//保留副本
}
function Ge9start(){
	geCount = oldCount
	spdDir=-1 //步速方向，负数是快，正数是慢
	window.geArr = window.geArrORI.concat()//保留副本
	console.log(geCount)
	doLoopStart();
}
function Ge9StopAt(tid){
	arrOUT=[]
	//idS=[]
	mx = window.geArrORI.length
	slen = spdArr.length
	//slen =100
	for(var i=0;i<slen;i++)
	{
		//if(j>window.geArrORI.length){
			//div = window.geArrORI[j%mx]
			//id =j%mx
		//}else
		if(tid<0){
			cc = (mx+(tid+1)%mx-1)
			div = window.geArrORI[cc]
			//id = cc
		}else{
			div = window.geArrORI[tid]
			//id = tid
		}
		//idS.unshift(id)
		arrOUT.unshift(div);
		tid--
	}
	//console.log('idS',idS)
	return arrOUT
}
function doLoopStart(){
	doNxtStep()
}

function doNxtStep(){

	geID = geCount%window.geArr.length
	geCount++
	//if(geCount>=window.geArr.length)geCount=0
	if(wait4Nxt==true){
		//判断切入点
		if(window.geArr[geID] == newArr[0] && geCount>geBasic){
			console.log('ENTER_POINT',newArr[0]['id'],window.geArr[geID]['id']);
			spdDir=1
			wait4Nxt= false
			window.geArr = newArr
			geID=0
		}
	}

	if(spdDir==1){
		now = window.geArr.shift()
	}else{
		now = window.geArr[geID]
	}

	xx=now.style.left
	yy=now.style.top
	WJget("home_XuanKuang").style.left=xx
	WJget("home_XuanKuang").style.top=yy
	WJget("home_XuanKuang").style.display="block"
	if(spdDir==-1){
		spd = (spdCount>0)?spdArr[spdCount+=spdDir]:spdArr[spdCount]
	}else{
		spd = (spdCount+1<spdArr.length)?spdArr[spdCount+=spdDir]:spdArr[spdCount]
	}
	//console.log(spd)
	setTimeout(function(){
		if(window.geArr.length==0){

			for(var i =0 ;i<window.geArrORI.length;i++){
				if(window.geArrORI[i]==now){
					geCount = i;
					console.log("geCount",geCount);
					break;
				}
			}

			if(geCount==2 || geCount==4 ||geCount==7){
				//跳转页面
				//表单
				showPage("FORM")//测试，显示表单
			}else{
				//
				if(window.clickCount==1){
					showPage("CYDD")//测试，失败1次
				}
				if(window.clickCount==2){
					showPage("YWL")//测试，失败2次
				}
			}
			oldCount = geCount
			WJhide('home_DJKS2_SS')
			return
		}
		doNxtStep();
	},spd);
}
function WJget(id)
{
	return document.getElementById(id)
}
function doOrder(arr){
	//console.log(arrOUT)
	arr2=[]
	for(var i=0;i<arr.length;i++){
		arr2.push("home_ge"+order[i])
	}
	//console.log(arr2)
	arrOUT=[]
	for (var j =0 ;j<arr2.length;j++){
		for(var i=0;i<arr.length;i++){
			if(arr[i]['id']==arr2[j])
			{
				arrOUT.push(arr[i])
				break;
			}
		}
	}
	//console.log(arrOUT)
	return arrOUT
}
function WJgetGroup(pageAlias){
	arrOUT=[]
	for (var i=0;i<all.length;i++){
		div = all[i]
		id = all[i]['id']
		if(id.indexOf(pageAlias)==0)arrOUT.push(div)
	}
	return arrOUT
}
function WJclick(id,fn){
	btn = document.getElementById(id)
	btn.addEventListener("click",function(){
		fn();
	});
}
function WJhide(id){
	div = document.getElementById(id)
	div.style.display='none'
}
function WJshow(id){
	div = document.getElementById(id)
	div.style.display='block'
}
function hidePage(PageID){
	if(PageID==undefined){
		for (var i=0;i<all.length;i++){
			div = all[i]
			div.style.display='none'
		}
	}else{
		var pageAlias = (parseInt(PageID)==PageID)? window.pages[PageID]:PageID
		for (var i=0;i<all.length;i++){
			div = all[i]
			id = all[i]['id']
			if(id.indexOf(pageAlias)==0){
				//console.log( 'yes',id)
				div.style.display='none'
			}
		}
	}
}
function showPage(PageID){
	var pageAlias = (parseInt(PageID)==PageID)? window.pages[PageID]:PageID

	for (var i=0;i<all.length;i++){
		div = all[i]
		id = all[i]['id']
		if(id.indexOf(pageAlias)==0){
			//console.log( 'yes',id)
			div.style.display='block'
		}
		//else{
			//div.style.display='none'
		//}
	}
}
