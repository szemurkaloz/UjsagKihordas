import { ChangeDetectionStrategy, Component, NgZone, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { Observable } from "rxjs/Rx";
import { Elofizeto } from "../shared/models/elofizeto.model";
import { UjsagokService } from "../shared/services/ujsagok.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    providers: [UjsagokService],
    templateUrl: "./home.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;
    // tslint:disable-next-line:member-ordering
    _dataItems: Observable<Array<Elofizeto>>;
    private ngZone: NgZone;
    constructor(private _dataItemService: UjsagokService) {
        this._dataItems = this._dataItemService.lista.publishReplay().refCount();
        this._dataItems
                .subscribe((adat) => {
                    console.log("Visszatért adat" + JSON.stringify(adat));
                });
}

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        console.log("Betöltés");
       /* this.ngZone.runOutsideAngular(() => {
            });*/
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    get dataItems(): Observable<Array<Elofizeto>> {
        return this._dataItems;
    }

    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

}
