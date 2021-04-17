import React from 'react'
import {StyleSheet, View, TextInput, Button, Text, Platform, Image, ActivityIndicator} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native';
import { postToCalendar } from '../API/server';
import Toast from 'react-native-toast-message';

class AddDate extends React.Component {

    constructor(props) {
        super(props)

        this._database = this.props.navigation.state.params.database
        this._start_date = this.props.navigation.state.params.start_date
        var temp = (new Date(this._start_date.getTime()))
        this._end_date = new Date(temp.setHours(temp.getHours() + 3))
        
        this._title_input = "Sans nom"
        this._start_date_input= (new Date(this._start_date))
        this._end_date_input= (new Date(this._end_date))
        this.state = {
            disabled : false,
            end:this._end_date_input,
            changed:false,
            isLoading:false
        }
    }

    _postRdv() {
        if (this.state.disabled) {
            return;
        }
        this.setState({disabled: true, isLoading: true});
        this.props.navigation.navigate(this._database);
        postToCalendar(this._database, this._title_input, this._start_date_input, this._end_date_input)
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Opération effectuée avec succès !',
            text2: 'Le rendez-vous a bien été enregistré 👍',
            visibilityTime: 1000,
            autoHide: true
          });
    }

    _change_title_input(text) {
        this._title_input = text.toString()
    }
    _change_end_date_input(date) {
        this._end_date_input= (new Date(date))
        this.setState({end:this._end_date_input, changed: true})
    }
    _change_start_date_input(date) {
        this._start_date_input= (new Date(date))
    }

    _render_date_android() {
        if (this.state.changed != true) {
            return (
            <DateTimePicker style={styles.content} value={this._end_date}
            mode={"time"}
            is24Hour={true}
            display="default"
            onChange={(e, date) => this._change_end_date_input(date)}
            locale="fr-FR"
            />             
            )
        }
    }

    _render_date_ios() {
        if(Platform.OS === 'ios') {
        return (
            <View style={styles.content}>
            <View style={[styles.second_container, styles.date_container]}>
                  <Text style={[styles.text, styles.content]}>Début</Text>
                <DateTimePicker style={styles.content}
                    value={this._start_date}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    onChange={(e, date) => this._change_start_date_input(date)}
                    locale="fr-FR"
                    />
                <DateTimePicker style={styles.content}
                    value={this._start_date}
                    mode={"time"}
                    is24Hour={true}
                    display="default"
                    onChange={(e, date) => this._change_start_date_input(date)}
                    locale="fr-FR"
                    />
            </View>
            <View style={[styles.second_container, styles.date_container]}>
                  <Text style={[styles.text, styles.content]}>Fin</Text>
                <DateTimePicker style={styles.content} value={this._end_date}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    onChange={(e, date) => this._change_end_date_input(date)}
                    locale="fr-FR"
                    />
                    <DateTimePicker style={styles.content} value={this._end_date}
                    mode={"time"}
                    is24Hour={true}
                    display="default"
                    onChange={(e, date) => this._change_end_date_input(date)}
                    locale="fr-FR"
                    />
            </View>
            </View>
        )
        } else {
            function addZero(i) {
                if ((i.toString()).length == 1) {
                    return '0'+i
                }
                return i
            }
            return (
            <View style={styles.content}>
                <View style={styles.second_container}>
                    <Text>Début : {this._start_date.toLocaleDateString("fr-FR")} {addZero(this._start_date.getHours())}:{addZero(this._start_date.getMinutes())}</Text>
                </View>
                <View style={styles.second_container}>
                    { this._render_date_android() }
                    <Text>Fin : {this.state.end.toLocaleDateString("fr-FR")} {addZero(this._end_date_input.getHours())}:{addZero(this.state.end.getMinutes())}</Text>
                </View>
            </View>                
            )
        }
    }
    _render_button_ios() {
        if(Platform.OS === 'ios') {
            return (
                    <View style={styles.second_container}>
                        <Button disabled={this.state.disabled} title="Envoyer" onPress={() => this._postRdv()} />
                    </View>
            )
        } else {
            return (
                <View style={styles.second_container}>
                    <TouchableOpacity disabled={this.state.disabled} style={styles.button} onPress={() => this._postRdv()}>
                        <Text>Envoyer</Text>
                    </TouchableOpacity>           
                </View>
            )
        }
    }

    render() {
        return (
          <View style={styles.main_container}>
                <View style={styles.second_container}>
                    <TextInput onChangeText={(text) => this._change_title_input(text)} style={styles.input} placeholder="Entrez le titre du rendez-vous" />
                </View>
                {this._render_date_ios()}
                {this._render_button_ios()}
                { this.state.isLoading ?
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
                : null
                }
          </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex:1,
        marginLeft:'auto',
        marginRight:'auto',
        width:400,
    },
    second_container: {
        flex:1,
        width:'100%',
        flexDirection:'row',
        justifyContent:'center'
    },
    content: {
        flex:1,
    },
    date_container: {
        marginLeft:30
    },
    text: {
        marginTop: 6,
        fontWeight:'bold'
    },
    input: {
        textAlign:'center',
        fontWeight:'bold',
        color:'#228be3',
        fontSize:16
    },
    button: {
        backgroundColor:'#CCC',
        fontWeight:'bold',
        padding:10,
        marginBottom:'auto'
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});



export default AddDate