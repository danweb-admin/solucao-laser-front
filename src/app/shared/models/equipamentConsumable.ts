import { Consumable } from "./consumable";
import { Equipament } from "./equipament";

export interface EquipamentConsumable {
    id: string;
    equipamentId: string;
    consumableId: string;
    active: boolean;
    name: string;
    value: number;
    equipament: Equipament
    consumable: Consumable;
}