import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { BreadcumsComponent } from './breadcums/breadcums.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { P404Component } from './p404/p404.component';


@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcumsComponent,
        P404Component
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcumsComponent,
        P404Component,

    ]

})

export class SharedModule {}
