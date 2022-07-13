import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Dictionary from "../../dictionary";
import { useCookies } from "react-cookie";
import { toggleDrawer } from "../../redux/actions";
import { connect } from "react-redux";


type Props = {
    toggleDrawer: () => {};
};

const ButtonAppBar = ({ toggleDrawer }: Props)=> {
    const [cookies, setCookie] = useCookies();

    const dict = Dictionary();
    console.log("Dict: ", dict);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let lang = "";
        if (event.target.checked) {
            lang = "en";
        } else {
            lang = "ru";
        }

        setCookie("lang", lang);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
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
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        {dict.appBarTitle}
                    </Typography>
                    <Switch
                        checked={cookies.lang == "en"}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                        color="secondary"
                    />
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

const mapDispathToProps = { toggleDrawer };


export default connect(null, mapDispathToProps)(ButtonAppBar)
