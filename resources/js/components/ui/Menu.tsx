import * as React from "react";
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Icon,
} from "@mui/material";
import {
    // useHistory,
    Link as RouterLink,
    LinkProps as RouterLinkProps,
    MemoryRouter as Router,
} from "react-router-dom";
import { connect } from "react-redux";

type StateProps = {
    role: string;
};

type Props = {
    role: string;
};

const listCommon = [
    {
        to: "/",
        icon: "home",
        title: "Главная",
    },
    {
        to: "/about",
        icon: "info",
        title: "О проекте",
    },
    {
        to: "/analytics",
        icon: "analytics",
        title: "Аналитика",
    },
];

const listAdmin = [
    {
        to: "/",
        icon: "home",
        title: "Главная",
    },
    {
        to: "/about",
        icon: "info",
        title: "О проекте",
    },
    {
        to: "/analytics",
        icon: "analytics",
        title: "Аналитика",
    },
];

const listAsker = [
    {
        to: "/",
        icon: "home",
        title: "Главная",
    },
    {
        to: "/about",
        icon: "info",
        title: "О проекте",
    },
    {
        to: "/analytics",
        icon: "analytics",
        title: "Аналитика",
    },
];

const MainMenu = ({ role }: Props) => {
    console.log("role: ", role);
    // const history = useHistory();

    // const about = async () => {
    //     history.push("/about");
    // };

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                }}
            >
                <nav aria-label="main mailbox folders">
                    <List>
                        {listCommon.map((item, i) => {
                            return (
                                <ListItem
                                    key={i}
                                    disablePadding
                                    component={RouterLink}
                                    to={item.to}
                                >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Icon>{item.icon}</Icon>
                                        </ListItemIcon>
                                        <ListItemText primary={item.title} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </nav>
                <Divider />
                <nav aria-label="secondary mailbox folders">
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary="Trash" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
            </Box>
        </>
    );
};

const mapStateToProps = ({ role }: StateProps) => {
    return { role };
};

export default connect(mapStateToProps)(MainMenu);
