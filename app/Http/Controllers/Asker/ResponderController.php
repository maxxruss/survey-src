<?php

namespace App\Http\Controllers\Asker;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Company;
use App\Models\Survey;
use Illuminate\Support\Facades\Auth;
use App\Models\Responder;

class ResponderController extends Controller
{
    public function getRespondersList()
    {
        $company_id = User::where('id', Auth::id())->first()['company_id'];
        $responders = Company::find($company_id)
            ->responders
            // ->with('responders')
            // ->first()
            // ->getRelation('responders')     
            ->sortByDesc('created_at') //сортирует коллекцию, но ключи не изменяет, в результате получается массив с ключами не по порядку, из-за этого на фронте трансформируется в объект
            ->values() // сбрасывается ключи после сортировки
            ->toArray();
        // var_dump($responders);die();
        // $responders = $data[0]['responders'];

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

    public function getListCandidats(Request $request)
    {
        $id = $request->get('id');
        $queryString = strtolower($request->get('query'));
        $company_id = User::where('id', Auth::id())->first()['company_id'];
        $participants = Survey::where('id', $id)
            ->with('participants')
            ->first()
            ->participants;

        $part_ids = $participants->pluck('id')->toArray();

        $candidates = Company::query();
        $candidates->where('id', $company_id);

        $candidates->with(["responders" => function ($query) use ($part_ids, $queryString) {
            $query->where(function ($query) use ($part_ids) {
                $query->whereNotIn('id', $part_ids);
            });

            if ($queryString) {
                $query->where(function ($query) use ($queryString) {
                    $query->whereRaw("LOWER(first_name) LIKE ?", '%' . $queryString . '%')
                        ->orWhereRaw("LOWER(last_name)  LIKE ?", "%" . $queryString . "%")
                        ->orWhereRaw("LOWER(middle_name)  LIKE ?", "%" . $queryString . "%");
                });
            }
        }]);

        $candidates = $candidates->first()->toArray()['responders'];

        return response()->json([
            'result' => "success",
            'candidates' => $candidates,
        ]);
    }

    public function getListParticipants(Request $request)
    {
        $id = $request->get('id');
        $queryString = strtolower($request->get('query'));
        $participants = Survey::query();
        $participants->where('id', $id);

        $participants->with(["participants" => function ($query) use ($queryString) {
            if ($queryString) {

                $query->where(function ($query) use ($queryString) {
                    $query->whereRaw("LOWER(first_name) LIKE ?", '%' . $queryString . '%')
                        ->orWhereRaw("LOWER(last_name)  LIKE ?", "%" . $queryString . "%")
                        ->orWhereRaw("LOWER(middle_name)  LIKE ?", "%" . $queryString . "%");
                });
            }
        }]);

        $participants = $participants->first()->toArray()['participants'];

        return response()->json([
            'result' => "success",
            'participants' => $participants
        ]);
    }

    public function saveParticipants(Request $request)
    {
        $survey_id = $request->id;
        if (!$survey_id) return;

        $part_ids = array_column($request->participants, 'id');
        $survey_model = Survey::find($survey_id);
        $survey_model->participants()->sync($part_ids);

        return response()->json([
            'result' => "success"
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
