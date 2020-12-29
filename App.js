import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducers from "./src/redux/reducers";
import KiwiNavigator from "./src/navigations/KiwiNavigator";

const store = createStore(rootReducers);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <KiwiNavigator />
      </NavigationContainer>
    </Provider>
  );
}
