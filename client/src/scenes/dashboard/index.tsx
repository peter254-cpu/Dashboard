import { Box, useMediaQuery, useTheme } from '@mui/material';
import Row from './Row';
import Row1 from './Row1';
import Row2 from './Row2';

interface Props {};
const gridTemplateLargeScreens = `
        "a b c"
        "a b c"
        "a b c"
        "a b f"
        "d e f"
        "d e f"
        "d h i"
        "g h i"
        "g h j"
        "g h j"
    `;
const gridTemplatSmallScreens = `
        "a"
        "a"
        "a"
        "b"
        "b"
        "b"
        "c"
        "c"
        "d"
        "d"
        "e"
        "e"
        "f"
        "f"
        "f"
        "g"
        "g"
        "g"
        "h"
        "h"
        "h"
        "h"
        "i"
        "i"
        "j"
        "j"
`

const Dashboard = (props: Props) => {
    const isAboveMediumScreens = useMediaQuery("(min-width:  1200px)")
    const { palette } = useTheme();

    return (
    <Box
        width = "100%"
        height = "100%"
        display = "grid"
        gap = "1.5rem"
        sx={
            isAboveMediumScreens
            ? {
                gridTemplateColumns: "repeate(3, min(370px, 1fr))",
                gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
                gridTemplateAreas: gridTemplateLargeScreens
            }
            : {
                gridTemplateTemplateColumns: "1fr",
                gridTemplateRows: "80px",
                gridTemplateAreas: gridTemplatSmallScreens
            }
        }
    >
        <Row />
        <Row1 />
        <Row2 />
    </Box>
    )
}

export default Dashboard
