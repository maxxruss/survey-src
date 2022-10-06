import React, { useEffect, useState } from "react";
import {
    TextField,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Checkbox,
    Button,
    Paper,
    Autocomplete,
    IconButton,
} from "@mui/material";
import { PlayArrow, Stop, Email } from "@mui/icons-material";
import withRequestService from "../../../../hoc/with-request-service";
import { makeStyles } from "@mui/styles";
// import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';



type SurveyTypes = {
    id: number;
    start: string ;
    end: string ;
};

type DatesTypes = {
    start: string ;
    end: string ;
}

type PropTypes = {
    id: number | string;
    requestService: {
        id: number | string;
        request: (method: object) => {
            result: string;
            data: SurveyTypes;
        };
    };
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

const Manage = ({ id, requestService }: PropTypes) => {
    const classes = useStyles();
    const [dates, setDates] = useState<DatesTypes>({ start: '', end: '' });
    const [data, setData] = useState<SurveyTypes>();
    const getData = async () => {
        console.log("id: ", id);
        const response = await requestService.request({
            url: "asker/survey/getInfo/" + id,
            method: "get",
        });

        if (response.result == "success") {
            setData(response.data);
            console.log("getData - success");
        }
    };

    const startSurvey = async () => {
        const response = await requestService.request({
            url: "asker/survey/start/" + id,
            method: "get",
        });

        if (response.result == "success") {
            console.log("startSurvey - success");
        }
    };

    const endSurvey = async () => {
        const response = await requestService.request({
            url: "asker/survey/end/" + id,
            method: "get",
        });

        if (response.result == "success") {
            console.log("endSurvey - success");
        }
    };

    const sendInvite = async () => {
        const response = await requestService.request({
            url: "asker/survey/sendInvite/" + id,
            method: "get",
        });

        if (response.result == "success") {
            console.log("sendInvite - success");
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            {data ? (
                <Grid container direction="column" spacing={3}>
                    <Grid item container direction={"row"}>
                        <Grid item className={classes.titleGrid} xs={6}>
                            Дата начала
                        </Grid>
                        <Grid item className={classes.dataGrid} xs={3}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Date desktop"
                                    inputFormat="MM/dd/yyyy"
                                    value={dates.start}
                                    onChange={(newValue: string) => {
                                        setDates({start: newValue, end: dates.end})
                                      }}
                                    renderInput={(params: any) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Grid item>Статус</Grid>
                    <Grid item>
                        <TextField
                            label="Дата начала"
                            size="small"
                            disabled
                            value={data.start}
                            variant="outlined"
                            style={{
                                width: "100%",
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Дата окончания"
                            size="small"
                            disabled
                            value={data.end}
                            variant="outlined"
                            style={{
                                width: "100%",
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <IconButton
                            color="primary"
                            size="large"
                            onClick={() => startSurvey()}
                        >
                            <PlayArrow fontSize="inherit" />
                        </IconButton>
                        <IconButton
                            color="primary"
                            size="large"
                            onClick={() => endSurvey()}
                        >
                            <Stop fontSize="inherit" />
                        </IconButton>
                        <IconButton
                            color="primary"
                            size="large"
                            onClick={() => sendInvite()}
                        >
                            <Email fontSize="inherit" />
                        </IconButton>
                    </Grid>
                </Grid>
            ) : null}
        </>
    );
};

export default withRequestService()(Manage);
