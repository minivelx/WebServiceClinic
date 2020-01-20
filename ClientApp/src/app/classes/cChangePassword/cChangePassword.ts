export class CChangePassword {
    public oldPassword: string;
    public newPassword: string;
    public confirmPassword: string;

    constructor() {
        this.oldPassword = "";
        this.newPassword = "";
        this.confirmPassword = "";
    }
}