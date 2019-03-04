import {get, post, put, remove} from '../data/requester';

class dogService {

    getAll = ()=>{
        return get('appdata', 'dogs', 'kinvey')
         .then(rawData=>rawData.json())
     }

    getById =(id)=>{
        const endpoint = `dogs/${id}`
        return get('appdata', endpoint, 'kinvey')
         .then(rawData=>rawData.json())
    }

    create =(data)=>{
        return post('appdata', 'dogs', 'kinvey', data)
        .then(rawData=>rawData.json())
    }

    remove = (id)=>{
        const endpoint = `dogs/${id}`
        return remove('appdata', endpoint, 'kinvey')
        .then(rawData=>rawData.json())
    }
}

export default dogService