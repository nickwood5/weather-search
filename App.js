import { SelectList } from 'react-native-dropdown-select-list'
import { styles } from './styles.js'
import { countries } from "./countries.js"
import React, {Component, PureComponent, useRef, useState} from 'react';
import { ScrollView, Platform, View, Text, SafeAreaView, Image, FlatList} from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
var info = []

async function searchLatLon(lat, lon) {
  const url = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&appid=405d0ed5419e34de3d80b573dfc82e95'
  const response = await fetch(url);
  const data = await response.json()
  if ("cod" in data && data["cod"] != 200) {
    return null;
  }
  return data
}

async function searchCity(city, country_code) {
  const url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + ',' + country_code + '&limit=5&appid=405d0ed5419e34de3d80b573dfc82e95'
  const response = await fetch(url)
  const data = await response.json()

  if ("cod" in data && data["cod"] != 200) {
    return null;
  }

  if (data.length == 0) {
    return null;
  }

  var lat = data[0]["lat"];
  var lon = data[0]["lon"];
  return [lat, lon];
}

async function searchZip(zip, country_code) {
  const url = 'http://api.openweathermap.org/geo/1.0/zip?zip=' + zip + ',' + country_code + '&appid=405d0ed5419e34de3d80b573dfc82e95'
  const response = await fetch(url)
  const data = await response.json()

  if ("cod" in data && data["cod"] != 200) {
    return null
  }

  var lat = data["lat"];
  var lon = data["lon"];
  
  return [lat, lon];
}

function kelvinToCelcius(kelvin_temp) {
  return (kelvin_temp - 273.15).toFixed(1);
}

function unpackWeather(weather_info) {
  var result = [];
  const current = weather_info["current"]
  const current_extra = weather_info["daily"][0]
  var date = new Date(current["dt"])
  let formatted_date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full'}).format(date * 1000)
  result.push({
    desc: current["weather"][0]["main"],
    icon: current["weather"][0]["icon"],
    date: formatted_date,
    current_temp: kelvinToCelcius(current["temp"]),
    max_temp: kelvinToCelcius(current_extra["temp"]["max"]),
    min_temp: kelvinToCelcius(current_extra["temp"]["min"]),
    wind_speed: current_extra["wind_speed"],
    precip: current_extra["pop"],
    humidity: current_extra["humidity"]
  })
  const daily = weather_info["daily"];
  var day;
  for (let i = 1; i < daily.length; ++i) {
    day = daily[i]
    var date = new Date(day["dt"])
    let formatted_date = new Intl.DateTimeFormat('en-US', { dateStyle: 'full'}).format(date * 1000)
    result.push({
      desc: day["weather"][0]["main"],
      icon: day["weather"][0]["icon"],
      date: formatted_date,
      current_temp: kelvinToCelcius(day["temp"]["day"]),
      max_temp: kelvinToCelcius(day["temp"]["max"]),
      min_temp: kelvinToCelcius(day["temp"]["min"]),
      wind_speed: day["wind_speed"],
      precip: day["pop"],
      humidity: day["humidity"]
      
    })
  }

  return result
}

async function searchWeather(input, country_code) {
  if (input == '') {
    return null;
  }

  var zip_latlon = await searchZip(input, country_code)

  if (zip_latlon == null) {
    // Input was not a zip code; try to search city
    var city_latlon = await searchCity(input, country_code);
    
    if (city_latlon != null) {
      var data = await searchLatLon(city_latlon[0], city_latlon[1])
      return unpackWeather(data)
    }
  } else {
    var data = await searchLatLon(zip_latlon[0], zip_latlon[1])
    return unpackWeather(data)
  }
  return null;
}


const App = () => {
  
  const [myList, setMyList] = useState(info)
  const [selected, setSelected] = React.useState("");
  const [text,setText] = useState('');

  const [errorText,setErrorText] = useState('');

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.weather_card}>
        <Text>{item.date}</Text>
        <View style={styles.cols}>
        <Image style={styles.cardImage} source={{uri: "http://openweathermap.org/img/wn/" + item.icon + "@2x.png"}}></Image>
          <Text style={styles.titleText}>{item.desc}     {item.current_temp}°C</Text>
        </View>
 
        <View style={styles.cols}>
          <Text style={styles.item}>High{"\n"}{item.max_temp}</Text>
          <Text style={styles.item}>Low{"\n"}{item.min_temp}</Text>
          <Text style={styles.item}>Precip{"\n"}{item.precip}</Text>
          <Text style={styles.item}>Wind{"\n"}{item.wind_speed}</Text>
          <Text style={styles.item}>HMD{"\n"}{item.humidity}</Text>
        </View>

      </View>
    )
  }

  return(
    <SafeAreaView style={styles.container}>
      <SelectList 
        setSelected={(val) => {
          setSelected(val);
          setMyList([]);
          setText('');
          setErrorText('');
        }} 
        onClear
        data={countries} 
        save="key"
        searchPlaceholder="Search country"
        defaultOption={{ key:'CA', value:'Canada' }}
      />
    
      <View style={styles.above}>
        <SearchBar
        
          placeholder="Enter city name or zip code"
          onBlur={ 
            async() => {
              var result = await searchWeather(text, selected)
              if (result == null) {
                setMyList([]);
                setErrorText("City or zip '" + text + "' not found")
              } else {
                setMyList(result)
                setErrorText("Weather for: " + text + ", " + selected)
              }
            }
          }
          onChangeText={(text) => {
            setText(text)
            setMyList([]);
            setErrorText("")
          }}
          onClearPress={() => {
            setMyList([]);
            setErrorText("")
          }}
          clearButtonMode="while-editing"
          value={text}
        />
        <Text style={styles.text}>{errorText}</Text>
      </View>
      
      <FlatList
        data={myList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={_renderItem}
      />
    </SafeAreaView>
  )
};



export default App;