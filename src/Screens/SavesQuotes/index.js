import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Share,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '../../Components/VectorIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';

const SavedQuote = () => {
  const [savedQuotes, setSavedQuotes] = useState([]);

  const retrieveSavedQuotes = async () => {
    try {
      const savedQuotesString = await AsyncStorage.getItem('savedQuotes');
      // console.log('~~~>', savedQuotesString);
      if (savedQuotesString) {
        const parsedQuotes = JSON.parse(savedQuotesString);
        setSavedQuotes(parsedQuotes);
      } else {
        setSavedQuotes([]);
      }
    } catch (error) {
      console.error('Error retrieving saved quotes:', error);
    }
  };

  useEffect(() => {
    retrieveSavedQuotes();
  }, []);

  useFocusEffect(
    useCallback(() => {
      retrieveSavedQuotes();
    }, []),
  );

  const onShare = async quote => {
    const message = `*Quote of the Day* \n"${quote[0].q}" \n - _${quote[0].a}_`;

    const shareOptions = {
      message,
      title: 'Saved Quote',
    };
    await Share.share(shareOptions);
  };

  return (
    <LinearGradient
      colors={['lavender', 'lightblue']}
      style={{
        height: '100%',
      }}>
      <View>
        {savedQuotes.length > 0 ? (
          <FlatList
            data={savedQuotes}
            renderItem={({item, index}) => (
              <View style={styles.savedQuoteContainer}>
                <Text style={styles.savedQuoteText}>" {item[0].q} "</Text>
                <Text style={styles.savedQuoteAuthor}>- {item[0].a}</Text>
                <TouchableOpacity
                  onPress={() => onShare(item)}
                  style={{
                    flexDirection: 'row-reverse',
                    alignContent: 'flex-end',
                    right: 10,
                  }}>
                  <AntDesign nameIcon={'sharealt'} />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
            }}>
            No quote saved yet.
          </Text>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  savedQuoteContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    backgroundColor: 'lightorange',
  },
  savedQuoteText: {
    fontSize: 16,
  },
  savedQuoteAuthor: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default SavedQuote;
