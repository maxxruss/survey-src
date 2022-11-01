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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



type SurveyTypes = {
    id: number;
    start: string;
    end: string;
    status: string;
};

type DatesTypes = {
    start: Date | null;
    end: Date | null;
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
    const [dates, setDates] = useState<DatesTypes>({ start: null, end: null });
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

    if (!data) return null

    return (
        <>
            <Grid container direction="column" spacing={3}>
                <Grid item container direction={"row"}>
                    <Grid item className={classes.titleGrid} xs={6}>
                        Дата начала
                    </Grid>
                    <Grid item className={classes.dataGrid} xs={3}>
                        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date desktop"
                                inputFormat="MM/dd/yyyy"
                                value={dates.start}
                                onChange={(newValue: Date | null) => {
                                    setDates({ start: newValue, end: dates.end })
                                }}
                                renderInput={(params: any) => <TextField {...params} />}
                            />
                        </LocalizationProvider> */}
                    </Grid>
                </Grid>
                <Grid item>{`Статус ${data.status}`}</Grid>
                <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Дата начала"
                            inputFormat="MM/dd/yyyy"
                            value={dates.start}
                            onChange={(newValue: Date | null) => {
                                setDates({ start: newValue, end: dates.end })
                            }}
                            renderInput={(params: any) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Дата окончания"
                            inputFormat="MM/dd/yyyy"
                            value={dates.end}
                            onChange={(newValue: Date | null) => {
                                setDates({ start: dates.start, end: newValue })
                            }}
                            renderInput={(params: any) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
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
        </>
    );
};

export default withRequestService()(Manage);
