import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({

    hidden: {
      opacity:"0%"
    },

    weather_card: {
      borderRadius:20,
      height: 180,
      padding: 20,
      marginTop: 20,
      backgroundColor: "#ADD8E6"
    },

    item: {
      width: "18%",
      height: 40,
      margin: 2,
    },

    container: {
      margin: 20,
    },

    text: {
      marginTop: 20,
      fontSize: 18,
      marginHorizontal: 20,
      fontWeight: '500',
      textAlign: "center"
    },

    center: {
      paddingTop: 35,
      alignItems: "center",
      justifyContent: "center",
      flex: 1
    },

    cols: {
      flexDirection: 'row',
      flex: 1,
      flexWrap: "wrap",
      alignItems: "flex-start"
    },

    titleText: {
      paddingTop: 20,
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      fontSize: 20,
      fontWeight: "bold"
    },

    above: {
      paddingTop: 20
    },

    container2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },

    cardtext: {
      fontSize: 30
    },

    card: {
      backgroundColor: "#fff",
      marginBottom: 10,
      marginLeft: "2%",
      width: "96%",
      shadowColor: "#000",
      shadowOpacity: 1,
      shadowOffset: {
        width: 3,
        height: 3
      }
    },
    
    cardImage: {
      margin:0,
      width: 75,
      height: 75,
      resizeMode: 'cover'
    }

});