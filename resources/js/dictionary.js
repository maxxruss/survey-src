import { useCookies } from "react-cookie";

export default function Dictionary() {
    const [cookies] = useCookies();
    const { lang } = cookies;

    const ru = {
        appBarTitle: "Опросник",
    };

    const en = {
        appBarTitle: "Survey",
    };

    const dict = lang == "en" ? en : ru;

    return dict;
}
