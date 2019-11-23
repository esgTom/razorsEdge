import { Activity } from './activity';

export class ActivityCalendar  {

    EventId: number;
    EventDescription: string ;
    PhaseId: number ;
    PhaseName: string ;
    IterationId: number ;
    IterationDescription: string ;
    MicroIterationId: number;
    MicroIterationTypeCode: string ;
    ActivityDate: Date;
    Activities: Activity[];
    Intensity: number;

}