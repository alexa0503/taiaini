UDevice=function() 
		{
			
		}


UDevice.prototype.constructor = UDevice;








		var HasPerformance;
		var DevicePixelRatio;
		var ImgRatio;
		//var screenSize;
		var BrowserID;
		var AppleID;
		var PlatformID;
		var isApple;
		var isMobile;
		var LoopInterval;
		
		var me;
		

UDevice.getMe=function() 
		{
			if (UDevice.me == null) {
				UDevice.me = new UDevice();
				UDevice.me.init();
			}
			return UDevice.me; 
		}
UDevice.prototype.init=function() 
		{
			this.DevicePixelRatio = UDevice.getDevicePixelRatio();
			this.HasPerformance = UDevice.supportPerformance();
			this.ImgRatio = UDevice.getImgRatio();
			//this.screenSize = UDevice.getScreenSize();
			this.BrowserID = UDevice.CheckExplorerID();
			this.AppleID = UDevice.CheckAppleID();
			this.PlatformID = UDevice.getPlatformID(); 
			this.isApple =  this.checkIsApple();
			this.isMobile = this.checkIsMobile(); 
			//this.IsTablet = this.isScreenScaleOK();
			this.HasFastLoop = this.supportFastLoop();
			//this.LoopInterval = this.getBestLoopInterval();
			//this.BasicH5 = UDevice.checkSupportBaseH5();
			//this.AdvancedH5 = UDevice.checkSupportAdvanceH5();
		}
		/**
		 * 创建一个，画图画出来的东西，
		 * @return
		 */
UDevice.checkSupportAdvanceH5=function()
		{
			var foo_canvas = document.createElement("canvas");
			foo_canvas.h5ou = false;
			var h5pu = {
							h5qu:false,
							h5ru:false,
							set_opacity:true,
							zDistance:true,
							h5tu:false,
							h5uu:false,
							h5vu:true
						};
			var h5wu = ["experimental-webgl", "webgl", "webkit-3d", "moz-webgl"];
			for(var i = 0;i<h5wu.length;i ++)
			{
				try{
					foo_canvas.h5ou = foo_canvas.getContext(h5wu[i], h5pu);
				}
				catch (e) {
					
				}
				//有的但是一般这个值，都是，false
				if (foo_canvas.h5ou) { 
					break;
				}
			}
			var r = foo_canvas.h5ou!==false?true:false;
			foo_canvas.h5ou = null;
			foo_canvas = null;
			return r;
		}
		/**
		 * 请查是否支持CSS
		 * @return
		 */
UDevice.check_canvas2d=function()
		{
			//
			var tmp = document.createElement("canvas");
			var d2 = tmp.getContext("2d");
			var r = typeof(d2)== "object"? true:false;
			tmp = null;
			d2 = null;
			return r;
		}
		/**
		 * 是否支持css属性
		 */
UDevice.checkSupportBaseH5=function()
		{
			return UDevice.check_transform()&& UDevice.check_canvas2d(); 
		}  
		/**
		 * 是否是支持变形，是cs的某个属性，s
		 */
UDevice.check_transform=function()
		{
			if(! Ucss.contain_css_attribute("transform webkitTransform mozTransform oTransform msTransform"))
				return false;
			if (! Ucss.isSupport_perspective()) 
			{
				return false;
			}
			return true;
		}
		/**
		 * 返回什么参数，
		 */
UDevice.prototype.getBestLoopInterval=function()
		{
			switch(this.PlatformID)
			{
				case 1:
					return 33
				case 2:
					var h5vq = this.getSthNum222();
					switch(h5vq)
					{
						case 0:
							return 50;
						case 1:
							return 40
						case 2:
							return 33
						case 3:
							return 25
						default:
							return 33
					}
					return 5
				case 3:
					return 33
				case 4:
					return 33
				default:return 33
			}
		}
		/**
		 * 返回什么参数，
		 */
UDevice.prototype.getSthNum222=function()
		{
			var h5tq = UDevice.getMe().screenSize.x<UDevice.getMe().screenSize.y?UDevice.getMe().screenSize.x:UDevice.getMe().screenSize.y;
			var h5uq = UDevice.getMe().screenSize.x<UDevice.getMe().screenSize.y?UDevice.getMe().screenSize.y:UDevice.getMe().screenSize.x;
			//有的但是一般这个值，都是，false
			if(h5tq==320)
				return h5uq==480?0:1;
			//有的但是一般这个值，都是，false
			if(h5tq==375)
				return 2
			//有的但是一般这个值，都是，false
			if(h5tq==414)
				return 3
			return-1;
		}
		/**
		 * 判断是否支持动画属性？
		 */
UDevice.prototype.supportFastLoop=function()
		{
			return window.requestAnimationFrame!==undefined?true:false;
		}
		/**
		 *  比例是否达标？
		 */
