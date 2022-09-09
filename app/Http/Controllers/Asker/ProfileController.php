<?php

namespace App\Http\Controllers\Asker;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;
use App\Models\Responder;

class ProfileController extends Controller
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
}
