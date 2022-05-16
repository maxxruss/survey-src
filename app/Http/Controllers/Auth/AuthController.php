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
        // var_dump('Auth::logout() - ',  Auth::logout());
        // var_dump('$request->session()->invalidate() - ',  $request->session()->invalidate());
        // var_dump('$request->session()->regenerateToken() - ',  $request->session()->regenerateToken());        



        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'result' => 'success',
        ]);
    }

    public function register(Request $params)
    {
        // $name = $params->login;
        // $email = $params->email;
        // $password = $params->password;

        $this->validate(request(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::create(request(['name', 'email', 'password']));

        auth()->login($user);

        return response()->json([
            'result' => 'success',
            'data' => Auth::user()
        ]);
    }
}
