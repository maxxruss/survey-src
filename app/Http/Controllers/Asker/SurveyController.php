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

class SurveyController extends Controller
{
    public function getList()
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

    public function delete(Request $request)
    {
        $result =  Survey::where('id', $request->id)->delete();

        return response()->json([
            'result' => $result ? "success" : "failed",
        ]);
    }

    public function add(Request $request)
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

    public function edit(Request $request)
    {
        $id = $request->id;
        $title = $request->title;

        $survey_model = Survey::where('id', $id)
            ->with("questions.answers")
            ->first();

        if ($survey_model->title != $title) {
            $survey_model->title = $title;
        }

        foreach ($survey_model->questions as $question_model) {
            $need_delete_question = true;

            foreach ($request->questions as $question_request) {
                // var_dump($question_model['id']);
                // die();
                if ($question_model['id'] == $question_request['id']) {
                    $need_delete_question = false;
                }

                if ($question_model->text != $question_request['text']) {
                    $question_model->text = $question_request['text'];
                }
            }
            if ($need_delete_question) {
                $question_model->delete();
            }
        }

        $result = $survey_model->push();


        var_dump($result);
        die();





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
