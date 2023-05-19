import { MaterialIcons } from '@expo/vector-icons';
import { memo } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

export default memo(function FooterPicker({ label, visible, onClose, children }) {
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{label}</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" size={22} color="#fff" />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingLeft: 20,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});
