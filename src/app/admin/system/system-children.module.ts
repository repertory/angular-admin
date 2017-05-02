import {NgModule} from '@angular/core';

import {MenuModule} from './menu/menu.module';
import {RoleModule} from './role/role.module';
import {SettingModule} from './setting/setting.module';
import {UserModule} from './user/user.module';

@NgModule({
    imports: [
        MenuModule,
        RoleModule,
        SettingModule,
        UserModule,
    ]
})
export class SystemChildrenModule {
}
