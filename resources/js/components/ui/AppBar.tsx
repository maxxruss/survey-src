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
    drawerStatus: boolean;
    toggleDrawer: (v: boolean) => {};
    authLogOut: () => {};
    requestService: {
        auth: (method: object) => { result: string };
    };
};

type StateProps = {
    auth: boolean;
    drawerStatus: boolean;
};

const ButtonAppBar = ({
    auth,
    drawerStatus,
    toggleDrawer,
    authLogOut,
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
            history.push("/signin");
        }
    };

    const onToggleDrawer = (
        event: React.KeyboardEvent | React.MouseEvent
    ): void => {
        // само меню обернуто в ClickAwayListener и событие срабатывает (закрывается) при нажатии на любое место, вместо нажатия бургера в AppBar
        // поэтому останавливаем все остальные события, что бы не сработало событие компонента ClickAwayListener и меню переключилось (открылось или закрылось).
        event.stopPropagation();
        toggleDrawer(!drawerStatus);
    };

    return (
        <AppBar position="fixed" color="primary">
            <Toolbar>
                <Grid container>
                    <Grid item xs={1}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={(e) => onToggleDrawer(e)}
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
                            <Button color="inherit" onClick={() => logout()}>
                                {dict.logout}
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

const mapStateToProps = ({ auth, drawerStatus }: StateProps) => {
    return { auth, drawerStatus };
};

const mapDispathToProps = { toggleDrawer, authLogOut };

export default compose(
    withRequestService(),
    connect(mapStateToProps, mapDispathToProps)
)(ButtonAppBar);
