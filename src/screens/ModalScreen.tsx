import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Modal,
  Button,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

const ModalScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [datalist, setDatalist] = useState([]);
  const {colors} = useTheme();

  const happenedHandler = () => {
    const newData = [...datalist];
    if (newData.length === 0) {
      newData.push('Did something...');
    } else {
      newData.push('And again...');
    }
    setDatalist(newData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={showModal} animationType={'fade'} transparent>
        <View style={styles.modalViewWrapper}>
          <View style={styles.modalView}>
            <Text>Cool!</Text>
            <View style={styles.buttonZone}>
              <Button
                style={styles.buttons}
                title={'Do something'}
                color="red"
                onPress={() => {
                  Alert.alert('Something happened....');
                  happenedHandler();
                  setShowModal(!showModal);
                }}
              />
              <Button
                style={styles.buttons}
                title={"Won't do!"}
                color="blue"
                onPress={() => setShowModal(!showModal)}
              />
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setShowModal(!showModal)}>
        <Text style={{...styles.modalButton, color: colors.title}}>
          Show modal
        </Text>
      </TouchableOpacity>
      <ScrollView>
        {datalist.map((elem, index) => (
          <Text style={{...styles.elem, color: colors.text}} key={index}>
            {elem}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  modalViewWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  modalView: {
    backgroundColor: '#ccc',
    width: '90%',
    alignItems: 'center',
    padding: 30,
    borderRadius: 20,
  },
  modalButton: {
    fontSize: 30,
    paddingVertical: 20,
    fontWeight: 'bold',
  },
  buttonZone: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  elem: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ModalScreen;
