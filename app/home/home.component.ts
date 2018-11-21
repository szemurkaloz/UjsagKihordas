import { ChangeDetectorRef, Component, Input, NgZone, OnInit, ViewChild } from "@angular/core";
import { ListViewEventData } from "nativescript-pro-ui/listview";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Elofizeto } from "../shared/models/elofizeto.model";
import { UjsagokService } from "../shared/services/ujsagok.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    providers: [UjsagokService],
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;
    // tslint:disable-next-line:member-ordering
    _dataItems: ObservableArray<Elofizeto>;

    constructor(private _dataItemService: UjsagokService,
                private ngZone: NgZone,
                private _changeDetectionRef: ChangeDetectorRef) {
    }

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        console.log("Betöltés");
        this._dataItems = new ObservableArray<Elofizeto>();
        this._changeDetectionRef.detectChanges();
        this._dataItems.push({
            nev: "Blaskó János",
            cim: "Malom u. 40",
            ujsag: "Népszava",
            darab: 1
        });
        console.log("Adat hossza" + this._dataItems.push({
            nev: "Répa Rozi",
            cim: "Malom u. 41",
            ujsag: "Népszava",
            darab: 1
        }));
        console.log("Adat hossza" + this._dataItems.length);
        /*
        this._dataItemService.lista.publishReplay().refCount().subscribe(
            (adat) => {
                this._dataItems.push(adat);
                console.log("Visszatért adat" + JSON.stringify(adat));
            });
        /* this.ngZone.runOutsideAngular(() => {
            console.log("Zone");
            this._dataItems = new ObservableArray<Elofizeto>();
            this._dataItemService.lista.publishReplay().refCount().subscribe(
                (adat) => {
                    this._dataItems.push(adat);
                    console.log("Visszatért adat" + JSON.stringify(adat));
                });
            });*/
    }

    onPullToRefreshInitiated(args: ListViewEventData) {
        const listView = args.object;
        listView.notifyPullToRefreshFinished();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    get dataItems(): ObservableArray<Elofizeto> {
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
