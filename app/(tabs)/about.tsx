import { router } from 'expo-router'
import React from 'react'
import {Pressable, Text, View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'



const AboutScreen = () => {
    return(
        <SafeAreaView>
            <Text>About Screen</Text>
            <Pressable onPress={() => router.push("/storybook")} >
                Abrir Storybook
                </Pressable>
        </SafeAreaView>
    )
}

export default AboutScreen;