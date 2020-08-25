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

import DiscountCarousel from '../../components/Carousel/DiscountCarousel'
import Txt from '../../components/Typography'
import WithModal from '../../components/Views/WithModal'
import {GetAllDiscounts} from '../../services/Discount'

const PackageSlideshow = () => {
  const [discounts, setDiscounts] = useState<any>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [currentDiscount, setCurrentDiscount] = useState<any>(null);

  async function fetchDiscounts() {
    await GetAllDiscounts().then((r) => {
      setDiscounts(r);
    });
  }

  function showDiscount (discount: any) {
    setCurrentDiscount(discount);
    setModal(true)
  }

  useEffect(() => {
    fetchDiscounts();
  }, []);

  return (
    <View>
      {
        discounts && discounts.length > 0 ? <DiscountCarousel items={discounts} onDiscountSelect={showDiscount}/> : null
      }
      {currentDiscount ? (
        <WithModal shownav={true} show={modal} toggleModal={setModal}>
           <View style={styles.container}>
            {/* <View style={styles.header} >
              <Icon width={32} height={32} name="chevron-down-outline" onPressOut={() => toggleModal(false)}/>
            </View> */}
            <ScrollView>
              <View style={styles.body}>
                <View>
                  <ImageBackground style={styles.bgImage} source={{ uri: currentDiscount.image}} />
                  <View style={styles.content}>
                    <View style={{ flexDirection: "column"}}>
                      <View>
                        <Txt type="headline">{currentDiscount.name}</Txt>
                      </View>
                      <View style={{ flexDirection: "row", alignItems: "flex-end"}}>
                        <Txt>by </Txt><Txt type="caption1">{currentDiscount.vendor_name}</Txt>
                      </View>
                    </View>
                    <View style={styles.spacer}/>
                    <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between"}}>
                      <View style={{ flexDirection: "column", flex: 1}}>
                        <Text>Amount:</Text>
                        <Txt type="headline">AED {currentDiscount.amount}</Txt>
                      </View>
                      <View style={{ flexDirection: "column", flex: 1}}>
                        <Text>Use code:</Text>
                        <Text style={styles.textPrimary}>AED {currentDiscount.coupon_code}</Text>
                      </View>
                    </View>
                    <View style={styles.spacer}/>
                    <View style={{ flexDirection: "column"}}>
                      <Text>Offer valid till: {currentDiscount.expiry_date}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </WithModal>
      ):null}
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
  textPrimary: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FDA50F"
  }
});

export default PackageSlideshow