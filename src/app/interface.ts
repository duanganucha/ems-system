

import { Location } from '../app/location'

export class DispatchClass {

        constructor(
      
          public id_key :string,
          public status :any,
          public numberMission :string,
          
          public teamName: string,
          public teamCode: string,
          public teamLevel: string,
          
          public scene_type :string,
          public report_time : Date,
          public report_location: Location,
          public report_locationDetail: string,
          public report_scene :string,
          public report_image: string,
          public report_symptom: string,
          public report_moreDetail: string,
          
          public report_Way: string,
          public report_Who: string,
          public report_telNumber: string,
          
          public patient_Name: string,
          public patient_Age: string,
          public patient_HN: string,
          public patient_ID: string,
          public patient_image_ByTeam: string,
      
          public vitalsign1_symptom_first: string,
          public vitalsign1_GSC: string,
          public vitalsign1_pupil: string,
          public vitalsign1_o2sat: number,
          public vitalsign1_BP: string,
          public vitalsign1_pulse: number,
          public vitalsign1_RR: number,
          public vitalsign1_temperature: number,
          public vitalsign1_DTX: number,
      
          public vitalsign2_symptom_second: string,
          public vitalsign2_GSC: string,
          public vitalsign2_pupil: string,
          public vitalsign2_o2sat: number,
          public vitalsign2_BP: string,
          public vitalsign2_pulse: number,
          public vitalsign2_RR: number,
          public vitalsign2_temperature: number,
          public vitalsign2_DTX: number,

          public time_report: string,
          public time_command: string,
          public time_depart: string,
          public time_arrive_scene: string,
          public time_leave_scene: string,
          public time_arrive_hospital: string,
          public time_arrive_end: string,
          
          public km_start: number,
          public km_depart: number,
          public km_hospital: number,
          public km_end: number,
          
          public treatment: string,
          public diagnosis: string,
      
          public member_doctor: string,
          public member_one: string,
          public member_two: string,
          public member_three: string,
          public member_driver: string
      
        ) { }      
}
