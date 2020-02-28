import React, { Component } from 'react'
import { Text, View, ScrollView, TextInput, 
    StyleSheet,TouchableWithoutFeedback,Keyboard
 } from 'react-native'
import { Button, CheckBox } from 'react-native-elements'
import AntDesign from 'react-native-vector-icons/AntDesign'
export class FilterScreen extends Component {
    render() {
        const item = this.props
        return (
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss} >
                <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 3 }}>
                    <View style={{ flex: 1.8 }}>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                            <Text style={{ fontSize: 28, color: 'blue' }} >Danh sách cảnh báo</Text>
                        </View>
                        <View style={{ flex: 0.8, flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column', flex: 7 }} >
                                <TextInput style={styles.inputs}
                                    placeholder="Tìm kiếm ..."
                                    placeholderTextColor="gray"
                                    onChangeText={filter_name => item.changeText(filter_name)}
                                    value={item.filter_name}
                                ></TextInput>
                            </View>
                            <View style={{ flexDirection: 'column', flex: 2, marginRight: 10 }}>
                                <Button
                                    onPress={() => item.filterName()}
                                    title="Tìm kiếm"
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 8.2 }}>
                        <View style={{ flex: 0.8, alignItems: 'flex-end' }}>
                            <View style={{ width: 88, marginRight: 10, marginTop: 16 }}>
                                <Button
                                    onPress={item.closeModal}
                                    title="Lọc"
                                    icon={
                                        <AntDesign
                                            raised
                                            name='filter'
                                            color='#f8fbfe'
                                            size={26}
                                        />
                                    }
                                />
                            </View>
                        </View>
                        <View style={{ flex: 6.5 }}>
                            <ScrollView>
                                {item.FlatListTitle.map((val) => {
                                    return (
                                        <View key={val.value} style={{ height: 50, paddingLeft: 20 }}>
                                            <CheckBox
                                                containerStyle={{ backgroundColor: 'white', borderWidth: 0, width: 250 }}
                                                textStyle={{ fontWeight: "normal", fontSize: 22 }}
                                                onPress={() => item.onclickcb(val.value)}
                                                checked={item.checkBoxChecked.includes(val.value)}
                                                title={val.value}
                                            />
                                        </View >
                                    )
                                }
                                )}
                            </ScrollView>
                        </View>
                        <View style={{ flex: 1.1 }}></View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    inputs: {
        paddingLeft: 10,
        height: 40,
        borderColor: '#c3c9c9',
        borderWidth: 1,
        borderRadius: 2,
        width: '90%',
        marginLeft: 20
    },
})
export default FilterScreen

