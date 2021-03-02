import React from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import Home from '../Home';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Course from '../Course';
import WordStack, {WordStackProps} from './WordStack';
import {Icon} from 'react-native-magnus';

export type RootStackProps = {
  Tabs: NavigatorScreenParams<TabsProps>;
  WordStack: NavigatorScreenParams<WordStackProps>;
};

const Stack = createStackNavigator<RootStackProps>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{headerTitle: ''}}
        />
        <Stack.Screen
          name="WordStack"
          component={WordStack}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export type TabsProps = {
  Home: undefined;
  Course: undefined;
};

const Tab = createBottomTabNavigator<TabsProps>();

const Tabs = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({size, color}) => (
          <Icon name="home" fontSize={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Course"
      component={Course}
      options={{
        tabBarIcon: ({size, color}) => (
          <Icon name="bars" fontSize={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default Navigation;
