export class UserInfo {
    constructor(userName, aboutMe) {
        this._formUserName = document.querySelector(userName);
        this._formUserJobName = document.querySelector(aboutMe);
    }

    getUserInfo = () => {
        const data = {
            userName: this._formUserName.textContent,
            aboutMe: this._formUserJobName.textContent
        }

        return data;
    }

    setUserInfo = (name, about) => {
        this._formUserName.textContent = name;
        this._formUserJobName.textContent = about;
    }
}