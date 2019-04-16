import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import MapView from 'react-native-maps';
import Icon from "react-native-vector-icons/Ionicons";
import { deletePlace } from "../../store/actions/index";

class PlaceDetail extends Component {
  state= {
    viewMode: 'portrait'
  };
  constructor(props) {
   super(props);
   Dimensions.addEventListener('change', this.updateStyles);
  }
  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }
  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };
  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();

  }

  render() {
    return (
      <View 
      style={[
        styles.container,
        this.state.viewMode === 'portrait' ? styles.portraitContainer : styles.landscapeContainer]}>
        <View style={styles.subConatiner}>
          <Image source={this.props.selectedPlace.image} style={styles.placeImage} />
          </View>

          <View style={styles.subConatiner}>
            <MapView initialRegion={{
              ...this.props.selectedPlace.location,
                latitudeDelta: 0,
                longitudeDelta:
                Dimensions.get('window').width / Dimensions.get("window").height * 0.0122
            }}
            style={styles.map}
            >
             <MapView.Marker coordinate={this.props.selectedPlace.location}/>
            </MapView>
          </View>

          <View style={styles.subConatiner}>
          <View>
          <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.placeDeletedHandler}>
            <View style={styles.deleteButton}>
              <Icon size={30} name="md-trash" color="red" />
            </View>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22, 
    flex: 1
  },
  portraitContainer:{
    flexDirection: 'column',
  }, 
  landscapeContainer:{
    flexDirection: 'row'
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  deleteButton: {
    alignItems: "center"
  },
  subConatiner:{
   flex: 1
  },
  map:{
    ...StyleSheet.absoluteFillObject
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: key => dispatch(deletePlace(key))
  };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);
