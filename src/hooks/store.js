import { configureStore } from "@reduxjs/toolkit";
//  import localizationReducer from "./Localization";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import authRducer from "./auth";
import categoriesReducer from "./categories";
import compoundsReducer from "./components"
import propertiesReducer from "./properties"
import countriesReducer from "./countries"
import citiesReducer from "./cities"
import subcategoriesReducer from "./subcategories"
import zonesReducer from "./zones"
// import schoolsReducer from "./Schools";
 import LocationsReducer from "./Locations"

const persistConfig = {
	key: "root",
	version: 1,
	storage,
};

const RootReducers = combineReducers({
	auth: authRducer,
// currentLocal: localizationReducer,
// schools:schoolsReducer,
// classes:classesReducer,
categories:categoriesReducer,
compounds:compoundsReducer,
properties:propertiesReducer,
countries:countriesReducer,
cities:citiesReducer,
subcategories:subcategoriesReducer,
zones:zonesReducer,
  Locations: LocationsReducer, 





});

const persistedReducer = persistReducer(persistConfig, RootReducers);

export default configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});