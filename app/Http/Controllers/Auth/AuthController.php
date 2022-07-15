<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\Response\BadParameterValueException;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function check()
    {
        if (Auth::check()) {
            return response()->json([
                'result' => 'success',
                'data' => Auth::user()
            ]);
        } else {
            return response()->json([
                'result' => 'failed',
            ]);
        }
    }

    public function register(Request $params)
    {
        $name = $params->name;
        $email = $params->email;
        $password = $params->password;

        $data = [
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'role_id' => 2,
        ];

        $user = User::create($data);
        auth()->login($user);


        $credentials = [
            'name' => $name,
            'password' => $password,
        ];

        if (Auth::attempt($credentials, true)) {
            $params->session()->regenerate();
            return response()->json([
                'result' => 'success',
                'data' => Auth::user()
            ]);
        } else {
            return response()->json([
                'result' => 'false',
            ]);
        }
    }

    public function auth(Request $request)
    {
        $remember = $request->remember;
        $credentials = $request->validate([
            'name' => 'required',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials, $remember)) {
            $request->session()->regenerate();

            return response()->json([
                'result' => 'success',
                'check' => Auth::check(),
                'data' => Auth::user(),
                'type' => gettype($remember),
                'remember' => $remember,
            ]);
        } else {
            return response()->json([
                'result' => 'false',
            ]);
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        $result = '';

        if (!Auth::check()) {
            $result = 'success';
        } else {
            $result = 'failed';
        }

        return response()->json([
            'result' => $result
        ]);
    }
}
