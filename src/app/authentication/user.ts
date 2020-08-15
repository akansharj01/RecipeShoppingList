export class User {
    constructor(public email: string,
        public UserId: string,
        private _token: string,
        private expireInDate: Date) {
        
    }
    
    get token() {
        if(!this.expireInDate || new Date() > this.expireInDate) {
            return null;
        }
        return this._token;
    }
}