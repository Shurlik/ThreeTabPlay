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
import {useTranslation} from 'react-i18next';

const ModalScreen = () => {
  const {t, i18n} = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [datalist, setDatalist] = useState([]);
  const {colors} = useTheme();

  const happenedHandler = () => {
    const newData = [...datalist];
    if (newData.length === 0) {
      newData.push('Modal.Did');
    } else {
      newData.push('Modal.Again');
    }
    setDatalist(newData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={showModal} animationType={'fade'} transparent>
        <View style={styles.modalViewWrapper}>
          <View style={styles.modalView}>
            <Text>{t('Modal.Cool')}</Text>
            <View style={styles.buttonZone}>
              <Button
                style={styles.buttons}
                title={t('Modal.Do')}
                color="red"
                onPress={() => {
                  Alert.alert(t('Modal.Happened'));
                  happenedHandler();
                  setShowModal(!showModal);
                }}
              />
              <Button
                style={styles.buttons}
                title={t('Modal.Dont')}
                color="blue"
                onPress={() => setShowModal(!showModal)}
              />
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setShowModal(!showModal)}>
        <Text style={{...styles.modalButton, color: colors.title}}>
          {t('Modal.Show')}
        </Text>
      </TouchableOpacity>
      <ScrollView>
        {datalist.map((elem, index) => (
          <Text style={{...styles.elem, color: colors.text}} key={index}>
            {t(elem)}
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
    textAlign: 'center',
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
