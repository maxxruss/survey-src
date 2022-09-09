<?php

namespace App\Http\Controllers\Asker;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Survey;
use App\Models\Question;
use App\Models\Answer;

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
                $create_data = array(
                    'question_id' => $question_id,
                    'text' => $answer['text'],
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
            'data' => array('id' => $survey_id),
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

        $question_for_delete = [];

        // Удаляем или изменяем вопросы
        foreach ($survey_model->questions as $question_model) {
            $need_delete = true;
            foreach ($request->questions as $question_request) {

                if ($question_model['id'] == $question_request['id']) {
                    $need_delete = false;

                    if ($question_model->text != $question_request['text']) {
                        $question_model->text = $question_request['text'];
                    }

                    $this->editAnswers($question_model, $question_request);
                }
            }
            // Запоминаем, каких вопросов уже нет, чтобы удалить их
            if ($need_delete) {
                $question_for_delete[] = $question_model['id'];
            }
        }

        // Добавляем новые вопросы
        foreach ($request->questions as $question_request) {
            if ($question_request['id'] == 'new' && $question_request['text'] != null) {
                $new_question = new Question([
                    'survey_id' => $id,
                    'text' => $question_request['text']
                ]);

                $survey_model->questions->add($new_question);
            }
        }

        // Записываем связанные модели - добавляем новые и изменяем существующие
        $result = $survey_model->push();

        // Удаляем вопросы
        $delete = Question::whereIn('id', $question_for_delete)->delete();

        return response()->json([
            'result' => "success",
            // 'survey_id' => $survey_id,
        ]);
    }


    public function editAnswers($question_model, $question_request)
    {
        $answers_for_delete = [];

        // Удаляем или изменяем вопросы
        foreach ($question_model->answers as $answer_model) {
            $need_delete = true;
            foreach ($question_request['answers'] as $answer_request) {

                if ($answer_model['id'] == $answer_request['id']) {
                    $need_delete = false;

                    if ($answer_model->text != $answer_request['text']) {
                        $answer_model->text = $answer_request['text'];
                    }
                }
            }
            // Запоминаем, каких вопросов уже нет, чтобы удалить их
            if ($need_delete) {
                $answers_for_delete[] = $answer_model['id'];
            }
        }

        // Добавляем новые вопросы
        foreach ($question_request['answers'] as $answer_request) {
            if ($answer_request['id'] == 'new' && $answer_request['text'] != null) {
                $new_answer = new Answer([
                    'question_id' => $question_model['id'],
                    'text' => $answer_request['text']
                ]);

                $question_model->answers->add($new_answer);
            }
        }

        // Удаляем вопросы
        $delete = Answer::whereIn('id', $answers_for_delete)->delete();
    }
}
