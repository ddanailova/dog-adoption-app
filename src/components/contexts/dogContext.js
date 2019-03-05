import {createContext} from 'react';
const dogDataFromStorage = JSON.parse(localStorage.getItem('selectedDog'));
const defaultDogState = { 
    selectedDog:dogDataFromStorage || null,
    updateSelectedDog(){}
    // checkedDogs:[],
    // updateCheckedDogs(){}
};
const DogContext = createContext(defaultDogState);

export {
    DogContext,
    defaultDogState
}