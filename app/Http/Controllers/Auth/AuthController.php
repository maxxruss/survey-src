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
use Illuminate\Support\Str;
use App\Mail\VerificationEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller
{
    public function getDataAutorizedUser()
    {
        $data = User::where('id', Auth::id())->with('company.role')->first();

        return [
            'id' => $data['id'],
            'login' => $data['login'],
            'email' => $data['email'],
            'role' => $data['company']['role']['title']
        ];
    }

    public function check()
    {
        if (Auth::check()) {
            return response()->json([
                'result' => 'success',
                'data' => $this->getDataAutorizedUser()
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

        if (!$company_id) {
            return response()->json([
                'result' => 'false',
                'msg' => 'Не удалось создать компанию',
            ]);
        }

        $data_user = [
            'login' => $params->login,
            'email' => $params->email,
            'password' => $params->password,
            'company_id' => $company_id,
            'email_verification_token' => Str::random(32)
        ];

        // $user = User::create($data_user)->toArray();
        $user = User::create($data_user);
        // var_dump($user);die();

        event(new Registered($user));


        $details = array(
            'login'=> $user['login'],
            'body'=> 'Вам необходимо подтвердить ваш e-mail',
        );    

        $mail_to = $user['email'];
        $subject = "Подтверждение e-mail";

        $mail = Mail::send('email.confirm', ['details' => $details], function ($message) use ($subject, $mail_to) {
            $message->from('mc@example.com');
            $message->to($mail_to);
            $message->subject($subject);
        });

        // var_dump($mail);die();

        // \Mail::to($user->email)->send(new VerificationEmail($details));

        // auth()->login($user);


        // $credentials = [
        //     'login' => $params->login,
        //     'password' => $params->password,
        // ];

        // if (Auth::attempt($credentials, true)) {
        // $params->session()->regenerate();

        return response()->json([
            'result' => 'success',
            'data' => $this->getDataAutorizedUser()
        ]);
        // } else {
        //     return response()->json([
        //         'result' => 'false',
        //     ]);
        // }
    }

    public function auth(Request $request)
    {
        $remember = $request->remember;
        $credentials = $request->validate([
            'login' => 'required',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials, $remember)) {
            $request->session()->regenerate();

            return response()->json([
                'result' => 'success',
                'check' => Auth::check(),
                'data' => $this->getDataAutorizedUser()
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
