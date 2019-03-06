import {get, post, update, remove} from '../data/requester';

class ApplicationService {
    getAll = (filter)=>{
        let endpoint='applications';
        if(filter){
            endpoint=`applications?query={${filter}}`;
        }
        return get('appdata', endpoint, 'kinvey')
         .then(rawData=>rawData.json())
     }

    getById =(id)=>{
        const endpoint = `applications/${id}`
        return get('appdata', endpoint, 'kinvey')
         .then(rawData=>rawData.json())
    }

    create =(data)=>{
        return post('appdata', 'applications', 'kinvey', data)
        .then(rawData=>rawData.json())
    }

    update =(id,data)=>{
        const endpoint = `applications/${id}`
        return update('appdata', endpoint, 'kinvey', data)
        .then(rawData=>rawData.json())
    }

    remove = (id)=>{
        const endpoint = `applications/${id}`
        return remove('appdata', endpoint, 'kinvey')
        .then(rawData=>rawData.json())
    }
}

export default ApplicationService;