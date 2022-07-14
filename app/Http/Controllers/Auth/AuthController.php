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

    public function auth(Request $request)
    {
        // var_dump($params->all());die();       
        $remember = $request->remember;
        // $name = $request->name;
        // $password = $request->password;


        $credentials = $request->validate([
            'name' => 'required',
            'password' => 'required',
        ]);

        // $credentials = [
        //     'name' => $name,
        //     'password' => $password,
        // ];

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

    public function register(Request $params)
    {
        // $tt = $params->all();
        // var_dump($tt);die();

        $name = $params->login;
        $email = $params->email;
        $password = $params->password;

        $data = [
            'name' => $params->name,
            'email' => $params->email,
            'password' => $params->password,
            'role_id' => 2,
        ];

        // $this->validate(request(), [
        //     'name' => 'required',
        //     'email' => 'required|email',
        //     'password' => 'required'
        // ]);

        // var_dump(request(['name', 'email', 'password']));die();

        $user = User::create($data);

        auth()->login($user);

        return response()->json([
            'result' => 'success',
            'data' => Auth::user()
        ]);
    }
}
