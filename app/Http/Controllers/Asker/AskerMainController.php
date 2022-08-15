<?php

namespace App\Http\Controllers\Asker;

use App\Exceptions\Response\BadParameterValueException;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Company;
use App\Models\Survey;
use App\Models\Question;
use App\Models\Answer;
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

    public function getSurveys()
    {
        return response()->json([
            'result' => "success",
            'data' => Survey::all()
        ]);
    }

    public function getSurvey($id)
    {
        $data = Survey::where('id', $id)
            ->with("questions.answers")
            ->first();

        return response()->json([
            'result' => "success",
            'data' => $data
        ]);
    }

    public function deleteSurvey(Request $request)
    {
        $result =  Survey::where('id', $request->id)->delete();

        return response()->json([
            'result' => $result ? "success" : "failed",
        ]);
    }

    public function addSurvey(Request $request)
    {
        // $data = $request->all();

        $survey_id = Survey::create(['title' => $request->title])->id;

        if (!$survey_id) {
            return response()->json([
                'result' => "failed",
                'msg' => "error survey save",
            ]);
        }


        foreach ($request->questions as $question) {
            $create_data = array(
                'survey_id' => $survey_id,
                'text' => $question['text'],
            );

            $question_id = Question::create($create_data)->id;

            if (!$question_id) {
                return response()->json([
                    'result' => "failed",
                    'msg' => "error questions save",
                ]);
            }

            foreach ($question['answers'] as $answer) {
                // var_dump('$answer: ', $answer);
                // die();

                $create_data = array(
                    'question_id' => $question_id,
                    'text' => $answer,
                );

                $answer_id = Answer::create($create_data)->id;

                if (!$answer_id) {
                    return response()->json([
                        'result' => "failed",
                        'msg' => "error answers save",
                    ]);
                }
            }
        }

        return response()->json([
            'result' => "success",
            'survey_id' => $survey_id,
        ]);
    }

    public function editSurvey(Request $request)
    {
        $data = $request->all();
        var_dump($data);die();

        $survey_id = Survey::create(['title' => $request->title])->id;

        if (!$survey_id) {
            return response()->json([
                'result' => "failed",
                'msg' => "error survey save",
            ]);
        }


        foreach ($request->questions as $question) {
            $create_data = array(
                'survey_id' => $survey_id,
                'text' => $question['text'],
            );

            $question_id = Question::create($create_data)->id;

            if (!$question_id) {
                return response()->json([
                    'result' => "failed",
                    'msg' => "error questions save",
                ]);
            }

            foreach ($question['answers'] as $answer) {
                // var_dump('$answer: ', $answer);
                // die();

                $create_data = array(
                    'question_id' => $question_id,
                    'text' => $answer,
                );

                $answer_id = Answer::create($create_data)->id;

                if (!$answer_id) {
                    return response()->json([
                        'result' => "failed",
                        'msg' => "error answers save",
                    ]);
                }
            }
        }

        return response()->json([
            'result' => "success",
            'survey_id' => $survey_id,
        ]);
    }
}
