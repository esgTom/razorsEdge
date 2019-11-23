import { Component, OnInit, Input, OnDestroy, TemplateRef } from '@angular/core';

// import { ActivityCalendar } from '../../_models/activity-calendar';
// import { ActivityBO } from '../../_business-objects/activity-bo.service';
// import { BusinessObjectEvent } from '../../_business-objects/models/business-object-event';

// import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
// import { ActivityDetailComponent } from '../activity-detail/activity-detail.component';
// import { appModalOptions } from '../../_models/modal-options';
// import { Activity } from '../../_models/activity';

@Component({
  selector: 'activity-calendar',
  templateUrl: './activity-calendar.component.html',
  styleUrls: ['./activity-calendar.component.css']
})
export class ActivityCalendarComponent implements OnInit, OnDestroy {

    @Input() activitiesCalendar: ActivityCalendar[];

    // closeResult: string;
    busy = false;
    boEvents: any;
    weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] ;

    selectedYearType = 'dropdown';
    selectedYear: number;
    displayYear: number;
    selectedMonth: number;
    selectedMonthName: string;
    displayMonthName: string;

    bsModalRef: BsModalRef;

    constructor(
        private _businessObject: ActivityBO,
        private modalService: BsModalService
        ) { }

    ngOnInit() {
        this.setDefaultDateValues();
        // this.createCalendar();

        this.boEvents = this._businessObject.metadataEvent
            .subscribe( ( item: BusinessObjectEvent ) => this.onBusinessObjectEvents(item));

    }

    setDefaultDateValues() {
        const currentDate = new Date();
        this.selectedYear = currentDate.getFullYear();
        this.selectedMonth = (currentDate.getMonth() + 1);
    }

    onYearChanged( selectedYear: number) {
        this.selectedYear = selectedYear;
    }

    onMonthChanged( calendarMonth: any) {
        this.selectedMonthName = calendarMonth.monthName;
        this.selectedMonth = calendarMonth.monthNumber;
        if ( ! this.displayMonthName || this.displayMonthName === '') {
            this.setDisplayDates();
        }
    }

    onGetActivity() {
        this.busy = true;
        this._businessObject.loadActivitiesCalendar(0, this.selectedYear , this.selectedMonth).subscribe( response => {
            this.activitiesCalendar = this._businessObject.activitiesCalendar;
        }, error => {
            console.log('Error occurred while retrieving Activity Calendar data');
        }, () => {
            this.setDisplayDates();
            this.busy = false;
        });
    }

    onBusinessObjectEvents( boEvent: BusinessObjectEvent) {
        console.log('BO Event ', boEvent.Status);
    }

    activitiesCalendarEmpty(): boolean {
        if (!this.activitiesCalendar || this.activitiesCalendar.length === 0) {
            return false;
        }

        return  !this.activitiesCalendar.some( day => {
            return day.Activities && day.Activities.length > 0;
        });

    }

    setDisplayDates() {
        this.displayYear = this.selectedYear;
        this.displayMonthName = this.selectedMonthName;
    }
    ngOnDestroy() {
        this.boEvents.unsubscribe();
        console.log('BO event unsubscribe');
    }

    openActivityDetailModal(activityCalendar: ActivityCalendar, activityId: number = 0) {

        // if ( activityId > 0) {
        //     const activity = activityCalendar.Activities.find( a => {
        //         return a.ActivityId === activityId;
        //     });
        //     if (activity) {
        //         this.bsModalRef.content.activityDetail = activity;
        //     }
        // } else {
        //     this.bsModalRef.content.activityDetail = new Activity();
        // }

        const activityDetailTest = new Activity();
        activityDetailTest.ActivityCode = 'x';
        const initialState = {
            activityCalendar: activityCalendar,
            activityDetail: activityDetailTest,
            activityOperation: 'Test'
          };

        const config = appModalOptions;
        config.initialState = initialState;
        this.bsModalRef = this.modalService.show(ActivityDetailComponent, config);

        // this.bsModalRef.content.initializeForm();

    }


}
