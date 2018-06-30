import { Location } from '../app/location'

export class Team {

    constructor(
        public key ,
        public code:number,
        public number_ambulance:number,
        public name:string,
        public image :string,
        public detail:string,
        public location:Location ,
        public level :string,
        public status :boolean
    ){}
}
