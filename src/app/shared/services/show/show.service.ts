import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MatDialog, MatSnackBar, MatDialogConfig} from '@angular/material';

import {ConfigService} from '../config/config.module';

import {ShowAlertComponent, ShowConfirmComponent, ShowPromptComponent} from './show.component';

@Injectable()
export class ShowService {

  constructor(private matDialog: MatDialog, private snackBar: MatSnackBar, private pageTitle: Title, private config: ConfigService) {
  }

  alert(option, config?: MatDialogConfig) {
    if (typeof option === 'string') {
      option = {title: option};
    }
    const dialog = this.matDialog.open(ShowAlertComponent, config);
    Object.assign(dialog.componentInstance, option);
    return dialog;
  }

  confirm(option, config?: MatDialogConfig): Promise<boolean> {
    if (typeof option === 'string') {
      option = {title: option};
    }
    const dialog = this.matDialog.open(ShowConfirmComponent, config);
    Object.assign(dialog.componentInstance, option);
    return dialog.afterClosed().toPromise()
      .then(accept => accept === true ? Promise.resolve(true) : Promise.reject(false))
      .catch(() => Promise.reject(false));
  }

  prompt(option, config?: MatDialogConfig): Promise<string | null> {
    if (typeof option === 'string') {
      option = {title: option};
    }
    const dialog = this.matDialog.open(ShowPromptComponent, config);
    Object.assign(dialog.componentInstance, option);
    return dialog.afterClosed().toPromise()
      .then(value => typeof value === 'string' && value.length ? Promise.resolve(value) : Promise.reject(null))
      .catch(() => Promise.reject(null));
  }

  dialog(componentOrTemplateRef, config?: MatDialogConfig) {
    return this.matDialog.open(componentOrTemplateRef, config);
  }

  closeDialog() {
    return this.matDialog.closeAll();
  }

  success(message) {
    return this.snackBar.open(message, '关闭', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  error(message) {
    return this.snackBar.open(message, '关闭', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  info(message) {
    return this.snackBar.open(message, '关闭', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  warning(message) {
    return this.snackBar.open(message, '关闭', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  title(val) {
    let newTitle = val || this.config.name || '';
    if (val && this.config.name) {
      newTitle += (' | ' + this.config.name);
    }
    this.pageTitle.setTitle(newTitle);
  }

}
