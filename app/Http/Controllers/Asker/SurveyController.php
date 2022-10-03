<?php

namespace App\Http\Controllers\Asker;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Survey;
use App\Models\Question;
use App\Models\Answer;

class SurveyController extends Controller
{

    public function getInfo($id)
    {
        return response()->json([
            'result' => "success",
            'data' => array(
                'id' => $id
            )
        ]);
    }

    public function start($id)
    {
        return response()->json([
            'result' => "success",
            'data' => array(
                'id' => $id
            )
        ]);
    }

    public function stop($id)
    {
        return response()->json([
            'result' => "success",
            'data' => array(
                'id' => $id
            )
        ]);
    }

    public function getList()
    {
        return response()->json([
            'result' => "success",
            'data' => Survey::all()
        ]);
    }

    public function getContent($id)
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

    public function addNewQuestion(Survey $survey_model, $question_request)
    {
        if ($question_request['id'] == 'new' && $question_request['text'] != null) {
            $new_question = new Question([
                'survey_id' => $survey_model->id,
                'text' => $question_request['text']
            ]);

            $survey_model->questions->add($new_question);

            // сохраняем вопросы, чтобы у вопроса был id, к которому затем будет привязан ответ
            $survey_model->push();
            $this->editAnswers($new_question, $question_request);
        }
    }

    public function add(Request $request)
    {
        $survey_model = Survey::create(['title' => $request->title]);
        $survey_id = $survey_model->id;

        foreach ($request->questions as $question_request) {
            $this->addNewQuestion($survey_model, $question_request);
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

        // Название опроса
        if ($survey_model->title != $title) {
            $survey_model->title = $title;
        }

        $question_for_delete = [];

        // Удаляем или изменяем вопросы
        foreach ($survey_model->questions as $question_model) {
            $need_delete = true;
            foreach ($request->questions as $question_request) {
                // Если новый вопрос
                $this->addNewQuestion($survey_model, $question_request);

                // Если вопрос существует
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

        // Удаляем вопросы
        Question::whereIn('id', $question_for_delete)->delete();

        return response()->json([
            'result' => "success"
        ]);
    }


    public function editAnswers(&$question_model, $question_request)
    {
        $answers_for_delete = [];

        // Удаляем или изменяем ответы
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
            // Запоминаем, каких ответов уже нет, чтобы удалить их
            if ($need_delete) {
                $answers_for_delete[] = $answer_model['id'];
            }
        }

        // Добавляем новые ответы
        foreach ($question_request['answers'] as $answer_request) {

            // die();
            if ($answer_request['id'] == 'new' && $answer_request['text'] != null) {
                $new_answer = new Answer([
                    'question_id' => $question_model['id'],
                    'text' => $answer_request['text']
                ]);

                $question_model->answers->add($new_answer);
            }
        }

        $question_model->push();

        // Удаляем ответы
        Answer::whereIn('id', $answers_for_delete)->delete();
    }
}
