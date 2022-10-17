import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "./COLOR";
import { SafeAreaView } from "react-native-safe-area-context";
import Btn from "../components/Btn";

export default function LeaveListing({ route, navigation }) {
  const { leaveType, date, dateEnd, status, reason } = route.params;

  return (
    <LinearGradient
      style={styles.container}
      colors={[COLORS.linearStart, COLORS.linearEnd]}
    >
      <SafeAreaView style={{paddingHorizontal:7}}>
        <Text style={styles.headerText}>Leave Details</Text>

        <SafeAreaView>
          <View style={styles.viewText}>
            <Text style={{ fontWeight: "bold" }}>Leave Type:</Text>
            <Text style={styles.textstyle}>{leaveType}</Text>
          </View>
          <View style={styles.viewText}>
            <Text style={{ fontWeight: "bold" }}>Reason:</Text>
            <Text style={styles.textstyle}>{reason}</Text>
          </View>
          <View style={styles.viewText}>
            <Text style={{ fontWeight: "bold" }}>From Date:</Text>
            <Text style={styles.textstyle}>{date}</Text>
          </View>
          <View style={styles.viewText}>
            <Text style={{ fontWeight: "bold" }}>To Date:</Text>
            <Text style={styles.textstyle}>{dateEnd}</Text>
          </View>
          <View style={styles.viewText}>
            <Text style={{ fontWeight: "bold" }}>Status:</Text>
            <Text style={styles.textstyle}>{status}</Text>
          </View>
        </SafeAreaView>
        <Btn
          title="Close"
          style={styles.button}
          onClick={() => navigation.navigate("LeaveDetails")}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    color: COLORS.textColor,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  button: {
    width: "60%",
    backgroundColor: "#e0c222",
    marginHorizontal: "17%",
  },

  viewText: {
    backgroundColor: COLORS.leaveListColor,
    padding: 8,
    paddingHorizontal:13,
    paddingVertical:13,
    marginVertical:7,
    margin: 2,
    borderRadius: 10,
    elevation: 5,
    flexDirection: "row",
    justifyContent: 'flex-start',
  },
  textstyle:{
    marginHorizontal:8,
  }
});
