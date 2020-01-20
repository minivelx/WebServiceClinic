export class CMedicalAppointment {
    public id: number;
    public idMedicalAppointmentType: number;
    public date: Date;
    public userId: string;
    public active: boolean;
    public nameType: string;
    public dateAppointment: Date;

    constructor() {
        this.id = 0;
        this.idMedicalAppointmentType = 0;
        this.date = new Date();
        this.userId = "";
        this.active = true;
        this.nameType = "";
    }
}