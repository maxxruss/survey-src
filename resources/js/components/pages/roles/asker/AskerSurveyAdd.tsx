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
import { connect } from "react-redux";
import compose from "../../../../utils/compose";
import { makeStyles } from "@mui/styles";
import { Snackbar, Alert } from "@mui/material";
import { setCompany } from "../../../../redux/actions";
import { bindActionCreators } from "redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

type Props = {
    requestService: {
        request: (method: object) => {
            result: string;
            data: QuestionProps[];
        };
    };
};

type Survey = {
    [v: string]: { title: String; text: String };
};

type QuestionProps = {
    text: string;
    answers: [string];
};

const useStyles = makeStyles({
    itemCenter: {
        alignSelf: "center",
    },
});

const AskerSurveyAdd = ({ requestService }: Props) => {
    const classes = useStyles();
    const [title, setTitle] = useState<String>("");
    const [questions, setQuestions] = useState<QuestionProps[]>([]);

    // const [expanded, setExpanded] = React.useState<string | false>(false);

    const addQuestion = () => {
        setQuestions((prev) => {
            return [...prev, { text: "", answers: [""] }];
        });
    };

    const setQuestionText = (i: number, value: string) => {
        // console.log("i: ", i);
        // console.log("value: ", value);
        // const newArray = [...questions];
        // newArray[i].text = value;
        // setQuestions((prev) => {
        //     return [...prev, [i]: { text: value, answers: [""] }];
        // });
    };

    const deleteQuestion = (i: number) => {
        setQuestions((prev) => {
            prev.splice(i, 1);
            return [...prev];
        });
    };

    const addAnswer = (i: number) => {
        setQuestions((prev) => {
            prev[i].answers.push("");
            return [...prev];
        });
    };

    const setAnswer = (
        questionIndex: number,
        answerIndex: number,
        text: string
    ) => {
        setQuestions((prev) => {
            prev[questionIndex].answers[answerIndex] = text;
            return [...prev];
        });
    };

    useEffect(() => {
        console.log(questions);
    }, [questions]);

    // const getData = async () => {
    //     const response = await requestService.request({
    //         url: "asker/getSurveys",
    //     });

    //     if (response.result == "success") {
    //         setSurveys(response.data);
    //     }
    // };

    // useEffect(() => {
    //     getData();
    // }, []);

    const save = async () => {
        const params = { title, questions };

        const response = await requestService.request({
            url: "asker/survey/add",
            params,
        });

        if (response.result == "success") {
            console.log(response.data);
        }
    };

    // useEffect(() => {
    //     getData();
    // }, []);

    return (
        <PageLayout title="Новый опрос">
            <Grid container spacing={2}>
                <Grid
                    item
                    container
                    justifyContent={"space-between"}
                    spacing={2}
                >
                    <Grid item xs={10} className={classes.itemCenter}>
                        <TextField
                            label="Название опроса"
                            fullWidth
                            multiline
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            variant="outlined"
                            onClick={() => addQuestion()}
                        >
                            Добавить вопрос
                        </Button>
                    </Grid>
                </Grid>
                <Grid item container spacing={2} direction={"column"}>
                    {!questions.length
                        ? null
                        : questions.map((question, i) => {
                              return (
                                  <Grid item key={i}>
                                      <Paper elevation={3}>
                                          <Grid container p={2}>
                                              <Grid item container>
                                                  <Grid
                                                      item
                                                      xs={8}
                                                      className={
                                                          classes.itemCenter
                                                      }
                                                      mb={2}
                                                  >
                                                      <TextField
                                                          label={"Вопрос"}
                                                          fullWidth
                                                          multiline
                                                          value={question.text}
                                                          onChange={(e) => {
                                                              question.text =
                                                                  e.target.value;
                                                              setQuestions([
                                                                  ...questions,
                                                              ]);
                                                          }}
                                                      />
                                                  </Grid>
                                                  <Grid
                                                      item
                                                      container
                                                      xs={4}
                                                      justifyContent={"end"}
                                                      spacing={2}
                                                  >
                                                      <Grid item>
                                                          <Button
                                                              variant="outlined"
                                                              onClick={() =>
                                                                  addAnswer(i)
                                                              }
                                                          >
                                                              Добавить ответ
                                                          </Button>
                                                      </Grid>
                                                      <Grid item>
                                                          <Button
                                                              variant="outlined"
                                                              onClick={() =>
                                                                  deleteQuestion(
                                                                      i
                                                                  )
                                                              }
                                                          >
                                                              Удалить
                                                          </Button>
                                                      </Grid>
                                                  </Grid>
                                              </Grid>
                                              <Grid item container spacing={2}>
                                                  {question.answers.map(
                                                      (answer, j) => {
                                                          return (
                                                              <Grid
                                                                  item
                                                                  xs={12}
                                                              >
                                                                  <TextField
                                                                      label={
                                                                          "Ответ"
                                                                      }
                                                                      fullWidth
                                                                      multiline
                                                                      value={
                                                                          answer
                                                                      }
                                                                      onChange={(
                                                                          e
                                                                      ) => {
                                                                          setAnswer(
                                                                              i,
                                                                              j,
                                                                              e
                                                                                  .target
                                                                                  .value
                                                                          );
                                                                      }}
                                                                  />
                                                              </Grid>
                                                          );
                                                      }
                                                  )}
                                              </Grid>
                                          </Grid>
                                      </Paper>
                                  </Grid>
                              );
                          })}
                </Grid>
                <Grid item>
                    <Button variant="outlined" onClick={() => save()}>
                        Сохранить
                    </Button>
                </Grid>
            </Grid>
        </PageLayout>
    );
};

export default withRequestService()(AskerSurveyAdd);
