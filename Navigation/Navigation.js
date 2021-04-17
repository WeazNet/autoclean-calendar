import React from 'react'

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { StyleSheet, Image } from 'react-native';
import Lavage from '../Components/Lavage'
import AddDate from '../Components/AddDate'
import Mecanique from "../Components/Mecanique";
import Vente from "../Components/Vente";
import RemoveDate from '../Components/RemoveDate';

const LavageStackNavigator = createStackNavigator({
  lavage: {
    screen: Lavage,
    navigationOptions: {
      title: 'Rendez-vous Lavage'
    }
  },
  AddDate: {
    screen: AddDate,
    navigationOptions: {
      title: 'Ajouter un rendez-vous'
    }
  },
  RemoveDate: {
    screen: RemoveDate,
    navigationOptions: {
      title: 'Supprimer un rendez-vous'
    }
  }
})
const MecaniqueStackNavigator = createStackNavigator({
  mecanique: {
    screen: Mecanique,
    navigationOptions: {
      title: 'Rendez-vous Mecanique'
    }
  },
  AddDate: {
    screen: AddDate,
    navigationOptions: {
      title: 'Ajouter un rendez-vous'
    }
  },
  RemoveDate: {
    screen: RemoveDate,
    navigationOptions: {
      title: 'Supprimer un rendez-vous'
    }
  }
})

const VenteStackNavigator = createStackNavigator({
  vente: {
    screen: Vente,
    navigationOptions: {
      title: 'Rendez-vous Vente'
    }
  },
  AddDate: {
    screen: AddDate,
    navigationOptions: {
      title: 'Ajouter un rendez-vous'
    }
  },
  RemoveDate: {
    screen: RemoveDate,
    navigationOptions: {
      title: 'Supprimer un rendez-vous'
    }
  }
})


const TabNavigator = createBottomTabNavigator({
  lavage: {
    screen: LavageStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image 
          source={require('../images/ic_lavage.png')}
          style={styles.icon}/>
      }
    }
  },
  mecanique: {
    screen: MecaniqueStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image 
          source={require('../images/ic_mecanique.png')}
          style={styles.icon}/>
      }
    }
  },
  vente: {
    screen: VenteStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image 
          source={require('../images/ic_vente.png')}
          style={styles.icon}/>
      }
    }
  }
},
{
    tabBarOptions: {
      activeBackgroundColor: '#DDDDDD',
      inactiveBackgroundColor: '#FFFFFF',
      showLabel: false,
      showIcon: true
    }
}
)

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default createAppContainer(TabNavigator)