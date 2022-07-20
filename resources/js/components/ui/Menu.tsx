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
    PublicOutlined,
    FormatListBulletedOutlined,
    AnalyticsOutlined,
} from "@mui/icons-material";

import {
    Link as RouterLink,
    LinkProps as RouterLinkProps,
    MemoryRouter as Router,
} from "react-router-dom";
import { connect } from "react-redux";

type StateProps = {
    role: string;
};

type Menu = {
    [v: string]: { to: string; icon: JSX.Element | string; title: string }[];
};

const menuRoles: Menu = {
    admin: [
        {
            to: "/admin",
            icon: "info",
            title: "Админ - общее",
        },
        {
            to: "/admin/listaskers",
            icon: "info",
            title: "Админ - лист",
        },
    ],
    asker: [
        {
            to: "/asker",
            icon: <PublicOutlined />,
            title: "Главная",
        },
        {
            to: "/surveys",
            icon: <FormatListBulletedOutlined />,
            title: "Опросы",
        },
        {
            to: "/analytics",
            icon: <AnalyticsOutlined />,
            title: "Аналитика",
        },
    ],
    responder: [
        {
            to: "/admin",
            icon: "info",
            title: "Админ - общее",
        },
        {
            to: "/admin/listaskers",
            icon: "info",
            title: "Админ - лист",
        },
    ],
};

const MainMenu = ({ role }: StateProps) => {
    const menuItems = menuRoles[role];
    // console.log("role: ", role);
    // console.log("menuItems: ", menuItems);

    if (!menuItems) return null;

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
                        {menuItems.map((item, i) => {
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
