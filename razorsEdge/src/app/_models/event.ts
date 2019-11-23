import { Phase } from './phase';

export class Event {
    Comments: string;
    CreateBy: string;
    CreateDate: string;
    Description: string;
    EventDate: string;
    EventId: number;
    Goals: string;
    ModBy: string;
    ModDate: string;
    Phases: Phase[];
}
