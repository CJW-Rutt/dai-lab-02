import { View, StyleSheet, Text } from "react-native"
import UserLogout from "../../firebase/UserLogout";
import Chart from "../Chart/index";
import AppleInfo from "../../api/AppleInfo";

import { SIZES } from "../../constants";

export default function LoggedInView() {
    return(
        <View style={styles.container}>
            
            <UserLogout />
            <Text style={styles.salaryLine}>Average Starting Salary:</Text>
            <Chart />
            <AppleInfo />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#353839',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    salaryLine: {
        flex: 0,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        width: SIZES.width,
        textAlign: "left",
        paddingBottom: 5,
        paddingLeft: 5,
    }
});