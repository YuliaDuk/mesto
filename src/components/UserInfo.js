export default class UserInfo {
    constructor({firstname, job}){
        this._name = firstname;
        this._description = job;
        this._profileName = document.querySelector(this._name);
        this._profileDescription = document.querySelector(this._description)
    }
    getUserInfo(){
        this._formValues = {};
        this._formValues.name = this._profileName.textContent;
        this._formValues.description = this._profileDescription.textContent;
        return this._formValues
    }
    setUserInfo(object){
        this._profileName.textContent = object.firstname;
        this._profileDescription.textContent = object.job;
    }
}