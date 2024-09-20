import { ImageBackground, StatusBar } from 'react-native';
import BG_dark from './src/assets/hero-pattern-dark.png';
import BG_white from './src/assets/hero-pattern.png';

import Login from './src/screens/login';
import Abertos from './src/screens/abertos'

import Navbar from './src/screens/navbar'
import Alerts from './src/screens/alerts'
import style from './src/style';

export default function App() {
  return (
    <ImageBackground
      source={BG_white}
      imageStyle={{
        resizeMode: 'repeat',

      }}
      style={{
        width: '100%',
        height: '100%'
      }}>
      <Navbar />
      <Login/>
      <Abertos />
      <Alerts />
      

      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
    </ImageBackground >
  );
}
//<Abertos />