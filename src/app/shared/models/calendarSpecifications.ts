import { Calendar } from "./calendar";
import { Specification } from "./specification";

export interface CalendarSpecifications {
    id: string;
    calendarId: string;
    specificationId: string;
    active: boolean;
    name: string;
    calendar: Calendar;
    specification: Specification;
  }