import React, { useState, useEffect } from 'react';
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableHighlight,
    Text,
    TextInput,
    View,
    Alert,
    Keyboard
} from 'react-native';

import Rotater from '../../components/Animation/Rotater'
import AddNewButton from '../../components/Buttons/AddNewButtons'
import { SaveBlogs } from '../../services/Blogs'

import DismissKeyboard from '../../components/Views/DismissKeyboard'
import WithBackButton from '../../components/Views/WithBackButton'
import WithImagePicker from '../../components/Views/WithImagePicker'
import Font from '../../constants/Typography'
import { Icon } from 'react-native-eva-icons';

const phs = [
    "Spill your heart out",
    "What's on your mind ?",
    "Make a change"
]

export default function CreateNew({ navigation }) {
    const [pic, setPic] = useState(navigation.getParam('img', null));
    const [text, setText] = useState(navigation.getParam('text', ""));
    const [title, setTitle] = useState(navigation.getParam('title', ""));
    const [load, setLoad] = useState(false);

    const validate = () => {
        if (!text && !title) {
            Alert.alert('Fields cannot be empty !')
            return false;
        }
        if (title.length > 100) {
            Alert.alert('Title is too long, Needs to be less than 100 characters');
            return false;
        }
        if (text.split(" ").length < 41) {
            Alert.alert('Content is too short need more than 40 words');
            return false;
        }
        return true
    }

    const handleSubmit = () => {
        console.log({ load: !load });
        if (validate() && !load) {
            setLoad(true);
            SaveBlogs({ img: pic, description: text, title: title }).then((is) => {
                is ? Alert.alert('Successfully saved !') : Alert.alert('Failed to save');
                navigation.goBack();
            });
        }
    }

    return (
        <WithBackButton back={() => navigation.goBack()} header={true} heading="Create">
            <DismissKeyboard style={styles.container}>
                <ScrollView contentContainerStyle={styles.formContainer} onScroll={Keyboard.dismiss}>
                    <View style={{ flexDirection: "column", flex: 1 }}>
                        <View style={styles.spliter} />
                        <WithImagePicker handleImagePicker={v => setPic(v)}>
                            {pic && pic.uri ? (
                                <ImageBackground source={{ uri: pic.uri }} style={{ width: '100%', height: 200 }} />
                            ) : <AddNewButton label="Add Image" icon="plus-outline" />}
                        </WithImagePicker>
                        <View style={styles.spliter} />
                        <TextComponent value={title} setText={setTitle} styles={styles.title} label="Add Title" />
                        <View style={styles.spliter} />
                        <TextComponent value={text} setText={setText} styles={styles.description} label="Add Content" />
                    </View>
                </ScrollView>
            </DismissKeyboard>
            <View>
                <TouchableHighlight onPress={handleSubmit} underlayColor="transparent" style={styles.btn}>
                    {load
                        ? <Rotater style={{ width: 25, height: 25 }}><Icon name="loader-outline" fill="#fff" height={25} width={25} /></Rotater>
                        : <Text style={styles.btnText}>Post</Text>}
                </TouchableHighlight>
            </View>
        </WithBackButton>
    );
}

const TextComponent = ({ setText, value, label, styles, offset = 8 }) => {
    const [focus, setfocus] = useState(value);
    const [height, setHeight] = useState(60);

    function handleClick() {
        setfocus(true)
    }

    useEffect(() => {
        //setHeight(Math.floor(value.length / 2) + 60)
        if (focus && !value) {
            setfocus(false)
        }
    }, [value]);

    return focus ? (
        <KeyboardAvoidingView behavior="height">
            <View style={styles.InputContainer}>
                <TextInput
                    value={value}
                    onChangeText={setText}
                    onContentSizeChange={(event) => setHeight(event.nativeEvent.contentSize.height)}
                    style={[styles, { height: height > 60 ? height + offset : 60 }]}
                    multiline
                    placeholder={phs[0]} />
            </View>
        </KeyboardAvoidingView>
    ) : <AddNewButton label={label} icon="plus-outline" onClick={handleClick} />
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "stretch",
        flex: 1,
        backgroundColor: "#fff"
    },
    spliter: {
        height: 8
    },
    formContainer: {
        flex: 1,
        maxHeight: 400,
        paddingHorizontal: 24,
        justifyContent: "center",
        alignItems: "stretch"
    },
    floater: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 60
    },
    InputContainer: {
        alignItems: "stretch"
    },
    description: {
        fontWeight: '400',
        color: '#777',
        fontSize: Font(18),
    },
    title: {
        fontWeight: '600',
        color: '#222',
        fontSize: Font(24),
    },
    btn: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: "center",
        backgroundColor: "#FDA50F"
    },
    btnText: {
        fontSize: Font(20),
        fontWeight: "600",
        paddingHorizontal: 16,
        color: "#fff",
        textAlign: "center"
    }
});
