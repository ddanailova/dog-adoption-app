import {createContext} from 'react';

const defaultDogState = { 
    selectedDog:{},
    selectDog(){}
};
const DogContext = createContext(defaultDogState);

export {
    DogContext,
    defaultDogState
}