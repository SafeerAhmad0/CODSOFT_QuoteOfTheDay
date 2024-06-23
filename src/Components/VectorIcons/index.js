import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const AntDesign = ({nameIcon, sizeIcon, colorIcon}) => {
  return (
    <View>
      <Icon name = {nameIcon} size={sizeIcon | 25} color={colorIcon} />
    </View>
  );
};

export default AntDesign;
