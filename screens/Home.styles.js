import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants/index";

const stylesHome = StyleSheet.create({
    container: {
        width: '100%'
    },
    welcomeTxt: {
        fontWeight: "bold",
        fontSize: SIZES.xxLarge,
        color: COLORS.green
    },
    buttonArea: {
        width: SIZES.width,
        height: SIZES.height,
        backgroundColor: COLORS.gray
    }
})

export default stylesHome;