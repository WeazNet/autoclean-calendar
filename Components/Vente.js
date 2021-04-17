import React from 'react'
import 'dayjs/locale/fr'
import {getCalendarFromApi} from '../API/server'
import { Calendar } from 'react-native-big-calendar'
import {StyleSheet,View} from 'react-native'
import Home from './Home'

class Vente extends Home {

    _hydrateCalendar() {
        getCalendarFromApi("vente").then(data => {
            this.setState({
                rdvs:data
            });
        })
    }

    _PressCell(date) {
        this.props.navigation.navigate("AddDate", {
            start_date: date,
            database: "vente"
        });
    }

    _PressEvent(event) {
        this.props.navigation.navigate("RemoveDate", {
            event: event,
            database: "vente"
        });
    }

    render() {
        this._hydrateCalendar()
        return (
            <View style={styles.main_container}>
                <Calendar locale="fr" onPressEvent={(e) => this._PressEvent(e)} onPressCell={(date) => this._PressCell(date)} events={this.state.rdvs} height={2000} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    main_container: {
      flex: 1,
      marginTop:0,
      backgroundColor:'white'
    }
});

export default Vente