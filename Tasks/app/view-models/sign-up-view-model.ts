import localSettings = require("local-settings");
import observableModule = require("data/observable");

import everliveModule = require("../lib/everlive");

import viewModelBaseModule = require("./view-model-base");

export class SignUpViewModel extends viewModelBaseModule.ViewModelBase {
    private _name: string;
    private _email: string;
    private _username: string;
    private _password: string;
    private _passwordRepeat: string;

    constructor() {
        super();

        this._name = "";
        this._email = "";
        this._username = "";
        this._password = "";
        this._passwordRepeat = "";
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        if (this._name !== value) {
            this._name = value;
            this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: "name", value: value });
        }
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        if (this._email !== value) {
            this._email = value;
            this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: "email", value: value });
        }
    }

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        if (this._username !== value) {
            this._username = value;
            this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: "username", value: value });
        }
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        if (this._password !== value) {
            this._password = value;
            this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: "password", value: value });
        }
    }

    get passwordRepeat(): string {
        return this._passwordRepeat;
    }

    set passwordRepeat(value: string) {
        if (this._passwordRepeat !== value) {
            this._passwordRepeat = value;
            this.notify({ object: this, eventName: observableModule.knownEvents.propertyChange, propertyName: "passwordRepeat", value: value });
        }
    }

    register() {
        if (this.validate()) {
            var that = this;
            that.beginLoading();
            var everlive = new everliveModule({ apiKey: TELERIK_BAAS_KEY, token: localSettings.getString(TOKEN_DATA_KEY) });
            everlive.Users.register(that.username, that.password, { Email: that.email, DisplayName: that.name },
                function(data) {
                    that.endLoading();
                    alert({ title: "Registration sucess!", message: "Please login with your credentials now.", okButtonText: "Close" });
                    that.goBack();
                }, function(error) {
                    that.endLoading();
                    that.clearPasswords();
                    alert({ title: "Registration problem!", message: error.message, okButtonText: "Close" });
                });
        }
        else {
            this.clearPasswords();
        }
    }

    cancel() {
        this.goBack();
    }

    private clearPasswords() {
        this.password = "";
        this.passwordRepeat = "";
    }

    private validate(): boolean {
        if (this.name === "") {
            alert("Please enter your name.");
            return false;
        }

        if (this.email == "") {
            alert("Please enter your email.");
            return false;
        }

        if (this.username == "") {
            alert("Please enter username.");
            return false;
        }

        if (this.password == "") {
            alert("Please enter password.");
            return false;
        }

        if (this.passwordRepeat != this.password) {
            alert("Passwords did not match.");
            return false;
        }

        return true;
    }
}