import React, { Component } from 'react'; 
import {StackNavigator, createAppContainer} from 'react-navigation';
import AddAsset from "./AddAsset";
import ListOfAssets from "./ListOfAssets";
import MainPage from "./MainPage";

export const AppNavigator = StackNavigator({
    MainPage: {
      screen: MainPage
    },
    AddAsset: {
      screen: AddAsset
    },
    ListOfAssets:{
      screen: ListOfAssets
    }
});

// const Router = createAppContainer(AppNavigator);

// export default Router;
