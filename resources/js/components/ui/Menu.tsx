import * as React from "react";
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Icon
} from "@mui/material";

import {
    PublicOutlined,
    FormatListBulletedOutlined,
    AnalyticsOutlined,
} from "@mui/icons-material";

import { NavLink, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Dictionary from "../../dictionary";

type StateProps = {
    role: string;
};

type Menu = {
    (dict: any): {
        [v: string]: {
            to: string;
            icon: JSX.Element | string;
            title: any;
        }[];
    };
};

const menuAllRoles: Menu = (dict) => {
    const menu = {
        admin: [
            {
                to: "/admin",
                icon: "info",
                title: dict.menu.admin.main,
            },
            {
                to: "/admin/listaskers",
                icon: "info",
                title: dict.menu.admin.list,
            },
        ],
        asker: [
            {
                to: "/asker",
                icon: <PublicOutlined />,
                title: dict.menu.asker.main,
            },
            {
                to: "/asker/surveys",
                icon: <FormatListBulletedOutlined />,
                title: dict.menu.asker.surveys,
            },
            {
                to: "/asker/analytics",
                icon: <AnalyticsOutlined />,
                title: dict.menu.asker.analytics,
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

    return menu;
};

const MainMenu = ({ role }: StateProps) => {
    const dict = Dictionary();
    const menu = menuAllRoles(dict);
    const menuItems = menu[role];
    const location = useLocation();

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
                                    component={NavLink}
                                    to={item.to}
                                    className='custom-link'
                                >
                                    <ListItemButton
                                        selected={location.pathname == item.to}
                                    >
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
