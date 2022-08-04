import React from "react";
import Dictionary from "../../../dictionary";
import { Box, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

const PleaseConfirm = () => {
    const dict = Dictionary();
    const history = useHistory();

    React.useEffect(() => {
        setTimeout(() => {
            history.push("/");
        }, 5000);
    }, []);

    return (
        <>
            <Box pt={5}>
                <Typography
                    component="h3"
                    variant="h3"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                >
                    {dict.confirm.appeal}
                </Typography>
                <Typography
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    paragraph
                >
                    {dict.confirm.please_confirm}
                </Typography>
            </Box>
        </>
    );
};

export default PleaseConfirm;
