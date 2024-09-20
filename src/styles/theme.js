import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            light: '#E0E0E0',
            main: '#000000',
            dark: '#000000',
            contrastText: '#fff'
        },
        secondary: {
            light: '#01878645',
            main: '#018786',
            contrastText: '#000'
        }
    },
    typography: {
        fontFamily: "Assistant",
    }
}
)

export default theme