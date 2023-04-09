export class UserInfo {
    constructor(userName, aboutMe) {
        this._userName = userName;
        this._aboutMe = aboutMe;
    }

    formUserName = document.querySelector('.user__name');
    formUserJobName = document.querySelector('.user__job-name');

    getUserInfo = () => {
        const data = {
            userName: this._userName,
            aboutMe: this._aboutMe
        }

        return data;
    }

    setUserInfo = (name, about) => {
        this._userName = name;
        this._aboutMe = about;
        this.formUserName.textContent = name;
        this.formUserJobName.textContent = about;
    }
}