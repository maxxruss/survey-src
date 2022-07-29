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
        error: {
            fieldRequired: "Обязательное поле",
        },
        reg: {
            title: 'Регистрация',
            company_title: "Наименование",
            inn: "ИНН",
            kpp: "КПП",
            company_address: "Адрес компании",
            company_manager: "ФИО менеджера компании",
            phone: "Телефон компании",
            email: "Электронная почта пользователя",
            login: "Логин",
            password: "Пароль",
            send: 'Отправить',
        },
        auth: {
            title: 'Авторизация',
            login: 'Логин',
            password: 'Пароль',
            remember: 'Запомнить меня',
            send: 'Отправить',
        },
        askers: {
            userFirstName: "Имя пользователя",
            userMiddleName: "Отчество пользователя",
            userLastName: "Фамилия пользователя",
        }

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
        error: {
            fieldRequired: "Required field",
        },
        reg: {
            title: "Registration",
            company_title: "Title",
            inn: "INN",
            kpp: "KPP",
            company_address: "Address of company",
            company_manager: "Manager of company",
            phone: "Phone of company",
            email: "User's E-mail",
            login: "Login",
            password: "Password",
            send: 'Send',
        },        
        auth: {
            title: 'Auth',
            login: 'Login',
            password: 'Password',
            remember: 'Remember me',
            send: 'Send',
        },

    };

    const dict = lang == "en" ? en : ru;

    return dict;
}
