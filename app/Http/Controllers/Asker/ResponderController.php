<?php

namespace App\Http\Controllers\Asker;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;
use App\Models\Responder;

class ResponderController extends Controller
{
    public function getRespondersList()
    {
        $company_id = User::where('id', Auth::id())->first()['company_id'];
        $data = Company::find($company_id)->with('responders')->get()->toArray();
        $responders = $data[0]['responders'];       

        return response()->json([
            'result' => "success",
            'data' => $responders
        ]);
    }

    public function getResponder($id)
    {
        $data = Responder::select('*')
            ->where('responders.id', $id)
            ->first();

        return response()->json([
            'result' => "success",
            'data' => $data
        ]);
    }

    public function saveResponder(Request $request)
    {
        $id = $request->id;
        if (!$id) return;

        if ($id == 'new') {
            $data = array(
                'first_name' => $request->first_name,
                'middle_name' => $request->middle_name,
                'last_name' => $request->last_name,
                'is_active' => $request->is_active,
                'email' => $request->email,
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            );

            // Вставить нового респондента и сразу получить id
            $id = Responder::insertGetId($data);

            // Привязываем респондента к компании
            $company_id = User::where('id', Auth::id())->first()['company_id'];
            $company = Company::find($company_id);
            $company->responders()->attach($id);
        } else {
            $responder = Responder::find($id);
            $responder->first_name = $request->first_name;
            $responder->middle_name = $request->middle_name;
            $responder->last_name = $request->last_name;
            $responder->is_active = $request->is_active;
            $responder->email = $request->email;
            $responder->save();
        }

        // $data = Responder::select('*')
        //     ->where('responders.id', $id)
        //     ->first();

        return response()->json([
            'result' => "success",
            'data' => ['id' => $id]
        ]);
    }

    public function removeResponder($id)
    {
        $result =  Responder::where('id', $id)->delete();

        return response()->json([
            'result' => $result ? "success" : "failed",
        ]);
    }
}
