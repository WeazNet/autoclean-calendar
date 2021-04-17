import React from 'react'
import {StyleSheet, View, Button, Text, ActivityIndicator, TouchableOpacity} from 'react-native'
import { removeToCalendar } from '../API/server';
import Toast from 'react-native-toast-message';

class RemoveDate extends React.Component {

    constructor(props) {
        super(props)
        this._database = this.props.navigation.state.params.database
        this._event = this.props.navigation.state.params.event

        this.state = {
            disabled: false,
            isLoading: false
        }
    }

    _removeRdv(value) {
        if (this.state.disabled) {
            return;
        }
        this.setState({disabled: true, isLoading: true});
        this.props.navigation.navigate(this._database);
        if (value == "yes") {
            removeToCalendar(this._database, this._event['title'], this._event['start'], this._event['end'])
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Opération effectuée avec succès !',
                text2: 'Le rendez-vous a bien été supprimé 👍',
                visibilityTime: 1000,
                autoHide: true
            });
        } else {
            Toast.show({
                type: 'info',
                position: 'top',
                text1: 'Opération annulée avec succès !',
                text2: 'Le rendez-vous n\'a pas été supprimé',
                visibilityTime: 1000,
                autoHide: true
            });
        }
    }

    _render_button_ios() {
        if(Platform.OS === 'ios') {
            return (
                <View style={styles.buttons}>
                    <Button title="Oui" disabled={this.state.disabled} onPress={() => this._removeRdv("yes")}/>
                    <Button title="Non" disabled={this.state.disabled} onPress={() => this._removeRdv("no")}/>
                </View>
            )
        } else {
            return (
                <View style={styles.buttons}>
                    <TouchableOpacity disabled={this.state.disabled} style={styles.button} onPress={() => this._removeRdv()}>
                        <Text>Oui</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={this.state.disabled} style={styles.button} onPress={() => this._removeRdv()}>
                        <Text>Non</Text>
                    </TouchableOpacity>             
                </View>
            )
        }
    }

    render() {
        return (
        <View style={styles.main_container}>
        <View style={styles.second_container}>
            <Text>Vous voulez supprimer : "{this._event['title']}" du {this._event['start'].toLocaleDateString("fr-FR")} ?</Text>
            {this._render_button_ios() }
        </View>
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
      flex: 1,
      backgroundColor:'white',
    },
    second_container: {
        flex:1,
        width:400,
        marginTop:50,
        alignItems:'center',
        marginLeft:'auto',
        marginRight:'auto',
    },
    buttons: {
        marginTop:30,
        flex:1,
        flexDirection:'row',
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor:'#CCC',
        fontWeight:'bold',
        padding:5,
        paddingRight:20,
        paddingLeft:20,
        marginBottom:'auto',
        marginRight:5
    },
});

export default RemoveDate