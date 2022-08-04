import React from "react";
import Grid from "@mui/material/Grid";

const Spinner = () => {
    return (
        <Grid container justifyContent="center">
            <Grid item >
                <div className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
            </Grid>
        </Grid>
    );
};

export default Spinner;
