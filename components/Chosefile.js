import React, { Component } from 'react'
import { Text, Image, TouchableOpacity } from 'react-native'
export class Chosefile extends Component {
    render() {
        return (
            <TouchableOpacity
                style={{
                    width: '70%', height: '70%',
                    borderColor: 'gray', borderRadius: 5, borderWidth: 1,
                    alignItems: 'center', justifyContent: 'center'
                }}
                onPress={this.props.ImagePicker}
            >
                {this.props.Icon == ''
                    ? <Text style={{ opacity: 0.4 }}>Không có tập tin nào được chọn</Text>
                    : <Image source={{ uri: this.props.Icon }} style={{ width: '80%', height: '80%' }} />
                }
            </TouchableOpacity>
        )
    }
}
export default Chosefile
