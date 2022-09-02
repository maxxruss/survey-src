import React, { useState, useEffect } from "react";
import {
    Grid,
    Button,
    Paper,
    TextField,
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from "@mui/material";
import PageLayout from "../../../ui/PageLayout";
import withRequestService from "../../../hoc/with-request-service";
import { makeStyles } from "@mui/styles";
import { useHistory, useLocation } from "react-router-dom";
import { Delete } from "@mui/icons-material";

type Props = {
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

const Survey = ({ requestService }: Props) => {
    const classes = useStyles();
    const history = useHistory();
    const { search }: { search: string } = useLocation();
    const query = new URLSearchParams(search);
    const [id, setId] = useState<string | null>(query.get("id"));
    const [title, setTitle] = useState<String>("");
    const [questions, setQuestions] = useState<QuestionProps>([{ id: "new", text: "", answers: [{ text: "" }] }]);

    const addQuestion = () => {
        setQuestions((prev) => {
            return [...prev, { id: "new", text: "", answers: [{ text: "" }] }];
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

    useEffect(() => {
        console.log(questions)
    }, [questions]);


    return (
        <PageLayout title={id == "new" ? "Новый опрос" : `Опрос # ${id}`}>
            <Grid container spacing={2}>
                <Grid
                    item
                    container
                    justifyContent={"space-between"}
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <TextField
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
                                <Grid item key={`question_${i}`}>
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
                                                        label={"Вопрос"}
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
                                                            <Grid item container spacing={2} key={`answer${answer.id}`}>
                                                                <Grid
                                                                    item
                                                                    xs={11}
                                                                >
                                                                    <TextField
                                                                        label={"Ответ"}
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
        </PageLayout>
    );
};

export default withRequestService()(Survey);
