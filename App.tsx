import { StatusBar } from 'expo-status-bar';
import React, { createContext, useState } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import JoyStick from './components/joyStick';
import Reader from './components/reader';

export default function App() {


  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [state,setState] = useState<"paused"|"playing">('playing');

  
  const ReadingContext = createContext({}) 

  return (
    <View style={styles.container}>
      <Reader
        text={`It would depend on the length of the line you're putting in. For example with Some text entry here. This will be on each line... on each line, you would need 2300000 lines to get a file 112M in size. That took me about 3 tries to figure out. So just run that command with a random number for head count and the resultant size will guide you as to how to adjust it to get to the target size. Reading time (ms) per syllable dependent on the number of characters per syllable. The reading time per syllable is proportional to the number of characters per syllable. The slope of this line corresponds to the mean reading time per character for all 17 languages, which turns out to be 68 ms per character (95% CI of the means 65–71 ms) for 14 languages (except Arabic, Chinese, and Japanese). The SD of the residuals is 650 ms/syllable. In Japanese, one character can consist of more than one syllable and in Chinese, one character corresponds exactly to one syllable. Among the alphabetic languages, Arabic and Hebrew have the lowest number of characters per syllable because of the missing vowels. For the remaining alphabetic languages, Spanish has the lowest number of characters per syllable (1.95) and correspondingly the lowest reading time per syllable (116 ms). In Slovenian we observe the longest reading time per syllable (266 ms) together with the highest number of characters per syllable (3.8). `}
        readingSpeed={x}
        fontSize={y}
        state={state}
      ></Reader>
      <JoyStick
        size={200}
        getInput={(x: number, y: number) => {
          setX(x); setY(y);
        }}
        onStateChange={(state) => { setState(state);
         }} ></JoyStick>
      <Text>{x}%</Text>
      <Text>{y}%</Text>
    </View>
  );
}

const styles: { [key: string]: StyleProp<ViewStyle> } = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    flex: 1,
    alignContent: "space-between",
    flexDirection: "row",
    flexBasis: 4,
    width: "100%",
    backgroundColor: "#0000ff",
    justifyContent: 'space-around',
    alignItems: "center",
    display: "none"
  },
  mainContainer: {
    flex: 11
  }
});
