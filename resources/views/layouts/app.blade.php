<html>
<head>
<meta charset="utf-8">
<meta name="viewport"
          content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no,target-densitydpi=device-dpi"/>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{env("PAGE_TITLE")}}</title>
    <style>
    body{background-color:#f4ecce;}
    body>div { position: absolute; }
    .text-layer { z-index: 1; }
    </style>
    <script src="{{asset('assets/js/UDevice.js')}}"></script>
    <script src="{{asset('assets/js/WXDevil.js')}}"></script>
    <script type="text/javascript">WXDevil.getMe().killWXdevil();</script>
    <link rel="stylesheet" type="text/css" href="{{asset('assets/style/style.min.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('assets/style/scrollbar.min.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('assets/style/scrollbar_common.min.css')}}">
    <script type="application/javascript" src="{{asset('assets/js/jquery-1.10.0.js')}}"></script>
    <script type="application/javascript" src="{{asset('assets/js/iscroll.js?v4')}}"></script>
    <script>
        var wxData = {};
        var wxShareUrl = '{{url("wx/share")}}';
    </script>
    <script src="{{asset('assets/js/jquery-2.1.1.min.js')}}"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script src="{{asset('assets/js/wx.js')}}"></script>
    <!--移动端版本兼容 -->
    <script type="text/javascript">
             var phoneWidth =  parseInt(window.screen.width);
             var phoneScale = phoneWidth/640;
             var ua = navigator.userAgent;
             if (/Android (\d+\.\d+)/.test(ua)){
                       var version = parseFloat(RegExp.$1);
                       if(version>2.3){
                                document.write('<meta name="viewport" content="width=640, minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+', target-densitydpi=device-dpi">');
                       }else{
                                document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
                       }
             } else {
                       document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
             }
    </script>
    <!--移动端版本兼容 end -->
    <script src="{{asset('assets/js/WJh5.js')}}"></script>
</head>
<body onload="WJstart()">
@yield('content')
@yield('scripts')
</body>
</html>
