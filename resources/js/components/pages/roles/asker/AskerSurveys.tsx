import React, { useState } from "react";
import { Grid } from "@mui/material";
import PageLayout from "../../../ui/PageLayout";
import withRequestService from "../../../hoc/with-request-service";
import { connect } from "react-redux";
import compose from "../../../../utils/compose";
import { makeStyles } from "@mui/styles";
import { Snackbar, Alert } from "@mui/material";
import { setCompany } from "../../../../redux/actions";
import { bindActionCreators } from "redux";

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
    title: string;
    text: string;
};

const useStyles = makeStyles({
    titleGrid: {
        paddingRight: "35px",
        textAlign: "right",
        alignSelf: "center",
        fontWeight: "600",
        fontSize: "20px",
    },
    dataGrid: {
        // paddingLeft: '15px',
    },
});

const AskerSurveys = ({ requestService }: Props) => {
    const classes = useStyles();
    const [surveys, setSurveys] = useState<SurveyProps[]>([]);

    const getData = async () => {
        const response = await requestService.request({
            url: "asker/saveProfile",
        });

        if (response.result == "success") {
            setSurveys(response.data);
        }
    };

    return (
        <PageLayout title="Опросы">
            <>
                {!surveys.length
                    ? null
                    : surveys.map((item) => {
                          return <Grid>{"AskerSurveys"}</Grid>;
                      })}
            </>
        </PageLayout>
    );
};

export default withRequestService()(AskerSurveys);
