import React, { CSSProperties, useEffect, useState } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';

interface ReaderProps {
    text: string,
    readingSpeed: number,
    fontSize: number,
    state:"paused"|"playing"
}

export default function Reader(props: ReaderProps) {

    const [words, setWords] = useState<string[]>(props.text.split(" "))
    const [nextIndex, setNextIndex] = useState(0);

    const [hasNext, setHasNext] = useState(false);
    const [activeWord, setActiveWord] = useState("");

    const [readingSpeed, setReadingSpeed] = useState(props.readingSpeed)
    const [fontSize, setFontSize] = useState(props.fontSize)

    const [timer,setTimer] = useState(0)
    const initializeWords = () => {
        setReadingSpeed(props.readingSpeed);
        setFontSize(props.fontSize);
        setHasNext(true);
        console.log("initialized words", readingSpeed, nextIndex, words.length);
        startNext();
    }

    const startReading = (index?:number) => {
        console.log("starting the read",index && index>=0);
        if(index && index>0){

            setNextIndex(nextIndex-1)
        }else{
            startNext()
        }
    }

    const getFontSize = () => {
        if (fontSize == -100) {
            return 20;
        } else if (fontSize == 100) {
            return 50;
        } else if (fontSize==0) {
            return 35
        } else {
            if (fontSize < 0) {
                return 20 + 15 / Math.abs(fontSize)
            } else {
                return 35 + 15 / Math.abs(fontSize)
            }
        }
    }

    const pauseResume = (state)=>{
        console.log("state changed :",state);
        console.log("timer",timer);
        
        if(state=="paused"){
            clearTimeout(timer);
        }else{
            console.log("starting again at index :",nextIndex);
            startNext();
        }
    }

    const startNext = ()=>{
        if(props.state!=="paused"){
            let t = setTimeout(() => {
                if (readingSpeed >= 0) {
                    setNextIndex(nextIndex + 1)
                } else {
                    if (nextIndex > 0) {
                        setNextIndex(nextIndex - 1)
                    } else {
                        setNextIndex(nextIndex + 1)
                    }
                }
            }, words[nextIndex].length * (75 - Math.abs(readingSpeed/3)));
            
            setTimer(t)
        }
    }
    useEffect(() => {
        setActiveWord(words[nextIndex]);
        console.log("should start",words[nextIndex + 1] && props.state=="playing");
        
        if (words[nextIndex + 1] && props.state=="playing") {
           startNext();
        } else if(!words[nextIndex+1]) {            
            setHasNext(false)
        }
    }, [nextIndex])


    

    useEffect(() => { setHasNext(true) }, [words])
    useEffect(() => { setReadingSpeed(props.readingSpeed) }, [props.readingSpeed])
    useEffect(() => { setFontSize(props.fontSize) }, [props.fontSize])
    useEffect(() => { setWords(props.text.split(" ")) }, [props.text])
    // useEffect(() => { pauseResume(props.state) }, [props.state])
    useEffect(initializeWords, [])

    const styles: { [key: string]: StyleProp<ViewStyle|TextStyle> } = {
        stickContainer: {
            backgroundColor: "#ccc",
            justifyContent: "center",
            alignItems: "center",
        },
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        },
        text: {
            fontSize: getFontSize()
        }
    };

    return (
        <View style={styles.container}>
            <Text>index: {nextIndex}</Text>
            {hasNext &&
                <Text style={styles.text}>{activeWord}</Text>
            }

            {!hasNext &&
                <Text>Thanks for reading!</Text>
            }

        </View>
    );
}
