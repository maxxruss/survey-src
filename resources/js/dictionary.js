import { useCookies } from "react-cookie";

export default function Dictionary() {
    const [cookies] = useCookies();
    const { lang } = cookies;

    const ru = {
        appBarTitle: "Опросник",
        logout: "Выйти",
        menu: {
            admin: {
                main: "Главная",
                list: "Список заказчиков",
            },
            asker: {
                main: "Главная",
                surveys: "Опросы",
                analytics: "Аналитика",
            },
            responder: {
                main: "Опрос",
            },

        },

    };

    const en = {
        appBarTitle: "Survey",
        logout: "logout",
        menu: {
            admin: {
                main: "Main",
                list: "List of askers",
            },
            asker: {
                main: "Main",
                surveys: "Surveys",
                analytics: "Analytics",
            },
            responder: {
                main: "Survey",
            },

        },

    };

    const dict = lang == "en" ? en : ru;

    return dict;
}
