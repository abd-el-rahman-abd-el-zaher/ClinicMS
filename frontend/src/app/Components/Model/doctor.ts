export class Doctor {
    public attendingDaysArray:string[]=[];
    public appointmentsPerDay:string[]=[];
    public parsedStartTime:string='';
    public parsedEndTime:string='';
    constructor(
        public attendingDays:string,
        public clinicServiceID:Object,
        public gender:string,
        public password:string,
        public email:string,
        public birthDate:Date,
        public firstname:string,
        public lastname:string,
        public phone:string,
        public image:string,
        public _id:string,
        public startTime:Time,
        public endTime:any,
    ){}
}

export class Time{
    constructor(public h:number,public m:number){}
}
