import { Equipament } from "./equipament";
import { Specification } from "./specification";

export interface EquipamentSpecifications {
    id: string;
    equipamentId: string;
    specificationId: string;
    active: boolean;
    name: string;
    equipament: Equipament
    specification: Specification;
  }