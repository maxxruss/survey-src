import React from "react";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import withRequestService from "../../hoc/with-request-service";
import Spinner from "../../spinner";
import { useHistory } from "react-router-dom";
import { DictTypes } from "../../TS/Types";
import compose from "../../../utils/compose";
import { connect } from "react-redux";

const dict: DictTypes = {
    successTitle: { en: "Congratulation!", ru: 'Поздравляем!' },
    successText: { en: "Your email has been confirmed", ru: 'Ваша почта подтверждена' },
    errorTitle: { en: "Error!", ru: 'Ошибка!' },
    errorText: { en: "The user has not been found or has already been confirmed.", ru: 'Пользователь не найден или уже подтвержден' }
};

type Props = {
    requestService: {
        request: (method: object) => { result: string; data: any };
    };
    lang: string;
};

const Verify = ({ requestService, lang }: Props) => {
    const history = useHistory();

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

        if (response.result) {
            setVerify(response.result);
            setTimeout(() => {
                history.push("/");
            }, 5000);
        }
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
                    {verify == "success"
                        ? dict.successTitle[lang]
                        : dict.errorTitle[lang]}
                </Typography>
                <Typography
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    paragraph
                >
                    {verify == "success"
                        ? dict.successText[lang]
                        : dict.errorText[lang]}
                </Typography>
            </Box>
        </>
    );
};

const mapStateToProps = ({ lang }: { lang: string }) => {
    return { lang };
};

export default compose(
    withRequestService(),
    connect(mapStateToProps)
)(Verify);