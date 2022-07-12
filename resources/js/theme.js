import { createTheme } from "@mui/material/styles";
import { ruRU, enUS } from "@mui/material/locale";
import { useCookies } from "react-cookie";

const getTheme = () => {   
    const [cookies] = useCookies();
    const { lang } = cookies;

    return createTheme(
        {
            palette: {
                primary: { main: "#1976d2" },
            },
        },
        lang == "en" ? enUS : ruRU
    );
};

export default getTheme;
