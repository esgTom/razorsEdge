import { MicroIteration } from './micro-iteration';

export class Iteration {
    Comment: string;
    CreateBy: string;
    CreateDate: string;
    Description: string;
    EndDate: string;
    IterationId: number;
    MicroIterations: MicroIteration[];
    ModBy: string;
    ModDate: string;
    PhaseId: number;
    StartDate: string;
}
