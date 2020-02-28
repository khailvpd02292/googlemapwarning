import React, { Component } from 'react';
import {Image} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
export class MapViews extends Component {
    render() {
        const item = this.props
        return (
            <MapView
                style={{ flex: 1 }}
                region={item.region}
                onPress={item.onMapPress}
                minZoomLevel={14}
                maxZoomLevel={19}
            >
                <Marker coordinate={{
                     latitude: item.latitude,
                     longitude: item.longitude
                }}
                 title={"Vị trí của bạn"}
                >
                    <Icon
                        raised
                        name='circle'
                        type='font-awesome'
                        color='#1D50CE'
                        size={16}

                    />
                </Marker>
                {item.latitudenew !=0 && item.longitudenew !=0 
                ? <Marker coordinate={{
                    latitude: item.latitudenew,
                    longitude: item.longitudenew
                }}
                />
                :null          
            }              
                {item.FlatListWarning.length > 0 && item.FlatListWarning.map(marker => (
                    <Marker
                        coordinate={marker}
                        title={marker.value}
                    >
                        <Image source={{ uri: marker.Icon }} style={{ width: 20, height: 20 }} />
                    </Marker>
                ))}
            </MapView>
        )
    }
}

export default MapViews