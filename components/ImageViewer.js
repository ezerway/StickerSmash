import { Image, StyleSheet } from "react-native";

export default function ImageViewer({ placeholderImageSource, selectedImage, size = {} }) {
    const source = selectedImage ? { uri: selectedImage } : placeholderImageSource;
    return (
        <Image style={[styles.image, size]} source={source}></Image>
    )
}


const styles = StyleSheet.create({
    image: {
      width: 320,
      height: 440,
      borderRadius: 0
    }
  });
  