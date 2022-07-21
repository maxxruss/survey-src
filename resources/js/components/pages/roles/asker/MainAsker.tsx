import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import withRequestService from "../../../hoc/with-request-service";
import PageLayout from "../../../ui/PageLayout"

type Props = {
    requestService: {
        request: (method: object) => { result: string; data: any };
    };
};

const MainAsker = ({ requestService }: Props) => {
    const getData = async () => {
        const params = {
            id: 1,
            name: "max",
            password: 12345,
            method: "test",
        };

        let response = await requestService.request({
            url: "asker/test",
            params,
        });
        console.log("response: ", response);
    };

    useEffect(() => {
        getData();
    }, []);

    // let response = await getData(requestService)

    // var response = ;
    // console.log("response: ", response);

    // if (response.result == "success") {
    //     console.log("response.data: ", response.data.params);
    // }

    return (
        <PageLayout title='Главная'>
            <Grid>{"MainAsker"}</Grid>
        </PageLayout>
    );
};

export default withRequestService()(MainAsker);
