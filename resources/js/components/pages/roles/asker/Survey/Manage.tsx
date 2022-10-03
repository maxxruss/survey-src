import React, { useEffect } from "react";
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
    IconButton
} from "@mui/material";
import { PlayArrow, Stop } from '@mui/icons-material';
import withRequestService from "../../../../hoc/with-request-service";

type PropTypes = {
    id: number | string;
    requestService: {
        id: number | string;
        request: (method: object) => {
            result: string;
            data: { [key: string]: string };
        };
    };
};

const Manage = ({ id, requestService }: PropTypes) => {

    const getData = async () => {
        console.log('id: ', id)
        const response = await requestService.request({
            url: "asker/survey/getInfo/" + id,
            method: 'get',
        });

        if (response.result == "success") {
            console.log('getData - success')
        }
    };

    const startSurvey = async () => {
        const response = await requestService.request({
            url: "asker/survey/start/" + id,
            method: 'get',
        });

        if (response.result == "success") {
            console.log('startSurvey - success')
        }
    }

    const stopSurvey = async () => {
        const response = await requestService.request({
            url: "asker/survey/stop/" + id,
            method: 'get',
        });

        if (response.result == "success") {
            console.log('startSurvey - success')
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Grid>
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
                    onClick={() => stopSurvey()}
                >
                    <Stop fontSize="inherit" />
                </IconButton>
            </Grid>
        </>
    )

}

export default withRequestService()(Manage);

