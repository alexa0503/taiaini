

WXDevil=function() 
		{ 
			//this.mouseXY = new XyzData();
		}


WXDevil.prototype.constructor = WXDevil;









		 var me;
		//var mouseXY;
		

WXDevil.getMe=function() 
		{
			if (WXDevil.me == null) {
				WXDevil.me = new WXDevil(); 
			}
			return WXDevil.me;
			
		}
		/**
		 * 【功能】干掉微信内置浏览器的"露底"，它很影响页面效果，
		 * 【矛盾】和游戏触发事件冲突，
		 * 对展示产品展示类的影响不大，但是，对手工操作类的是有冲突的，
		 * 以‘微信打飞机’游戏为例，
		 * 向下拉的意思，是飞机退到屏幕的最下端，从而避开敌方的飞机，
		 * 但是，微信内置动作，解释成，不响应飞机倒退，同时整个游戏内容退到屏幕下面，
		 * 所以导致游戏失败， 
		 * 【注意】
		 * #添加位置
		 * 在页面加载完成之后----执行----初始化页面之前，
		 * #效果
		 * 执行这个代码之后，微信的内置浏览器不会出现"露底"，
		 * 而在没有执行这个代码之前，仍然会出现"露底"，
		 * 【参考】在网络看到对这个问题的一个介绍，他没有解决这个问题，但是很好地说明了这个问题，
		 * https://segmentfault.com/a/1190000003810312
		 * 微信里面防止下拉"露底"组件
		 * 网页由game.weixin.qq.com提供 
		 */
WXDevil.prototype.killWXdevil=function() 
		{
			
			//不知道为什么要做个应用？
			var ref = this;
			//如果是手机就认为不是ie浏览器，
			if(UDevice.getMe().isMobile)
			{
				document.addEventListener("touchmove", function(e ){ref.setXorYType22(e);});
				document.addEventListener("touchstart", function(e ){ref.setclientXorY22(e);});
				document.addEventListener("touchend", function(e ){ref.clearSthCCC(e);});
			}
			else
			{
				
				//这个还不知道什么意思你这是保留的，是保留意见，
				if(window.h5xo)
				{ 
					document.onmousemove = function(e ){ref.setXorY(e);};
					document.onmousedown = function(e ){ref.h5ep(e);};
					document.onmouseup = function(e ){ref.clearSthBBB(e);}; 	
				}
				else
				{
					document.onmousemove = function(e ){ref.setXorYType2(e);};
					document.onmousedown = function(e ){ref.setclientXorY(e);};
					document.onmouseup = function(e ){ref.clearSthAAA(e);};
				}
			}
		}
		/**
		 * 设置x或者设置Y，
		 * @param	e
		 */
WXDevil.prototype.setXorYType22=function(e)
		{
			//this.mouseXY.x = e.touches[0].clientX;
			//this.mouseXY.y = e.touches[0].clientY;
			this.isTouched = true;
			e.preventDefault(); 
		}
		/**
		 * 设置x或者设置Y，
		 * @param	e
		 */
WXDevil.prototype.setclientXorY22=function(e)
		{
			//this.mouseXY.x = e.touches[0].clientX;
			//this.mouseXY.y = e.touches[0].clientY;
			this.isTouched = true;
		}
		/**
		 * 设置x或者设置Y，
		 * @param	e
		 */
WXDevil.prototype.setclientXorY=function(e)
		{
			//this.mouseXY.x = e.clientX;
			//this.mouseXY.y = e.clientY;
			this.isTouched = true;
		}
		/**
		 * 设置x或者设置Y，
		 * @param	e
		 */
WXDevil.prototype.setXorYType33=function(e)
		{
			//this.mouseXY.x = e.pageX;
			//this.mouseXY.y = e.pageY;
			this.isTouched = true;
		}
		/**
		 * 清空什么变量，
		 * @param	e
		 */
WXDevil.prototype.clearSthCCC=function(e)
		{
			//一个未知的值不知道是干嘛用的，
			this.isTouched = false;
		}
		/**
		 * 清空什么变量，
		 * @param	e
		 */
WXDevil.prototype.clearSthAAA=function(e)
		{
			//一个未知的值不知道是干嘛用的，
			this.isTouched = false;
		}
		/**
		 * 清空什么变量，
		 * @param	e
		 */
WXDevil.prototype.clearSthBBB=function(e)
		{
			//一个未知的值不知道是干嘛用的，
			this.isTouched = false;
		}
		/**
		 * 设置x或者设置外，
		 * @param	e
		 */
WXDevil.prototype.setXorYType2=function(e)
		{
			//this.mouseXY.x = e.clientX;
			//this.mouseXY.y = e.clientY;
		}
		/**
		 * 设置x或者设置外，
		 * @param	e
		 */
WXDevil.prototype.setXorY=function(e)
		{
			//this.mouseXY.x = e.pageX;
			//this.mouseXY.y = e.pageY;
		};