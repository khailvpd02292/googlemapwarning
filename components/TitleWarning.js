import React, { Component } from 'react'
import {
    StyleSheet, View, ImageBackground, TextInput,
    Alert, Keyboard, TouchableWithoutFeedback
} from 'react-native'
import validator from 'validator';
import { Button } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import Chosefile from './Chosefile'
const options = {
    title: 'Chọn hình ảnh',
    takePhotoButtonTitle: 'Máy ảnh',
    chooseFromLibraryButtonTitle: 'Chọn từ thư viện ảnh',
};
export default class TitleWarning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            FlatListTitle: [],
            Icon: '',
        },
            this.create = this.create.bind(this);
        this.ImagePicker = this.ImagePicker.bind(this)
    }

    
    getData(value, Icon) {
        var dataToSend = { value: value, Icon: Icon };
        var formBody = [];
        for (var key in dataToSend) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch('http://192.168.56.1:3000/title', {
            method: "POST",
            body: formBody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson);
            })
            .catch((error) => {
                alert(JSON.stringify(error));
                console.error(error);
            });
    }
    getTitleWaring = async () => {
        fetch('http://192.168.56.1:3000/title')
            .then(response => response.json())
            .then((responseJson) => {
                this.setState({
                    FlatListTitle: [...responseJson]
                })
            })
            .catch(error => console.log(error))
    }
    UNSAFE_componentWillMount = () => {
        this.getTitleWaring();
    }
    clearText = () => {
        this._textInput.setNativeProps({ text: '' });
    }
    create() {
        let strims = this.state.value.trim();
        let cutspace = (strims.substring(0, 1).toUpperCase() + strims.substring(1).toLowerCase());
        for (let i = 0; i < this.state.FlatListTitle.length; i++) {
            if (this.state.FlatListTitle[i].value == cutspace) {
                return (Alert.alert(
                    'Thêm thất bại',
                    'Dữ liệu đã tồn tại',
                ),
                    this.clearText(),
                    this.setState({
                        Icon: '',
                    })
                );
            }
        }
        if (validator.isEmpty(cutspace) || cutspace == '') {
            Alert.alert(
                'Thêm thất bại',
                'Vui lòng không để trống trường cảnh báo',
            )
        } else if (this.state.Icon == '') {
            Alert.alert(
                'Thêm thất bại',
                'Vui lòng chọn hình ảnh phù hợp',
            )
        } else {
            this.getData(cutspace, this.state.Icon);
            this.props.navigation.navigate('Home')
        }
    }
    ImagePicker = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                alert('error' + response.error)
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else if (response.data.length > 65435) {
                alert('Dữ liệu ảnh vượt quá dung lượng cho phép')
            } else {
                const source = 'data:image/jpeg;base64,' + response.data;
                this.setState({
                    Icon: source,
                });
            }
        });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={require('../image/page_bg_blur02.jpg')} style={{ flex: 1 }} >
                    <TouchableWithoutFeedback style={{ flex: 1, flexDirection: 'column' }} onPress={Keyboard.dismiss} >
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <View style={{ flex: 3.5, marginTop: 40, marginBottom: 14 }}>
                                <TextInput style={styles.inputs}
                                    placeholder="Nhập tên cảnh báo"
                                    placeholderTextColor="gray"
                                    returnKeyType='next'
                                    onChangeText={value => this.setState({ value })}
                                    value={this.state.value}
                                    ref={component => this._textInput = component}
                                ></TextInput>
                                <View style={styles.buttons}>
                                    <Button
                                        onPress={this.create}
                                        title="Thêm mới" />
                                </View>
                            </View>
                            <View style={{ flex: 7.5, margin: 'auto', alignItems: "center", marginTop: 40 }}>
                                <Chosefile
                                    ImagePicker={this.ImagePicker}
                                    Icon={this.state.Icon}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ImageBackground>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    inputs: {
        height: 40,
        borderColor: '#c3c9c9',
        borderWidth: 1,
        borderRadius: 2,
        width: '90%',
        backgroundColor: '#cdd1d1',
        marginLeft: 20,
        marginBottom: 20,
        paddingLeft: 20
    },
    buttons: {
        height: 40,
        borderRadius: 2,
        width: '90%',
        marginLeft: 20,
        marginBottom: 4
    }
})