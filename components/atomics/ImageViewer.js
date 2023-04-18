import { Image, StyleSheet } from "react-native";

export default function ImageViewer({ placeholderImageSource, selectedImage, size = {} }) {
    const source = selectedImage ? { uri: selectedImage.uri } : placeholderImageSource;
    return (
        <Image style={[styles.image, size]} source={source}></Image>
    )
}


const styles = StyleSheet.create({
    image: {
      width: 320,
      height: '100%',
      borderRadius: 0
    }
  });
  