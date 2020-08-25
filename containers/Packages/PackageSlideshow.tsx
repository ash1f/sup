import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  Modal,
  Alert,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  ImageBackground
} from "react-native";
import { Icon } from 'react-native-eva-icons';

import Txt from '../../components/Typography'
import PackageCarousel from '../../components/Carousel/PackageCarousel'

import WithBackButton from '../../components/Views/WithBackButton'
import {RequestPackage, GetAllPackages} from '../../services/Packages'

const PackageSlideshow = () => {
  const [packages, setPackages] = useState<any>([]);
  const [modal, toggleModal] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null)

  async function fetchPackages() {
    await GetAllPackages().then((r) => {
      setPackages(r);
    });
  }

  function doPackageActivation(pckg: any) {
    setSelectedPackage(pckg)
    toggleModal(true);
  }

  function sendRequestPackage () {
    if(selectedPackage.package_id) {
      RequestPackage(parseInt(selectedPackage.package_id)).then((res) => {
        if(res.status) {
          Alert.alert(
            'Success !',
            res.message,
            [
              {text: 'OK', onPress:() => toggleModal(false)}
            ]
          )
        }else {
          Alert.alert(
            'Failed !',
            "Something went wrong while requesting for the package",
            [
              {text: 'Close', onPress:() => null}
            ]
          )
        }
      })
    }
  }

  function confirmRequestPackage () {
    Alert.alert(
      'Request for a package',
      "If you wish to purchase this package please click 'ok'. Do you wish to continue ?",
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: sendRequestPackage}
      ],
      {cancelable: false},
    );
  }

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <View>
      {
        packages && packages.length > 0 ? <PackageCarousel items={packages} onPackageSelect={doPackageActivation}/> : null
      }
      <Modal 
        animationType="slide" 
        presentationStyle="pageSheet"
        visible={modal}
        onRequestClose={() => {
          toggleModal(false)
          setSelectedPackage(null)
        }}
        >
        {selectedPackage ? (
        <WithBackButton back={() => toggleModal(false)} direction="down">
          <View style={styles.container}>
            <ScrollView>
              <View style={styles.body}>
                <View>
                  <ImageBackground style={styles.bgImage} source={{ uri: selectedPackage.image}} />
                  <View style={styles.content}>
                    <View>
                      {selectedPackage.name ? <Txt type="headline">{selectedPackage.name}</Txt> : null}
                      {/* {selectedPackage.price ? <Txt gutter type="caption1">{selectedPackage.price}</Txt> : null} */}
                      <View style={styles.divider}></View>
                      {selectedPackage.description ? <Txt type="paragraph">{selectedPackage.description}</Txt> : null}
                    </View>
                    <View style={styles.buttonContainer}>
                      <TouchableHighlight style={styles.button} onPress={confirmRequestPackage}>
                        <Text style={styles.buttonText}>{selectedPackage.price ? `AED ${selectedPackage.price} - Request` : "Purchase"} </Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </WithBackButton>
        ): null}
      </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  buttonContainer: {
    width: "100%",
    marginVertical: 8
  },
  spacer: {
    paddingVertical: 16
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 15,
    backgroundColor: "#FDA50F"
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    paddingHorizontal: 16,
    color: "#fff",
    textAlign: "center"
  },
  header: {
    height: 60,
    borderBottomWidth: 0.5,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  body: {
    flexDirection: "column",
    width: "100%",
  },
  bgImage: {
    height: 250
  },
  divider: {
    height: 24
  },
  content: {
    flex: 1,
    flexDirection: "column",
    padding: 16,
  },
});

export default PackageSlideshow