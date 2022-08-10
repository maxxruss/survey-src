<?php

namespace App\Http\Controllers\Asker;

use App\Exceptions\Response\BadParameterValueException;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;

class AskerMainController extends Controller
{

    public function saveCompany(Request $request)
    {
        $request = $request->all();
        $company_id = User::where('id', Auth::id())->first()['company_id'];
        $company = Company::where('id', $company_id)->first();

        if (
            $company->title != $request['title'] ||
            $company->inn != $request['inn'] ||
            $company->kpp != $request['kpp'] ||
            $company->manager != $request['manager'] ||
            $company->phone != $request['phone']
        ) {
            $update = array(
                'title' => $request['title'],
                'inn' => $request['inn'],
                'kpp' => $request['kpp'],
                'manager' => $request['manager'],
                'phone' => $request['phone'],
            );

            $result = Company::query()->where('id', $company_id)->update($update);

            if ($result) {
               $company = Company::where('id', $company_id)->first();
                return response()->json([
                    'result' => 'success',
                    'data' => $company,
                ]);
            } else {
                return response()->json([
                    'result' => 'failed'
                ]);
            }
        } else {
            return response()->json([
                'result' => 'no_changes'
            ]);
        }
    }

    public function saveProfile(Request $request)
    {
        $request = $request->all();
        $user = User::where('id', Auth::id())->first();

        if ($user->login != $request['login']) {
            $result = User::query()->where('id', $user->id)->update(['login' => $request['login']]);

            if ($result) {
                $user = User::where('id', $user->id)->first();
                return response()->json([
                    'result' => 'success',
                    'data' => $user,
                ]);
            } else {
                return response()->json([
                    'result' => 'failed'
                ]);
            }
        } else {
            return response()->json([
                'result' => 'no_changes'
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
