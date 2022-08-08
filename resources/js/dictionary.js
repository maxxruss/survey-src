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
                profile: "Профиль"
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
        confirm: {
            appeal: 'Уважаемый пользователь!',
            please_confirm: 'На указанную Вами почту отправлено письмо. Для активации аккаунта и подтверждения почты пройдите по ссылке указанной в письме',
            success: { title: "Поздравляем!", text: "Ваша почта подтверждена" },
            error: { title: "Ошибка", text: "Пользователь не найден или уже подтвержден" }
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
                profile: "Profile"
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
            send: 'Send'
        },
        auth: {
            title: 'Auth',
            login: 'Login',
            password: 'Password',
            remember: 'Remember me',
            send: 'Send',
        },
        confirm: {
            appeal: 'Dear user!',
            please_confirm: 'An email has been sent to the email address you specified. For account activation and confirm email address you need follow link signed in letter',
            success: { title: "Congratulation!", text: "Your email has been confirmed" },
            error: { title: "Error", text: "The user has not been found or has already been confirmed." }

        },
        askers: {
            userFirstName: "first name",
            userMiddleName: "middle name",
            userLastName: "last name",
        }

    };

    const dict = lang == "en" ? en : ru;

    return dict;
}
