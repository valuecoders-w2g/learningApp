import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import standData from "../data/standData";

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

export default class StandBy extends Component {
  constructor(props) {
    super(props);
    this.state={
      OrientationStatus:"",
      boxWidth: 0,
      Width_Layout: "",
      Height_Layout: ""
    }
  }

  DetectOrientation() {
    let boxWidth = Math.round(this.state.Width_Layout / 2) - 12;
    if (this.state.Width_Layout > this.state.Height_Layout) {
      this.setState({
        OrientationStatus: "Landscape Mode",
        boxWidth: boxWidth
      });
    } else {
      this.setState({
        OrientationStatus: "Portrait Mode",
        boxWidth: boxWidth
      });
    }
  }

  render() {
    return (
      <View style={styles.container} onLayout={event =>
        {console.warn(event.nativeEvent.layout.width);
                  this.setState(
                    {
                      Width_Layout: event.nativeEvent.layout.width,
                      Height_Layout: event.nativeEvent.layout.height
                    },
                    () => this.DetectOrientation()
                  )}
        }>
        <View>
        <Text style={styles.welcome}>Chart</Text>
        </View>
        <View style={{ top: 5 }}>
          {standData.map((item, key) => {
            return (
              <View style={{ top: 5 }} key={key}>
                <View style={{ flexDirection: "row" }}>
                  <Text>{item.id}. </Text>
                  <Text>{item.name}</Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={{top: this.state.Height_Layout - 200, width:'100%'}}>
          <Text style={[styles.welcome, {textAlign:'left', marginHorizontal:0}]}>Registration info:</Text>
          <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize:17}}>URL</Text>
            <Text style={{fontSize:17}}>QR CODE</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    marginHorizontal:10
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
