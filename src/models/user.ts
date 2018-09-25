export class User{
    public name: string;
    public email: string;
    public password: string;
    public password_confirmation: string;
    public current_password: string;
    public uid: string;
    public client: string;
    public token: string;
    public ident: number;
    public id: number;
    public avatar: string;
    //public foto: string;
     
    constructor(
        
    ){
        
       this.ident = 1;

    }
}