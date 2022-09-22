import React, { useState, useEffect } from "react";
import {
    Grid,
    Button,
    Paper,
    TextField
} from "@mui/material";
import withRequestService from "../../../../hoc/with-request-service";
import { makeStyles } from "@mui/styles";
import { Delete } from "@mui/icons-material";
import { useHistory } from "react-router-dom";


type Props = {
    id: number | string;
    setId: (id: number | string) => {};
    requestService: {
        request: (method: object) => {
            result: string;
            data: { id: string, title: string; questions: QuestionProps };
        };
    };
};

type Survey = {
    [v: string]: { title: String; text: String };
};

type QuestionProps = {
    id: string;
    text: string;
    answers: { id?: number | string; text: string }[];
}[];

const useStyles = makeStyles({
    itemCenter: {
        alignSelf: "center",
    },
});

const Content = ({ id, setId, requestService }: Props) => {
    const history = useHistory();
    const classes = useStyles();
    const [title, setTitle] = useState<String>("");
    const [questions, setQuestions] = useState<QuestionProps>([{ id: "new", text: "", answers: [{ id: "new", text: "" }] }]); 

    const addQuestion = () => {
        setQuestions((prev) => {
            return [...prev, { id: "new", text: "", answers: [{ id: "new", text: "" }] }];
        });
    };

    const addAnswer = (i: number) => {
        setQuestions((prev) => {
            prev[i].answers.push({ id: "new", text: "" });
            return [...prev];
        });
    };

    const setAnswer = (
        questionIndex: number,
        answerIndex: number,
        text: string
    ) => {
        setQuestions((prev) => {
            prev[questionIndex].answers[answerIndex].text = text;
            return [...prev];
        });
    };

    const deleteAnswer = (questionIndex: number, answerIndex: number) => {
        setQuestions((prev) => {
            prev[questionIndex].answers.splice(answerIndex, 1);
            return [...prev];
        });
    }

    const deleteQuestion = (i: number) => {
        setQuestions((prev) => {
            prev.splice(i, 1);
            return [...prev];
        });
    };

    const saveNewSurvey = async () => {
        const params = { title, questions };

        const response = await requestService.request({
            url: "asker/survey/add",
            params,
        });

        if (response.result == "success") {
            history.push("/asker/survey?id=" + response.data.id);
            setId(response.data.id);
        }
    };

    const saveEditSurvey = async () => {
        const params = { id, title, questions };

        const response = await requestService.request({
            url: "asker/survey/edit",
            params,
        });

        if (response.result == "success") {
            getData();
        }
    };

    const getData = async (surveyId = id) => {
        console.log('id: ', id)
        const response = await requestService.request({
            url: "asker/getSurvey/" + surveyId,
            method: "get",
        });

        if (response.result == "success") {
            const { id, title, questions } = response.data;
            setId(id);
            setTitle(title);
            setQuestions(questions);
        }
    };

    useEffect(() => {
        if (id != "new") {
            getData();
        }
    }, [id]);

    return (
        <>
            <Grid container spacing={2}>
                <Grid
                    item
                    container
                    justifyContent={"space-between"}
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <TextField
                            size="small"
                            label="Название опроса"
                            fullWidth
                            multiline
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid item container spacing={2} direction={"column"}>
                    {!questions.length
                        ? null
                        : questions.map((question, i) => {
                            return (
                                <Grid item key={"question_" + i}>
                                    <Paper elevation={3}>
                                        <Grid container p={2}>
                                            <Grid item container spacing={2}>
                                                <Grid
                                                    item
                                                    xs={8}
                                                    className={classes.itemCenter}
                                                    mb={2}
                                                >
                                                    <TextField
                                                        size="small"
                                                        label={"Вопрос " + (i + 1)}
                                                        fullWidth
                                                        multiline
                                                        value={question.text}
                                                        onChange={(e) => {
                                                            question.text = e.target.value;
                                                            setQuestions([...questions]);
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid
                                                    item
                                                    container
                                                    xs={4}
                                                    spacing={2}
                                                >
                                                    <Grid item>
                                                        <Button
                                                            variant="outlined"
                                                            onClick={() => deleteQuestion(i)}>
                                                            Удалить вопрос
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item container spacing={2}>
                                                {question.answers.map(
                                                    (answer, j) => {
                                                        return (
                                                            <Grid item container spacing={2} key={"answer_" + j}>
                                                                <Grid
                                                                    item
                                                                    xs={11}
                                                                >
                                                                    <TextField
                                                                        size="small"
                                                                        label={"Ответ " + (j + 1)}
                                                                        fullWidth
                                                                        multiline
                                                                        value={answer.text}
                                                                        onChange={(e) => { setAnswer(i, j, e.target.value) }}
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={1}>
                                                                    <Button
                                                                        color="primary"
                                                                        variant="outlined"
                                                                        aria-label="upload picture"
                                                                        onClick={() => deleteAnswer(i, j)}
                                                                    >
                                                                        <Delete />
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                        );
                                                    }
                                                )}
                                                <Grid item>
                                                    <Button
                                                        variant="outlined"
                                                        onClick={() => addAnswer(i)}
                                                    >
                                                        Добавить ответ
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            );
                        })}
                </Grid>
                <Grid item>
                    <Button
                        variant="outlined"
                        onClick={() => addQuestion()}
                    >
                        Добавить вопрос
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="outlined"
                        onClick={() =>
                            id == "new" ? saveNewSurvey() : saveEditSurvey()
                        }
                    >
                        Сохранить
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default withRequestService()(Content);
