// export class Casedetail{
//     id:number;
//     name:string;
//     constructor(id:number,name:string){
//         this.id = id;
//         this.name = name;
//     }
// }

import { Location } from '../app/location'

export class Casedetail{

    constructor(
        public id :string,
        public team :string,
        public teamLevel :string,
        public locationDetail :string,
        public location : Location
    ){}
  
    
}