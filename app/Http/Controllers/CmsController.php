<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\User;
use Illuminate\Http\Request;
use DB;
use Maatwebsite\Excel\Facades\Excel;
//use App\Http\Controllers\Controller;

class CmsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('web');
        //$this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $count = \App\WechatUser::count();
        $prizes = \App\Prize::all();
        $start_time = strtotime(date('2016-06-30'));
        $n = ceil((time() - $start_time) / (3600 * 24));
        $data = [];
        for ($i = 0; $i < $n; ++$i) {
            $num = [];
            $timestamp = $start_time + $i * 24 * 3600;
            $date1 = date('Y-m-d', $timestamp);
            $date2 = date('Y-m-d 23:59:59', $timestamp);
            $prize_count = $prizes->map(function ($prize) use ($date1, $date2) {
                    $count = \App\Lottery::where('prize_id', $prize->id)
                        ->where('lottery_time', '>=', $date1)
                        ->where('lottery_time', '<=', $date2)
                        ->count();

                return $count;
            });
            $data[$date1] = $prize_count;
        }
        $prize_count = $prizes->map(function ($prize) {
                $count = \App\Lottery::where('prize_id', $prize->id)
                    ->count();

            return $count;
        });
        $data['Total'] = $prize_count;
        return view('cms/dashboard',['count' => $count, 'prizes' => $prizes, 'data' => $data]);
    }

    /**
     * 微信授权用户
     * @return mixed
     */
    public function wechat($id = null)
    {
        if( $id == null ){
            $wechat_users = DB::table('wechat_users')->paginate(20);
        }
        else{
            $wechat_users = DB::table('wechat_users')->where('id', $id)->paginate(20);
        }

        return view('cms/wechat_user',['wechat_users' => $wechat_users]);
    }
    public function infos()
    {
        $infos = \App\Info::paginate(20);
        return view('cms/infos', ['infos'=>$infos]);
    }
    /**
     * 账户管理
     */
    public function users()
    {
        $users = DB::table('users')->paginate(20);
        return view('cms/users', ['users' => $users]);
    }
    /**
     * @return mixed
     * session 查看
     */
    public function sessions($id = null)
    {
        if( null == $id)
            $sessions = DB::table('sessions')->paginate(20);
        else
            $sessions = DB::table('sessions')->where('id', '=', $id)->paginate(20);
        return view('cms/sessions', ['sessions' => $sessions]);
    }
    /**
     * 导出
     */
    public function export()
    {
        $filename = 'lottery-'.date('YmdHis');
        $collection = \App\Lottery::whereNotNull('prize_id')->get();
        $data = $collection->map(function($item){
            $code = $item->prize_code_id != null ? $item->prizeCode->code : '--';
            return [
                $item->id,
                json_decode($item->user->nick_name),
                $item->prizeInfo->title,
                $code,
                $item->lottery_time
            ];
        });
        Excel::create($filename, function($excel) use($data) {
            $excel->setTitle('中奖记录');
            // Chain the setters
            $excel->setCreator('Alexa');
            // Call them separately
            $excel->setDescription('中奖记录');
            $excel->sheet('Sheet', function($sheet) use($data) {
                $sheet->row(1, array('ID','用户昵称','奖品','抽奖码','抽奖时间'));
                $sheet->fromArray($data, null, 'A2', false, false);
            });
        })->download('xlsx');
    }
    /**
     *账户管理
     */
    public function account()
    {
        return view('cms/account');
    }
    public function accountPost(Requests\AccountFormRequest $request)
    {
        //var_dump($request->user()->id);
        $user = \App\User::find($request->user()->id);
        $user->password = bcrypt($request->input('password'));
        $user->save();
        return redirect('cms/logout');
        //var_dump($request->input('password'));
    }
    public function userLogs()
    {
        $logs = \App\UserLog::limit(30)->offset(0)->orderBy('create_time', 'DESC')->get();
        return view('cms/userLogs',['logs' => $logs]);
    }
}
