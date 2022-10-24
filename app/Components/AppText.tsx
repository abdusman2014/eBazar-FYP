import React from 'react';
import {Text } from 'react-native';
import defaultStyles from '../Config/styles'


function AppText(props) {
    return (
        <Text
      {...props}
      style={[
        defaultStyles.typography.body.md.regular,
        { color: defaultStyles.Colors.grey900 },
        props.style,
      ]}
    >
      {props.children}
    </Text>
    );
}

export default AppText;