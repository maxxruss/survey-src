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

    const deleteItem = (i: number) => {
        setQuestions((prev) => {
            prev.splice(i, 1);
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

    return (
        <PageLayout title="Новый опрос">
            <Grid container spacing={2}>
                <Grid item container justifyContent={"end"}>
                    <Grid item>
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
                        : questions.map((item, i) => {
                              return (
                                  <Grid item key={i}>
                                      <Paper elevation={3}>
                                          <Grid container p={2}>
                                              <Grid
                                                  item
                                                  xs={8}
                                                  className={classes.itemCenter}
                                              >
                                                  <TextField
                                                      fullWidth
                                                      multiline
                                                      value={item.text}
                                                      onChange={(e) => {
                                                          item.text =
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
                                                      <Button variant="outlined">
                                                          Редактировать
                                                      </Button>
                                                  </Grid>
                                                  <Grid item>
                                                      <Button
                                                          variant="outlined"
                                                          onClick={() =>
                                                              deleteItem(i)
                                                          }
                                                      >
                                                          Удалить
                                                      </Button>
                                                  </Grid>
                                              </Grid>
                                          </Grid>
                                      </Paper>
                                  </Grid>
                              );
                          })}
                </Grid>
            </Grid>
        </PageLayout>
    );
};

export default withRequestService()(AskerSurveyAdd);
