import { View, Text, StyleSheet } from "react-native"

const TagItem = ({name, color}) => {
    return (
        <View style={[styles.tagContainer, { backgroundColor: color || 'lightblue' }]}>
            <Text style={styles.tagText}>{name}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    tagContainer: {
      //backgroundColor: color || 'lightblue', // Color of the rectangle
      borderRadius: 5, // Rounded corners
      paddingVertical: 3,
      paddingHorizontal: 6,
      marginRight: 5, // Margin between tags
    },
    tagText: {
      color: 'black', // Text color
      fontSize: 12, // Text size
      fontWeight: 'bold', // Text weight
    },
  });

export default TagItem