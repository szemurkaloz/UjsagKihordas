import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import "rxjs/add/operator/publishReplay";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ElofizetoService } from "./shared/services/elofizetok.service";
import { UjsagokService } from "./shared/services/ujsagok.service";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [ElofizetoService,
        UjsagokService
       ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
