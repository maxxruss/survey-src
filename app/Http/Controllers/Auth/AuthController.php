<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\Response\BadParameterValueException;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function check()
    {
        if (Auth::check()) {
            return response()->json([
                'result' => 'success',
                'data' => User::where('id', Auth::id())->with('company.role')->first()
            ]);
        } else {
            return response()->json([
                'result' => 'failed',
            ]);
        }
    }

    public function register(Request $params)
    {
        $data_company = [
            'title' => $params->title,
            'inn' => $params->inn,
            'kpp' => $params->kpp,
            'address' => $params->address,
            'manager' => $params->manager,
            'phone' => $params->phone,
            'is_active' => true,
            'role_id' => 2
        ];
       

        $company_id = Company::create($data_company)->id;

        if(!$company_id) {
            return response()->json([
                'result' => 'false',
                'msg' => 'Не удалось создать компанию',
            ]);
        }

        // var_dump($company_id);die();

        $data_user = [
            'name' => $params->name,
            'email' => $params->email,
            'password' => $params->password,
            'company_id' => $company_id,
        ];

        $user = User::create($data_user);
        auth()->login($user);


        $credentials = [
            'name' => $params->name,
            'password' => $params->password,
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
