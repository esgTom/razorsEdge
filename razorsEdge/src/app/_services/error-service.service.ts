
import { Injectable } from '@angular/core';
import { BusinessObjectEvent } from '../_business-objects/models/business-object-event';

@Injectable()
export class ErrorService {

    private _errorMessage = '';
    private _errorEvent: BusinessObjectEvent;

    public set ErrorMessage( errorMessage: string) {
        this._errorMessage = errorMessage;
        console.log(this._errorMessage);
    }

    public get ErrorMessage(): string {
        return this._errorMessage.trim();
    }


    public set ErrorEvent( errorEvent: BusinessObjectEvent ) {
        this._errorEvent = errorEvent;
        console.log('Error Event ' , this._errorEvent.PayLoad);
    }

    public get ErrorEvent(): BusinessObjectEvent {
        return this._errorEvent;
    }

  constructor() { }

}
