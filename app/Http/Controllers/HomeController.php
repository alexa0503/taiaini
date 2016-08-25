<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Helper;
use Session;
use App;
use Carbon\Carbon;
class HomeController extends Controller
{
    public function __construct()
    {
        $this->middleware('web');
        $this->middleware('wechat.auth');
    }

    public function index()
    {
        $user_id = Session::get('wechat.id');
        App\Lottery::where('user_id', $user_id)->first();
        $status = 0;
        $count1 = App\Lottery::where('user_id', $user_id)->count();
        $count2 = App\Lottery::where('user_id', $user_id)->where('prize_id','!=','0')->count();
        if($count2 > 0 ){
            $lottery = App\Lottery::where('user_id', $user_id)->where('prize_id','!=','0')->first();
            $count3  = App\Info::where('id', $lottery->id)->count();
            $status = $count3 > 0 ? 2 : 1;
            if($count3 == 0){
                Session::set('lottery.id', $lottery->id);
            }
        }
        elseif($count1 > 1){
            $status = 3;
        }
        return view('index',[
            'status' => $status,
        ]);
    }
    public function lottery()
    {
        $user_id = Session::get('wechat.id');
        $count1 = App\Lottery::where('user_id', $user_id)->count();
        $count2 = App\Lottery::where('user_id', $user_id)->where('prize_id','!=','0')->count();
        if($count2 > 0){
            $result = ['ret' => 1002, 'prize' => null, 'msg' => '已中奖,不能再抽奖了嗷'];
            return $result;
        }
        if($count1 > 1){
            $result = ['ret' => 1001, 'prize' => null, 'msg' => '一个人最多只能抽2次嗷'];
            return $result;
        }

        $result = ['ret' => 0, 'prize' => null, 'msg' => ''];
        $lottery = new Helper\Lottery();
        $lottery->run();
        //$prize_code = $lottery->getCode();
        $prize_id = $lottery->getPrizeId();
        $result['prize'] = $prize_id;

        //$result['prize']['code'] = $prize_code;

        return json_encode($result);
    }
    public function info(Request $request)
    {
        $user_id = Session::get('wechat.id');
        if( null == Session::get('lottery.id')){
            return ['ret'=>1001,'msg'=>'您还没有抽奖呢'];
        }
        else{
            $lottery = App\Lottery::findOrFail(Session::get('lottery.id'));
            $count = App\Info::where('mobile',trim($request->input('mobile')))->count();
            $count1 = App\Info::where('id',Session::get('lottery.id'))->count();
            if( $lottery->prize_id == null){
                return ['ret'=>1002,'msg'=>'你还没有中奖呢'];
            }
            elseif($count1 > 0){
                return ['ret'=>1004,'msg'=>'您已经填写过表单了~'];
            }
            elseif($count > 0 ){
                return ['ret'=>1003,'msg'=>'该手机号已经使用过了~'];
            }
            else{
                $data = [
                    'id' => Session::get('lottery.id'),
                    'name' => trim($request->input('name')),
                    'mobile' => trim($request->input('mobile')),
                    'address'=>'',
                    //'address' => trim($request->input('address')),
                    'ip_address' => \Request::getClientIp(),
                ];
                $info = App\Info::firstOrCreate($data);
                Session::set('lottery.id',null);
                return ['ret'=>0,'msg'=>''];
            }
        }
    }
}