UDevice.prototype.isScreenScaleOK=function()
		{
			//有的但是一般这个值，都是，false
			if (! UDevice.getMe().isMobile) {
				return false;
			}
			var h5mt = 3.0/4.0;
			var h5nt = UDevice.getMe().screenSize.x/UDevice.getMe().screenSize.y;
			var h5ot = Math.abs(h5mt-h5nt);
			//有的但是一般这个值，都是，false
			if (h5ot < 0.01) {
				return true;
			}
			return UDevice.getMe().screenSize.x>=580?true:false;
		}
		/**
		 * 检查手机的id号是否是，满足的？
		 */
UDevice.prototype.checkIsMobile=function()
		{
			return this.PlatformID>=0&&this.PlatformID<=4;
		}
		/**
		 * 判断是否支持某个东西？
		 */
UDevice.supportPerformance=function()
		{
			if (typeof(window.h5qq) !== "undefined") {
				
				if (typeof(window.h5qq.now) !== "undefined") {
					
					return true;
				}
			}
			return false;
		}
		
		/**
		 * 判断是否是苹果？
		 */
UDevice.prototype.checkIsApple=function()
		{
			switch(this.PlatformID)
			{
				case 2:
					return true;
				case 1:
				default:
					return false;
			}
		}
		/**
		 * 检查 dpr 修改图片宽度：
		 */
UDevice.getDevicePixelRatio=function()
		{
			return window.devicePixelRatio!==undefined?Math.max(window.devicePixelRatio,1.0): 1.0;
		}
		
		/**
		 * 这是获取手机屏幕的，宽度或者高度，
		 */
UDevice.getScreenSize=function()
		{
			//有的但是一般这个值，都是，false
			if (window.screen == undefined) {
				return UDevice.countScreenSize(window.innerWidth,window.innerHeight);
			}
			//有的但是一般这个值，都是，false
			if (window.screen.width == undefined) {
				return UDevice.countScreenSize(window.innerWidth,window.innerHeight);
			}
			return UDevice.countScreenSize(window.screen.width,window.screen.height); 
		}
		/**
		 * 创建一个初始化的矢量三，走对象，
		 * @param	w
		 * @param	h
		 */
UDevice.countScreenSize=function(w,h)
		{
			//三轴数据
			//return w>h?new XyzData(h,w,0): new XyzData(w,h,0); 
		}
		/**
		 * 获取图片比例：根据
		 */
UDevice.getImgRatio=function()
		{
			return 1.0/UDevice.getDevicePixelRatio(); 
		}
		/**
		 * 检查苹果机器型号，
		 */
UDevice.CheckAppleID=function()
		{
			return navigator.userAgent;
		}
		/**
		 * 检查浏览器型号，
		 */
UDevice.CheckExplorerID=function()
		{
			if(navigator.userAgent.indexOf("Firefox") !=-1)return 2
			else if(navigator.userAgent.indexOf("Chrome") !=-1)return 3
			else if(navigator.userAgent.indexOf("Safari") !=-1)return 4
			else if(navigator.userAgent.indexOf("MSIE") !=-1)return 1
			else if(navigator.userAgent.indexOf("rv:") !=-1)return 1
			else if(navigator.userAgent.indexOf("iPhone") !=-1)return 4
			else if(navigator.userAgent.indexOf("iPod") !=-1)return 4
			else if(navigator.userAgent.indexOf("iPad") !=-1)return 4
			return 0;
		} 
		/**
		 * 获取手机型号，
		 */
UDevice.getPlatformID=function()
		{
			if(navigator.userAgent.indexOf("Android") !=-1)return 1;
			else if(navigator.userAgent.indexOf("iPad") !=-1)return 2;
			else if(navigator.userAgent.indexOf("iPod") !=-1)return 2;
			else if(navigator.userAgent.indexOf("iPhone") !=-1)return 2;
			else if(navigator.userAgent.indexOf("webOS") !=-1)return 3;
			else if(navigator.userAgent.indexOf("mobile") !=-1)return 4
			else if(navigator.userAgent.indexOf("Windows Phone") !=-1)return 4
			else if(navigator.userAgent.indexOf("Windows Mobile") !=-1)return 4
			else if(navigator.userAgent.indexOf("IEMobile") !=-1)return 4
			else if(navigator.userAgent.indexOf("Nokia") !=-1)return 4
			else if(navigator.appVersion.indexOf("Win") !=-1)return 5;
			else if(navigator.appVersion.indexOf("Mac") !=-1)return 6;
			else if(navigator.appVersion.indexOf("Linux") !=-1)return 7;
			else if(navigator.appVersion.indexOf("X11") !=-1)return 8;
			return 0;
		};