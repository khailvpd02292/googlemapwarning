import React, { Component } from 'react';
import {View, TouchableOpacity,FlatList, Alert} from 'react-native';
import { Button, CheckBox } from 'react-native-elements'
import Geolocation from '@react-native-community/geolocation';
import Modal from "react-native-modal";
import DeviceInfo from 'react-native-device-info';
import ContentBottomDrawer from './ContentBottomDrawer'
import MapViews from './MapViews'
import FilterScreen from './FilterScreen'
import Loading from './Loading';
console.disableYellowBox = true;
let uniqueId = DeviceInfo.getUniqueId();
export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            deviceId: null,
            latitude: 16.0282069,
            longitude: 108.2090777,
            latitudenew: 0,
            longitudenew: 0,
            FlatListTitle: [],
            loader: false,
            FlatListWarning: [],
            isModalVisible: false,
            checkBoxChecked: [],
            region: {
                latitude: 16.0282069,
                longitude: 108.2090777,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            },
            filter_name: ''
        }
        this.create = this.create.bind(this)
        this.onMapPress = this.onMapPress.bind(this)
        this.location = this.location.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        setInterval(() => {
            this.checklocation();
        }, 1000);
    }
    toggleModal = () => {
        this.setState({
            isModalVisible: !this.state.isModalVisible
        });
    };
    componentWillUnmount() {
        this.focusListener.remove();
    }
    UNSAFE_componentWillMount() {
        this.setState({
            loader: true,
            deviceId: uniqueId
        })
        this.location();
        this.getTitleWaring();
        this.getWarning();
    }
    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.getTitleWaring();
            this.getWarning()
        });
    }
    getTitleWaring = async () => {
        const arr = [];
        this.state.FlatListTitle = arr;
        fetch('http://192.168.56.1:3000/title', {
            method: 'GET'
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    FlatListTitle: [...responseJson]
                })
            })
            .catch(error => console.log(error))
    }
    addWarning(deviceId, value, latitude, longitude) {
        var dataToSend = { deviceId: deviceId, value: value, latitude: latitude, longitude: longitude };
        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch('http://192.168.56.1:3000/warning', {
            method: "POST",
            body: formBody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }
    getWarning = async (keyword) => {
        var http = `http://192.168.56.1:3000/warning`;
        const { checkBoxChecked } = this.state;
        var keyword = checkBoxChecked;
        if (keyword && keyword.length > 0) {
            http += `?${keyword.map(t => `value=${t}`).join("&")}`
        }
        fetch(http, {
            method: 'GET'
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    FlatListWarning: [...responseJson],
                    loader: false
                })
            })
            .catch(error => console.log(error))
    }
    getFilter = () => {
        const { filter_name } = this.state;
        const arr = [];
        this.state.FlatListTitle = arr;
        var http = `http://192.168.56.1:3000/filter/${filter_name}`;
        fetch(http, {
            method: 'GET'
        })
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    FlatListTitle: [...responseJson],
                })
                if (this.state.filter_name != '' && this.state.FlatListTitle == '') {
                    Alert.alert(
                        'Lỗi tìm kiếm',
                        'Dữ liệu không tồn tại',
                    )
                }
            })
            .catch(error => console.log(error))

    }
    filterName = async () => {
        if (this.state.filter_name == '') {
            Alert.alert(
                'Lỗi tìm kiếm',
                'Vui lòng nhập từ khóa tìm kiếm',
            )
        } else {
            await this.getFilter();
        }
    }
    checklocation() {
        Geolocation.getCurrentPosition(position => {
            if (this.state.latitude != position.coords.latitude) {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }
                });
            }
        },
            error => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 }
        );
    }
    location() {
        Geolocation.getCurrentPosition(position => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null,
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }
            });
        },
            error => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 }
        );
    }
    onMapPress(e) {
        this.setState({
            latitudenew: e.nativeEvent.coordinate.latitude,
            longitudenew: e.nativeEvent.coordinate.longitude,
            region: {
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }
        });
    }
    create() {
        const item = this.state;
        if (item.value == null || item.value == '') {
            Alert.alert(
                'Thêm thất bại',
                'Vui lòng chọn cảnh báo',
            )
        } else if (item.latitudenew == 0) {
            Alert.alert(
                'Thêm thất bại',
                'Vui lòng chọn vị trí cần cảnh báo trên bản đồ',
            )
        } else {
            Alert.alert(
                'Thông báo',
                'Bạn có chắc chắn muốn thêm cảnh báo',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK', onPress: () => {
                            this.addWarning(item.deviceId, item.value, item.latitudenew, item.longitudenew)
                            this.setState({
                                latitudenew: 0,
                                longitudenew: 0,
                            })
                            this.getWarning();
                        }
                    },
                ],
                { cancelable: false },
            );
        }
    }
    onclickcb = (value) => {
        const { checkBoxChecked } = this.state;
        const isInclude = checkBoxChecked.includes(value);
        if (!isInclude) {
            this.setState(state => ({
                checkBoxChecked: [...state.checkBoxChecked, ...[value]],
            }));
        } else {
            this.setState(state => ({
                checkBoxChecked: state.checkBoxChecked.filter(item => item !== value),
            }));
        }
    }
    closeModal() {
        this.getWarning();
        this.toggleModal();
        this.setState({
            filter_name: ''
        })
        this.getTitleWaring()
    }
    changeText = (filter_name) => {
        if (filter_name == '') {
            this.setState({
                filter_name
            })
            this.getTitleWaring()
        } else {
            this.setState({
                filter_name
            })
        }
    }
    changeValue = (value) => {
        this.setState({
            value
        })
    }
    render() {
        const item = this.state;
        if (item.loader) {
            return (
                <Loading />
            )
        }
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 3, backgroundColor: 'white' }}>
                    <MapViews
                        FlatListWarning={item.FlatListWarning}
                        region={item.region}
                        latitude={item.latitude}
                        longitude={item.longitude}
                        latitudenew={item.latitudenew}
                        longitudenew={item.longitudenew}
                        onMapPress={this.onMapPress}
                    />
                </View>
                <ContentBottomDrawer
                    FlatListTitle={item.FlatListTitle}
                    create={this.create}
                    value={item.value}
                    toggleModal={this.toggleModal}
                    location={this.location}
                    navigation={this.props.navigation}
                    changeValue={this.changeValue}
                />
                <Modal isVisible={item.isModalVisible} style={{ margin: 0, padding: 0 }}
                    backdropOpacity={1}
                    animationIn={'zoomInDown'}
                    animationOut={'zoomOutUp'}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                >
                     
                            <FilterScreen
                                closeModal={this.closeModal}
                                checkBoxChecked={item.checkBoxChecked}
                                FlatListTitle={item.FlatListTitle}
                                onclickcb={this.onclickcb}
                                changeText={this.changeText}
                                filter_name={item.filter_name}
                                filterName={this.filterName}
                            />                    
                    
                </Modal>
            </View>
        )
    }
}
