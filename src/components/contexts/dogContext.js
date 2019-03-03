import {createContext} from 'react';

const defaultDogState = { 
    checkedDogs:[],
    updateCheckedDogs(){}
};
const DogContext = createContext(defaultDogState);

export {
    DogContext,
    defaultDogState
}