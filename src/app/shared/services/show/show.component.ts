import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-show-alert',
  template: `
    <h2 mat-dialog-title *ngIf="title">{{title}}</h2>
    <mat-dialog-content *ngIf="content">{{content}}</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button color="primary" [mat-dialog-close]="true">{{close}}</button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./show.component.scss']
})
export class ShowAlertComponent {

  title: string;
  content: string;
  close: string = '确定';

}

@Component({
  selector: 'app-show-confirm',
  template: `
    <h2 mat-dialog-title *ngIf="title">{{title}}</h2>
    <mat-dialog-content *ngIf="content">{{content}}</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">{{cancelLabel}}</button>
      <button mat-button color="primary" (click)="accept()">{{acceptLabel}}</button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./show.component.scss']
})
export class ShowConfirmComponent {

  title: string;
  content: string;
  cancelLabel: string = '取消';
  acceptLabel: string = '确定';

  constructor(private dialog: MatDialogRef<ShowConfirmComponent>) {
  }

  cancel() {
    this.dialog.close(false);
  }

  accept() {
    this.dialog.close(true);
  }

}

@Component({
  selector: 'app-show-prompt',
  template: `
    <h2 mat-dialog-title *ngIf="title">{{title}}</h2>
    <mat-dialog-content>
      <ng-container *ngIf="content">{{content}}</ng-container>
      <mat-form-field>
        <input type="text" matInput [(ngModel)]="value" autofocus>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancel()">{{cancelLabel}}</button>
      <button mat-button color="primary" (click)="accept()">{{acceptLabel}}</button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./show.component.scss']
})
export class ShowPromptComponent {

  value: string;
  title: string;
  content: string;
  cancelLabel: string = '取消';
  acceptLabel: string = '确定';

  constructor(private dialog: MatDialogRef<ShowPromptComponent>) {
  }

  accept() {
    this.dialog.close(this.value);
  }

  cancel() {
    this.dialog.close(null);
  }

}
