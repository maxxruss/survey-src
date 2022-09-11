import * as React from "react";
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useCookies } from "react-cookie";
import { toggleDrawer, setLanguage } from "../../redux/actions";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import compose from "../../utils/compose";
import withRequestService from "../hoc/with-request-service";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { DictTypes } from "../TS/Types";

type Props = {
    auth: boolean;
    lang: string;
    drawerStatus: boolean;
    toggleDrawer: (v: boolean) => {};
    requestService: {
        auth: (method: object) => { result: string };
    };
    setLanguage: (lang: string) => {}
};

type StateProps = {
    auth: boolean;
    lang: string;
    drawerStatus: boolean;
};


const dict: DictTypes = {
    appBarTitle: { en: "Survey", ru: "Опросник" },
    logout: { en: "logout", ru: "Выйти" },
};

const ButtonAppBar = ({
    auth,
    lang,
    drawerStatus,
    toggleDrawer,    
    setLanguage
}: Props) => {
    const [cookies, setCookie] = useCookies();

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        lang: string
    ) => {
        setCookie("lang", lang);
        setLanguage(lang)
    };    

    const onToggleDrawer = (
        event: React.KeyboardEvent | React.MouseEvent
    ): void => {
        // само меню обернуто в ClickAwayListener и событие срабатывает (закрывается) при нажатии на любое место, вместо нажатия бургера в AppBar
        // поэтому останавливаем все остальные события, что бы не сработало событие компонента ClickAwayListener и меню переключилось (открылось или закрылось).
        event.stopPropagation();
        toggleDrawer(!drawerStatus);
    };

    const Burger = () => {
        if (!auth) {
            return null;
        } else {
            return (
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
            );
        }
    };

    return (
        <AppBar position="fixed" color="primary">
            <Toolbar>
                <Grid container>
                    <Grid item xs={1}>
                        <Burger />
                    </Grid>
                    <Grid item xs={2} style={{ alignSelf: "center" }}>
                        <Box component={NavLink} to="/" className="custom-link">
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1 }}
                            >
                                {dict.appBarTitle[lang]}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={7}></Grid>
                    <Grid item xs={2} style={{ alignSelf: "center" }}>
                        <ToggleButtonGroup
                            value={lang}
                            exclusive
                            onChange={handleChange}
                            aria-label="text alignment"
                        >
                            <ToggleButton value="ru" aria-label="left aligned">
                                {"RUS"}
                            </ToggleButton>
                            <ToggleButton value="en" aria-label="right aligned">
                                {"ENG"}
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>                    
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

const mapStateToProps = ({ auth, lang, drawerStatus }: StateProps) => {
    return { auth, lang, drawerStatus };
};

const mapDispathToProps = { toggleDrawer, setLanguage };

export default compose(
    withRequestService(),
    connect(mapStateToProps, mapDispathToProps)
)(ButtonAppBar);
