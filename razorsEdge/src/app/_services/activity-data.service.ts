import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Activity } from '../_models/activity';
import { ActivitiesResponse } from '../_models/activitiesResponse';

@Injectable({
  providedIn: 'root'
})
export class ActivityDataService {

constructor( private http: HttpClient ) {}

getActivity(activityId: number): Observable<Activity[]> {

    let params = new HttpParams();
    params = params.set('activityId', activityId.toString());

    return this.http.get<Activity[]>(environment.Urls.trainingLogAPIActivities, { params });

}

getActivities(foreignKey: number): Observable<Activity[]> {

    let params = new HttpParams();
    params = params.set('foreignKey', foreignKey.toString());

    return this.http.get<Activity[]>(environment.Urls.trainingLogAPIActivities, { params });

}


getActivityCalendar(eventId: number, searchYear: number, searchMonth: number): Observable<ActivitiesResponse> {

    let params = new HttpParams();
    params = params.set('id', eventId.toString());
    params = params.set('searchYear', searchYear.toString());
    params = params.set('searchMonth', searchMonth.toString());

    return this.http.get<ActivitiesResponse>(environment.Urls.trainingLogAPIActivities + 'GetActivitiesCalendar', { params });

}

saveActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(environment.Urls.trainingLogAPIActivities, activity);
}

deleteActivity(activityId: number): Observable<Activity> {
    let params = new HttpParams();
    params = params.set('activityId', activityId.toString());

    return this.http.delete<Activity>(environment.Urls.trainingLogAPIActivities, { params });

}

}