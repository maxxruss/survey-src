import React from "react";
import { Grid } from "@mui/material";
import withRequestService from "../../../hoc/with-request-service";
// import MainMenu from "../../ui/Menu";

type Props = {
    requestService: {
        request: (method: object) => { result: string; data: any };
    };
};

const MainAsker = ({ requestService }: Props) => {
    const params = {
        id: 1,
        name: "max",
        password: 12345,
        method: "test",
    };

    var response = requestService.request({ url: "asker/test", params });
    console.log("response: ", response);

    if (response.result == "success") {
        console.log("response.data: ", response.data.params);
    }

    return (
        <>
            <Grid>{"MainAsker"}</Grid>
        </>
    );
};

export default withRequestService()(MainAsker);
