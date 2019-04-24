import React from 'react'
import { main } from '../../constants/colors'
import { Image, View } from 'react-native'
import Images from '../../shared/Images'
import { navStyle } from './standardNavigationOptionsStyles'

// Navigation Options that are shared across all areas of the app.
export const standardNavigationOptions = {
    headerStyle: {
        backgroundColor: main
    },
    headerTintColor: 'white',
    headerTitle: (
        <View style={navStyle.imageContainer }>
            <Image source = {Images.mainLogo51} />
        </View>
    )
}