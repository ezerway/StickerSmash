import { useState } from "react";
import { FlatList, Image, Platform, Pressable, StyleSheet } from "react-native";

export default function EmojiList({ onClose, onSelect }) {
    const [emojis] = useState([
    ]);

    return (
        <FlatList
        horizontal
        contentContainerStyle={styles.listContainer}
        data={emojis}
        showsHorizontalScrollIndicator={Platform.OS === 'web'}
        renderItem={({ item, index})=> (
        <Pressable key={index} onPress={() => {
            onSelect(item);
            onClose();
        }}>
            <Image source={item} style={styles.image}/>
        </Pressable>)}>
        </FlatList>
    )
}

const styles = StyleSheet.create({
    listContainer: {
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    image: {
      width: 100,
      height: 100,
      marginRight: 20,
    },
  });