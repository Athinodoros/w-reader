import React, { useEffect, useState } from 'react';
import { GestureResponderEvent, StyleProp, Touchable, View, ViewStyle } from 'react-native';
import getJoyStickPossition from '../utils/JoyStickUtils';
import { Gesture, GestureDetector, GestureHandlerRootView, TouchableHighlight } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPause } from '@fortawesome/free-solid-svg-icons/faPause'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'

interface JoyStickProps {
    size: number,
    getInput: (x: number, y: number) => void
    onStateChange: (state: "paused" | "playing") => void
}

export default function JoyStick(props: JoyStickProps) {

    const [activeJoyStick, setActiveJoyStick] = useState(false);
    //used for translation
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    //starting
    const [xS, setXS] = useState(0);
    const [yS, setYS] = useState(0);

    const [tapMonitor, setTapMonitor] = useState(0);
    const [state, setState] = useState<"paused" | "playing">("playing")

    const getCleanValue = (threshold: number, position: number) => {
        if (position < 0) {
            return position < -threshold ? -threshold : position
        } else {
            return position > threshold ? threshold : position
        }
    }

    const onTouchMoveHandler = (event: GestureResponderEvent) => {
        let moveThreshold = props.size / 4;
        let xdiff = getCleanValue(moveThreshold, Math.round(event.nativeEvent.pageX) - xS);
        let ydiff = getCleanValue(moveThreshold, Math.round(event.nativeEvent.pageY) - yS);
        let { x, y } = getJoyStickPossition(moveThreshold, { xdiff, ydiff });
        setX(x);
        setY(y);
        //moveThreshold is 100% 
        props.getInput(xdiff * 100 / moveThreshold, -ydiff * 100 / moveThreshold)
    }

    const panStart = (event: GestureResponderEvent) => {
        setActiveJoyStick(true);
        setXS(Math.round(event.nativeEvent.pageX));
        setYS(Math.round(event.nativeEvent.pageY));
        setTapMonitor(new Date().getMilliseconds())
    }

    const resetPossition = () => {
        let timeLapsed = new Date().getMilliseconds() - tapMonitor;
        setX(0)
        setY(0)
        setActiveJoyStick(false);
        props.getInput(0, 0);

        if (timeLapsed < 200) {
            handleState()
        }
    }

    const handleState = () => {
        if (state == "paused") {
            setState('playing');
        } else {
            setState('paused');
        }
    }

    useEffect(() => { !activeJoyStick && resetPossition(); }, [activeJoyStick])
    useEffect(() => { props.onStateChange(state) }, [state])


    const styles: { [key: string]: StyleProp<ViewStyle> | Object } = {
        stickContainer: {
            backgroundColor: "#ccc",
            height: props.size,
            width: props.size,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: props.size / 2
        },
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        },
        stick: {
            position: "relative",
            backgroundColor: "#888",
            alignItems: "center",
            justifyContent: "center",
            height: props.size / 2,
            width: props.size / 2,
            borderRadius: props.size / 4
        }
    };


    return (

        <View style={styles.container}>
            <View style={styles.stickContainer}>

                <View
                    onTouchStart={panStart}
                    onTouchEnd={resetPossition}
                    onTouchMove={onTouchMoveHandler}
                    style={{ ...styles.stick, transform: [{ translateX: x }, { translateY: y }] }}>
                    {/* {state === "paused" && <FontAwesomeIcon size={40} icon={faPlay} ></FontAwesomeIcon>}
                    {state === "playing" && <FontAwesomeIcon size={40} icon={faPause} ></FontAwesomeIcon>} */}
                </View>
            </View>
        </View>
    );
}
