import React, { useState, useEffect } from "react";
import { Grid, Button, Paper, IconButton } from "@mui/material";
import PageLayout from "../../../ui/PageLayout";
import withRequestService from "../../../hoc/with-request-service";
import { connect } from "react-redux";
import compose from "../../../../utils/compose";
import { makeStyles } from "@mui/styles";
import { Snackbar, Alert } from "@mui/material";
import { setCompany } from "../../../../redux/actions";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Delete, Edit } from "@mui/icons-material";

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

const SurveysList = ({ requestService }: Props) => {
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

    const onDelete = async (id: number) => {
        const params = { id };

        const response = await requestService.request({
            url: "asker/deleteSurvey",
            params,
        });

        if (response.result == "success") {
            getData();
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
                            onClick={() => history.push("/asker/survey?id=new")}
                        >
                            Добавить
                        </Button>
                    </Grid>
                </Grid>

                <Grid item container justifyContent={"end"}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Название</TableCell>
                                    <TableCell align="right">
                                        Действия
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {surveys.map((row, i) => (
                                    <TableRow
                                        key={row.title + i}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.title}
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                color="primary"
                                                aria-label="upload picture"
                                                component="span"
                                                onClick={() =>
                                                    history.push(
                                                        "/asker/survey?id=" +
                                                            row.id
                                                    )
                                                }
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                color="primary"
                                                aria-label="upload picture"
                                                component="span"
                                                onClick={() => onDelete(row.id)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </PageLayout>
    );
};

export default withRequestService()(SurveysList);
