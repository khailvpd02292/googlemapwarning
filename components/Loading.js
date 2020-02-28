import React, { Component } from 'react'
import {ImageBackground } from 'react-native'
import {
    DotIndicator,
    BallIndicator,
} from 'react-native-indicators';
export class Loading extends Component {
    render() {
        return (
            <ImageBackground source={require('../image/page_bg_blur02.jpg')} style={{ width: '100%', height: '100%' }} >
                <BallIndicator color='white' />
            </ImageBackground>
        )
    }
}

export default Loading
