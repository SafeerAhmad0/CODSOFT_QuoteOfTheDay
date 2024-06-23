import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Share,
  Button,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {heightRatio, widthRatio} from '../../Components/screenSize';
import AntDesign from '../../Components/VectorIcons';
import Toast from 'react-native-toast-message';
const MyComponent = () => {
  const [quoteData, setQuoteData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://zenquotes.io/api/today');
      if (!response.ok) {
        throw new Error(`Error fetching quote data: ${response.status}`);
      }
      const data = await response.json();
      setQuoteData(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const onShare = async () => {
    if (quoteData != null) {
      const message = `*Quote of the Day* \n"${quoteData[0].q}" \n - _${quoteData[0].a}_`;
      const shareOptions = {
        message,
        title: 'Quote of the Day',
      };
      await Share.share(shareOptions);
    }
  };

  const saveQuote = async quoteData => {
    if (quoteData) {
      const savedQuotesString = await AsyncStorage.getItem('savedQuotes');
      let savedQuotes = [];
      if (savedQuotesString) {
        savedQuotes = JSON.parse(savedQuotesString);
      }
      const quoteExists = savedQuotes.some(
        quote => quote[0].q === quoteData[0].q,
      );
      if (quoteExists) {
        showToast('Quote already exists!');
        return;
      }

      savedQuotes.push(quoteData);
      const updatedQuotesString = JSON.stringify(savedQuotes);
      await AsyncStorage.setItem('savedQuotes', updatedQuotesString);
      showToast('Quote saved successfully!');
    }
  };
  const showToast = message => {
    Toast.show({
      type: 'success',
      text1: message,
    });
  };

  return (
    <View>
      <Image
        source={require('C:/New folder/QuoteoftheDay/src/Assets/Images/q3.jpg')}
        style={{
          width: widthRatio(100),
          height: heightRatio(100),
          position: 'absolute',
        }}
      />
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="black"
          style={{height: heightRatio(80), alignContent: 'center'}}
        />
      )}
      {error && <Text>Error: {error}</Text>}
      {quoteData != null && (
        <View style={styles.savedQuoteContainer}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.savedQuoteText}>"{quoteData[0].q}"</Text>
            <Text style={styles.savedQuoteAuthor}>- {quoteData[0].a}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              top: 20,
              alignContent: 'flex-end',
              flexDirection: 'row-reverse',
            }}>
            <TouchableOpacity onPress={() => onShare(quoteData)}>
              <AntDesign nameIcon={'sharealt'} colorIcon={'black'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => saveQuote(quoteData)}
              style={{left: 10}}>
              <AntDesign nameIcon={'save'} colorIcon={'black'} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Toast ref={ref => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  savedQuoteContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: heightRatio(70),
  },
  savedQuoteText: {
    fontSize: 16,
    color: 'white',
  },
  savedQuoteAuthor: {
    fontSize: 12,
    fontStyle: 'italic',
    color: 'white',
  },
});

export default MyComponent;
