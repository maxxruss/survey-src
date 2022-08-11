import React, { useState, useEffect } from "react";
import { Grid, Button, Paper } from "@mui/material";
import PageLayout from "../../../ui/PageLayout";
import withRequestService from "../../../hoc/with-request-service";
import { connect } from "react-redux";
import compose from "../../../../utils/compose";
import { makeStyles } from "@mui/styles";
import { Snackbar, Alert } from "@mui/material";
import { setCompany } from "../../../../redux/actions";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";

type Props = {
    requestService: {
        request: (method: object) => {
            result: string;
            data: SurveyProps[];
        };
    };
};

type Survey = {
    [v: string]: { title: String; text: String };
};

type SurveyProps = {
    id: number;
    title: string;
    text: string;
};

const useStyles = makeStyles({
    itemCenter: {
        alignSelf: "center",
    },
});

const AskerSurveyList = ({ requestService }: Props) => {
    const classes = useStyles();
    const history = useHistory();
    const [surveys, setSurveys] = useState<SurveyProps[]>([]);

    const getData = async () => {
        const response = await requestService.request({
            url: "asker/getSurveys",
        });

        if (response.result == "success") {
            setSurveys(response.data);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <PageLayout title="Опросы">
            <Grid container spacing={2}>
                <Grid item container justifyContent={"end"}>
                    <Grid item>
                        <Button
                            variant="outlined"
                            onClick={() => history.push("/asker/survey/add")}
                        >
                            Добавить
                        </Button>
                    </Grid>
                </Grid>
                <Grid item container spacing={2} direction={"column"}>
                    {!surveys.length
                        ? null
                        : surveys.map((item) => {
                              return (
                                  <Grid item key={item.id}>
                                      <Paper elevation={3}>
                                          <Grid container p={2}>
                                              <Grid
                                                  item
                                                  xs={8}
                                                  className={classes.itemCenter}
                                              >
                                                  {item.title}
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
                                                      <Button variant="outlined">
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

export default withRequestService()(AskerSurveyList);
