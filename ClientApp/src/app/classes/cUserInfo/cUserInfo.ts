import { CRol } from '../cRol/cRol';

export class CUserInfo {
    public id: string;
    public email: string;
    public password: string;
    public confirmPassword: string;
    public name: string;   
    public active: boolean;
    public phoneNumber: string;
    public personalId: string;

    constructor() {
        this.id = "";
        this.email = "";
        this.password = "";
        this.confirmPassword = "";
        this.name = "";
        this.active = true;
        this.phoneNumber = "";
        this.personalId = "";
    }
}