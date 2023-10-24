import React, {ReactNode, useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";

interface LazyTabViewProps {
    active: boolean;
    children: ReactNode,
}

export function LazyTabView({active, children}: LazyTabViewProps) {
    const [initialized, setInitialized] = useState(false);

    useEffect(
        () => {
            if (active && !initialized) {
                setInitialized(true);
            }
        },
        [active, initialized]);

    return initialized ? (
        <View style={!active && styles.hidden}>
          {children}
        </View>
    ) : <></>;
}

const styles = StyleSheet.create({
    hidden: {
        display: 'none',
    },
});
