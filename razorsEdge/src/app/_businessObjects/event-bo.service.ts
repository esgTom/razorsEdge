

import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Event } from '../_models/event';
import { EventDataService } from '../services/event-data.service';
import { ErrorService } from '../_core/error-service.service';
import { BusinessObjectEvent } from './models/business-object-event';

@Injectable() export class EventBO {

constructor(
    private _dataService: EventDataService,
    private _errorService: ErrorService
) { }

// #region Events
metadataEvent: EventEmitter<BusinessObjectEvent> = new EventEmitter();

//  #endregion

// #region Properties

private _valid = true;
private _busy = false;
private _model: Event = null;
private _eventGraph: Event = null;
private _Events: Event[] = null;

// #endregion

// #region Getters / Setters

get isValid() {
    return this._valid;
}

get busy() {
    return this._busy;
}

get Event() {
    return this.Event;
}
set selectedEvent(event: Event) {
    this._model = event;
}
get selectedevent(): Event {
    return this._model;
}
get eventGraph() {
    return this._eventGraph;
}

// #endregion

loadEvent(eventId: number): Observable<Event[]> {

    this._busy = true;
    if (this._model !== null && this._model.EventId === eventId) {
        return Observable.create(this._model);
    } else {
        return this._dataService.getEvent(eventId)
           .do ( data => {
                this.selectedEvent = data[0];
            }, error => {
                this.emitEvent('load event', 'error', error);
            }, () => {
                this._busy = false;
            });
    }
}

loadEvents(foreignKey: number): Observable<Event[]> {

    this._busy = true;
    return this._dataService.getEvents(foreignKey)
       .do (data => {
            this._Events = data;
        }, error => {
            this.emitEvent('load events', 'error', error);
        }, () => {
            this._busy = false;
        });
}

loadEventGraph(eventId: number) {

    this._busy = true;
    this._dataService.getEventGraph(eventId)
        .subscribe( x => {
            this._eventGraph = x;
        }, error => {
            this.emitEvent('load event graph', 'error', error);
        }, () => {
            this._busy = false;
        });

}

saveEvent() {

    this._busy = true;

    this._dataService.saveEvent(this._model)
        .subscribe((data: Event) => {
            this.selectedEvent = data[0];
            this.emitEvent('Event save', 'success');
            this._busy = false;
        }, error => {
            this.emitEvent('Event save', 'error', error);
        }, () => {
            this._busy = false;
        });
}

deleteEvent(selectedEvent: Event) {

    this._busy = true;

    this._dataService.deleteEvent(this._model.EventId)
        .subscribe((data: Event) => {
            this._model = null;
            this.emitEvent('Event delete', 'success');
            this._busy = false;
        }, error => {
            this.emitEvent('Event delete', 'error', error);
        }, () => {
            this._busy = false;
        });
}

emitEvent(operation: string, status: any, payload: any = null) {
    this.metadataEvent.emit(new BusinessObjectEvent(operation, status, payload));
}

}

