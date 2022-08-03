<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;



class VerifyController extends Controller
{
    public function VerifyEmail(Request $request)
    {
        $params = $request->json()->all();
        $token = $params['token'];

        if ($token == null) {
            return response()->json([
                'result' => 'success',
                'token' => $token,
            ]);
        }

        $user = User::where(DB::raw('md5("email")'), $token)->whereNull('email_verified_at')->first();

        if ($user != null) {
            User::query()->where('id', '=', $user['id'])->update(['email_verified_at' => date('Y-m-d H:i:s')]);

            return response()->json([
                'result' => 'success',
                'user' => $user,
            ]);
        } else {
            return response()->json([
                'result' => 'failed',
            ]);
        }
    }
}
