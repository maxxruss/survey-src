import * as React from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    Switch,
    IconButton,
    Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Dictionary from "../../dictionary";
import { useCookies } from "react-cookie";
import { toggleDrawer, authLogOut } from "../../redux/actions";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import compose from "../../utils/compose";
import withRequestService from "../hoc/with-request-service";

type Props = {
    auth: boolean;
    toggleDrawer: () => {};
    authLogOut: () => {};
    setAuth: (v: boolean) => {};
    requestService: {
        auth: (method: object) => { result: string };
    };
};

const ButtonAppBar = ({
    auth,
    toggleDrawer,
    authLogOut,
    setAuth,
    requestService,
}: Props) => {
    const history = useHistory();
    const [cookies, setCookie] = useCookies();

    const dict = Dictionary();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let lang = "";
        if (event.target.checked) {
            lang = "en";
        } else {
            lang = "ru";
        }

        setCookie("lang", lang);
    };

    const logout = async () => {
        var response = await requestService.auth({
            method: "logout",
        });

        if (response.result == "success") {
            authLogOut();
            setAuth(false);
            history.push("/signin");
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container>
                        <Grid item xs={1}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={toggleDrawer}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={2} style={{ alignSelf: "center" }}>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1 }}
                            >
                                {dict.appBarTitle}
                            </Typography>
                        </Grid>
                        <Grid item xs={7}></Grid>
                        <Grid item xs={1} style={{ alignSelf: "center" }}>
                            <Switch
                                checked={cookies.lang == "en"}
                                onChange={handleChange}
                                inputProps={{ "aria-label": "controlled" }}
                                color="secondary"
                            />
                        </Grid>
                        <Grid item xs={1} style={{ alignSelf: "center" }}>
                            {!auth ? null : (
                                <Button
                                    color="inherit"
                                    onClick={() => logout()}
                                >
                                    Logout
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

const mapDispathToProps = { toggleDrawer, authLogOut };

// export default connect(null, mapDispathToProps)(ButtonAppBar);

export default compose(
    withRequestService(),
    connect(null, mapDispathToProps)
)(ButtonAppBar);
