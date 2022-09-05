import React from "react";
import { Box, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { DictTypes } from "../../TS/Types";
import { connect } from "react-redux";

const dict: DictTypes = {
    appeal: { en: "Dear user!", ru: 'Уважаемый пользователь!' },
    pleaseConfirm: { en: "An email has been sent to the email address you specified. For account activation and confirm email address you need follow link signed in letter", ru: 'На указанную Вами почту отправлено письмо. Для активации аккаунта и подтверждения почты пройдите по ссылке указанной в письме' },
};

const PleaseConfirm = ({ lang }: { lang: string }) => {
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
                    {dict.appeal[lang]}
                </Typography>
                <Typography
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    paragraph
                >
                    {dict.pleaseConfirm[lang]}
                </Typography>
            </Box>
        </>
    );
};

const mapStateToProps = ({ lang }: { lang: string }) => {
    return { lang };
};

export default connect(mapStateToProps)(PleaseConfirm);
