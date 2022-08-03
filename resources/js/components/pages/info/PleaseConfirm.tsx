import React from "react";
import Dictionary from "../../../dictionary";
import { Box, Typography } from "@mui/material";

const PleaseConfirm = () => {
    const dict = Dictionary();
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
                    {dict.reg.appeal}
                </Typography>
                <Typography
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    paragraph
                >
                    {dict.reg.please_confirm}
                </Typography>
            </Box>
        </>
    );
};

export default PleaseConfirm;
