import React, {FC} from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";

type Props = {
    onPress: () => void
}

const Button: FC<Props> = ({children, onPress}) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >
            <Text>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        backgroundColor: 'grey',
        width: 100,
        height: 50,
        margin: 5
    }
})

export default Button;
