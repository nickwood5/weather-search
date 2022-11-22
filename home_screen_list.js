export const home_screen_list = StyleSheet.create({
    container: {
      marginTop: 14,
      alignSelf: "stretch",
    },
    row: {
      elevation: 1,
      borderRadius: 2,
      backgroundColor: colors.tertiary,
      flex: 1,
      flexDirection: "row", // main axis
      justifyContent: "flex-start", // main axis
      alignItems: "center", // cross axis
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 18,
      paddingRight: 16,
      marginLeft: 14,
      marginRight: 14,
      marginTop: 0,
      marginBottom: 6,
    },
    row_cell_timeplace: {
      flex: 1,
      flexDirection: "column",
    },
    row_cell_temp: {
      color: colors.weather_text_color,
      paddingLeft: 16,
      flex: 0,
      fontSize: values.font_temp_size,
      fontFamily: values.font_body,
    },
    row_time: {
      color: colors.weather_text_color,
      textAlignVertical: "bottom",
      includeFontPadding: false,
      flex: 0,
      fontSize: values.font_time_size,
      fontFamily: values.font_body,
    },
    row_place: {
      color: colors.weather_text_color,
      textAlignVertical: "top",
      includeFontPadding: false,
      flex: 0,
      fontSize: values.font_place_size,
      fontFamily: values.font_body,
    },
  })

  