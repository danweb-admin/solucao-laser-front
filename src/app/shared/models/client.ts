import { City } from "src/app/shared/models/city";
import { State } from "src/app/shared/models/state";

export interface Client {
    id: string;
    name: string;
    cellPhone: string;
    phone: string;
    active: boolean;
    email: string;
    address: string;
    number: string;
    complement: string;
    cityId: number;
    stateId: number;
    clinicCellPhone: string;
    state: State;
    city: City;
  }