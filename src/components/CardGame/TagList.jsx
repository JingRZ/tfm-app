import React from 'react';
import { View, StyleSheet } from 'react-native';
import TagItem from './TagItem';
import ColorMap from '../../utils/TagColorMap';


const TagList = ({ tags }) => {
  return (
        <View style={styles.container}>
            {tags.map((tag, index) => (
            <TagItem key={index} name={tag} color={ColorMap[tag]}/>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse', // Arrange tags horizontally
    flexWrap: 'wrap', // Allow tags to wrap to the next line if needed
  },
});

export default TagList;
