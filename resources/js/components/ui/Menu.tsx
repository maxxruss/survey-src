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
    FaceOutlined,
    PeopleOutline
} from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { DictTypes2Level } from "../TS/Types"

type StateProps = {
    role: string;
    lang: string;
};

type MenuTypes = {
    (dict: DictTypes2Level, lang: string): {
        [v: string]: {
            to: string;
            icon: JSX.Element | string;
            title: any;
        }[];
    };
};

const dict: DictTypes2Level = {
    admin: {
        main: { en: "Main", ru: "Главная" },
        list: { en: "ist of askers", ru: "Список заказчиков" },
    },
    asker: {
        main: { en: "Main", ru: "Главная" },
        surveys: { en: "Surveys", ru: "Опросы" },
        analytics: { en: "Analytics", ru: "Аналитика" },
        profile: { en: "Profile", ru: "Профиль" },
        responders: { en: "Responders", ru: "Респонденты" }
    },
    responder: {
        main: { en: "Survey", ru: "Опрос" },
    }

};

const menuAllRoles: MenuTypes = (dict, lang) => {
    const menu = {
        admin: [
            {
                to: "/admin",
                icon: "info",
                title: dict.admin.main[lang],
            },
            {
                to: "/admin/listaskers",
                icon: "info",
                title: dict.admin.list[lang],
            },
        ],
        asker: [
            {
                to: "/asker",
                icon: <PublicOutlined />,
                title: dict.asker.main[lang],
            },
            {
                to: "/asker/surveyslist",
                icon: <FormatListBulletedOutlined />,
                title: dict.asker.surveys[lang],
            },
            {
                to: "/asker/analytics",
                icon: <AnalyticsOutlined />,
                title: dict.asker.analytics[lang],
            },
            {
                to: "/asker/profile",
                icon: <FaceOutlined />,
                title: dict.asker.profile[lang],
            },
            {
                to: "/asker/responders",
                icon: <PeopleOutline />,
                title: dict.asker.responders[lang],
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

const Menu = ({ role, lang }: StateProps) => {
    const menu = menuAllRoles(dict, lang);
    const menuItems = menu[role];
    const location = useLocation();

    // console.log('lang: ', _.lang())

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
                                    className="custom-link"
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

const mapStateToProps = ({ role, lang }: StateProps) => {
    return { role, lang };
};

export default connect(mapStateToProps)(Menu);
