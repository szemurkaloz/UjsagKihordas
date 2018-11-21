"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var ujsagok_service_1 = require("../shared/services/ujsagok.service");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(_dataItemService, ngZone, _changeDetectionRef) {
        this._dataItemService = _dataItemService;
        this.ngZone = ngZone;
        this._changeDetectionRef = _changeDetectionRef;
    }
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    HomeComponent.prototype.ngOnInit = function () {
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        console.log("Betöltés");
        this._dataItems = new observable_array_1.ObservableArray();
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
    };
    HomeComponent.prototype.onPullToRefreshInitiated = function (args) {
        var listView = args.object;
        listView.notifyPullToRefreshFinished();
    };
    Object.defineProperty(HomeComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeComponent.prototype, "dataItems", {
        get: function () {
            return this._dataItems;
        },
        enumerable: true,
        configurable: true
    });
    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    HomeComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], HomeComponent.prototype, "drawerComponent", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            selector: "Home",
            moduleId: module.id,
            providers: [ujsagok_service_1.UjsagokService],
            templateUrl: "./home.component.html"
        }),
        __metadata("design:paramtypes", [ujsagok_service_1.UjsagokService,
            core_1.NgZone,
            core_1.ChangeDetectorRef])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUErRjtBQUUvRiw2REFBOEY7QUFDOUYsa0VBQWdGO0FBQ2hGLDJFQUF5RTtBQUV6RSxzRUFBb0U7QUFRcEU7SUFXSSx1QkFBb0IsZ0JBQWdDLEVBQ2hDLE1BQWMsRUFDZCxtQkFBc0M7UUFGdEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFnQjtRQUNoQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Qsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFtQjtJQUMxRCxDQUFDO0lBRUQ7O2tFQUU4RDtJQUM5RCxnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksbUNBQXNCLEVBQUUsQ0FBQztRQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxrQ0FBZSxFQUFhLENBQUM7UUFDbkQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQ2pCLEdBQUcsRUFBRSxjQUFjO1lBQ25CLEdBQUcsRUFBRSxhQUFhO1lBQ2xCLEtBQUssRUFBRSxVQUFVO1lBQ2pCLEtBQUssRUFBRSxDQUFDO1NBQ1gsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDN0MsR0FBRyxFQUFFLFdBQVc7WUFDaEIsR0FBRyxFQUFFLGFBQWE7WUFDbEIsS0FBSyxFQUFFLFVBQVU7WUFDakIsS0FBSyxFQUFFLENBQUM7U0FDWCxDQUFDLENBQUMsQ0FBQztRQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQ7Ozs7Ozs7Ozs7Ozs7O2lCQWNTO0lBQ2IsQ0FBQztJQUVELGdEQUF3QixHQUF4QixVQUF5QixJQUF1QjtRQUM1QyxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzdCLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxzQkFBSSwrQ0FBb0I7YUFBeEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksb0NBQVM7YUFBYjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBRUQ7OztrRUFHOEQ7SUFDOUQseUNBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakQsQ0FBQztJQXBFb0I7UUFBcEIsZ0JBQVMsQ0FBQyxRQUFRLENBQUM7a0NBQWtCLGdDQUFzQjswREFBQztJQUxwRCxhQUFhO1FBTnpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsU0FBUyxFQUFFLENBQUMsZ0NBQWMsQ0FBQztZQUMzQixXQUFXLEVBQUUsdUJBQXVCO1NBQ3ZDLENBQUM7eUNBWXdDLGdDQUFjO1lBQ3hCLGFBQU07WUFDTyx3QkFBaUI7T0FiakQsYUFBYSxDQTJFekI7SUFBRCxvQkFBQztDQUFBLEFBM0VELElBMkVDO0FBM0VZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSW5wdXQsIE5nWm9uZSwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9saXN0dmlld1wiO1xuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyXCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IEVsb2ZpemV0byB9IGZyb20gXCIuLi9zaGFyZWQvbW9kZWxzL2Vsb2ZpemV0by5tb2RlbFwiO1xuaW1wb3J0IHsgVWpzYWdva1NlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL3NlcnZpY2VzL3Vqc2Fnb2suc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJIb21lXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBwcm92aWRlcnM6IFtVanNhZ29rU2VydmljZV0sXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9ob21lLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIFVzZSB0aGUgQFZpZXdDaGlsZCBkZWNvcmF0b3IgdG8gZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBkcmF3ZXIgY29tcG9uZW50LlxuICAgICogSXQgaXMgdXNlZCBpbiB0aGUgXCJvbkRyYXdlckJ1dHRvblRhcFwiIGZ1bmN0aW9uIGJlbG93IHRvIG1hbmlwdWxhdGUgdGhlIGRyYXdlci5cbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuXG4gICAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptZW1iZXItb3JkZXJpbmdcbiAgICBfZGF0YUl0ZW1zOiBPYnNlcnZhYmxlQXJyYXk8RWxvZml6ZXRvPjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2RhdGFJdGVtU2VydmljZTogVWpzYWdva1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgfVxuXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIFVzZSB0aGUgc2lkZURyYXdlclRyYW5zaXRpb24gcHJvcGVydHkgdG8gY2hhbmdlIHRoZSBvcGVuL2Nsb3NlIGFuaW1hdGlvbiBvZiB0aGUgZHJhd2VyLlxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uID0gbmV3IFNsaWRlSW5PblRvcFRyYW5zaXRpb24oKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJCZXTDtmx0w6lzXCIpO1xuICAgICAgICB0aGlzLl9kYXRhSXRlbXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEVsb2ZpemV0bz4oKTtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgdGhpcy5fZGF0YUl0ZW1zLnB1c2goe1xuICAgICAgICAgICAgbmV2OiBcIkJsYXNrw7MgSsOhbm9zXCIsXG4gICAgICAgICAgICBjaW06IFwiTWFsb20gdS4gNDBcIixcbiAgICAgICAgICAgIHVqc2FnOiBcIk7DqXBzemF2YVwiLFxuICAgICAgICAgICAgZGFyYWI6IDFcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWRhdCBob3NzemFcIiArIHRoaXMuX2RhdGFJdGVtcy5wdXNoKHtcbiAgICAgICAgICAgIG5ldjogXCJSw6lwYSBSb3ppXCIsXG4gICAgICAgICAgICBjaW06IFwiTWFsb20gdS4gNDFcIixcbiAgICAgICAgICAgIHVqc2FnOiBcIk7DqXBzemF2YVwiLFxuICAgICAgICAgICAgZGFyYWI6IDFcbiAgICAgICAgfSkpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFkYXQgaG9zc3phXCIgKyB0aGlzLl9kYXRhSXRlbXMubGVuZ3RoKTtcbiAgICAgICAgLypcbiAgICAgICAgdGhpcy5fZGF0YUl0ZW1TZXJ2aWNlLmxpc3RhLnB1Ymxpc2hSZXBsYXkoKS5yZWZDb3VudCgpLnN1YnNjcmliZShcbiAgICAgICAgICAgIChhZGF0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YUl0ZW1zLnB1c2goYWRhdCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJWaXNzemF0w6lydCBhZGF0XCIgKyBKU09OLnN0cmluZ2lmeShhZGF0KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgLyogdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJab25lXCIpO1xuICAgICAgICAgICAgdGhpcy5fZGF0YUl0ZW1zID0gbmV3IE9ic2VydmFibGVBcnJheTxFbG9maXpldG8+KCk7XG4gICAgICAgICAgICB0aGlzLl9kYXRhSXRlbVNlcnZpY2UubGlzdGEucHVibGlzaFJlcGxheSgpLnJlZkNvdW50KCkuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChhZGF0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFJdGVtcy5wdXNoKGFkYXQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlZpc3N6YXTDqXJ0IGFkYXRcIiArIEpTT04uc3RyaW5naWZ5KGFkYXQpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pOyovXG4gICAgfVxuXG4gICAgb25QdWxsVG9SZWZyZXNoSW5pdGlhdGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgICAgIGNvbnN0IGxpc3RWaWV3ID0gYXJncy5vYmplY3Q7XG4gICAgICAgIGxpc3RWaWV3Lm5vdGlmeVB1bGxUb1JlZnJlc2hGaW5pc2hlZCgpO1xuICAgIH1cblxuICAgIGdldCBzaWRlRHJhd2VyVHJhbnNpdGlvbigpOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbjtcbiAgICB9XG5cbiAgICBnZXQgZGF0YUl0ZW1zKCk6IE9ic2VydmFibGVBcnJheTxFbG9maXpldG8+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFJdGVtcztcbiAgICB9XG5cbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICogQWNjb3JkaW5nIHRvIGd1aWRlbGluZXMsIGlmIHlvdSBoYXZlIGEgZHJhd2VyIG9uIHlvdXIgcGFnZSwgeW91IHNob3VsZCBhbHdheXNcbiAgICAqIGhhdmUgYSBidXR0b24gdGhhdCBvcGVucyBpdC4gVXNlIHRoZSBzaG93RHJhd2VyKCkgZnVuY3Rpb24gdG8gb3BlbiB0aGUgYXBwIGRyYXdlciBzZWN0aW9uLlxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xuICAgIH1cblxufVxuIl19