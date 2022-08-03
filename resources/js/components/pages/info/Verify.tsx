import React from "react";
import Dictionary from "../../../dictionary";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import withRequestService from "../../hoc/with-request-service";
import Spinner from "../../spinner";

type Props = {
    requestService: {
        request: (method: object) => { result: string; data: any };
    };
};

const Verify = ({ requestService }: Props) => {
    const dict = Dictionary();

    const { search }: { search: string } = useLocation();
    const query = new URLSearchParams(search);
    const [verify, setVerify] = React.useState("");

    const token = query.get("token");

    const params = { token: token };

    async function onVerify() {
        let response = await requestService.request({
            url: "verify",
            params,
        });

        setVerify(response.result);
    }

    React.useEffect(() => {
        onVerify();
    }, []);

    if (!verify) return <Spinner />;

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
                    {verify == "success" ? "Поздравляем!" : "Ошибка"}
                </Typography>
                <Typography
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    paragraph
                >
                    {verify == "success"
                        ? "Ваша почта подтверждена"
                        : "Пользователь не найден или уже подтвержден"}
                </Typography>
            </Box>
        </>
    );
};

export default withRequestService()(Verify);
