"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var fs = require("tns-core-modules/file-system");
var elofizeto_model_1 = require("./../models/elofizeto.model");
var ElofizetoService = /** @class */ (function () {
    function ElofizetoService() {
    }
    ElofizetoService.prototype.load = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.subscr = observer;
            _this.readElofizetok();
        }); // .catch(this.handleErrors);
    };
    /*const path = "cars";

    const onValueEvent = (snapshot: any) => {
        this._ngZone.run(() => {
            const results = this.handleSnapshot(snapshot.value);
            observer.next(results);
        });
    };
    //firebase.addValueEventListener(onValueEvent, `/${path}`);*/
    ElofizetoService.prototype.readElofizetok = function () {
        var _this = this;
        var documents = fs.knownFolders.documents();
        var csvFile = documents.getFile("app/files/ujsaglista.csv");
        csvFile.readText().
            then(function (content) {
            _this.extractData(content);
        });
    };
    /*
        private handleErrors(error: Response): Observable<any> {
            return Observable.throw(error);
        }*/
    ElofizetoService.prototype.extractData = function (res) {
        // console.log("res:" + res);
        var allTextLines = res.split(/\r\n|\n/);
        var lines = [];
        // console.log("res:" + res);
        // console.log("Nulladik sor:" + allTextLines[0]);
        // console.log("sorok száma:" + allTextLines.length);
        // tslint:disable-next-line:prefer-for-of
        for (var i = 0; i < allTextLines.length; i++) {
            // split content based on comma
            var data = allTextLines[i].replace(/\s+/, " ").split(",");
            // console.log("Data:" + data);
            if (data.length >= 1) {
                var tarr = new elofizeto_model_1.Elofizeto(data[0], data[1], data[2]);
                lines.push(tarr);
            }
        }
        var rendezett = lines.sort(function (a, b) { return (a.cim >= b.cim) ? 1 : 0; });
        this.subscr.next(rendezett);
        console.log("sorok száma:" + lines.length);
    };
    ElofizetoService = __decorate([
        core_1.Injectable()
    ], ElofizetoService);
    return ElofizetoService;
}());
exports.ElofizetoService = ElofizetoService;
// tslint:disable-next-line:member-ordering
exports.mock = {
    elofizetok: [
        {
            nev: "Blaskó János",
            cim: "Malom u. 40",
            ujsag: "Népszava",
            darab: 1
        },
        {
            nev: "Répa Rozi",
            cim: "Malom u. 41",
            ujsag: "Népszava",
            darab: 1
        }
    ]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxvZml6ZXRvay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWxvZml6ZXRvay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW1EO0FBQ25ELDhDQUE2RDtBQUU3RCxpREFBbUQ7QUFDbkQsK0RBQXdEO0FBR3hEO0lBQUE7SUF3REEsQ0FBQztJQXJERywrQkFBSSxHQUFKO1FBQUEsaUJBS0M7UUFKRyxNQUFNLENBQUMsdUJBQVksQ0FBQyxNQUFNLENBQUMsVUFBQyxRQUFRO1lBQ2hDLEtBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQyxDQUFDLDZCQUE2QjtJQUNyQyxDQUFDO0lBRU87Ozs7Ozs7O2lFQVE2RDtJQUM3RCx5Q0FBYyxHQUF0QjtRQUFBLGlCQU9DO1FBTkcsSUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QyxJQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDOUQsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsVUFBQyxPQUFPO1lBQ1QsS0FBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTDs7O1dBR087SUFFSyxzQ0FBVyxHQUFuQixVQUFvQixHQUFXO1FBQzNCLDZCQUE2QjtRQUM3QixJQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqQiw2QkFBNkI7UUFDN0Isa0RBQWtEO1FBQ2xELHFEQUFxRDtRQUNyRCx5Q0FBeUM7UUFDekMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDM0MsK0JBQStCO1lBQy9CLElBQU0sSUFBSSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1RCwrQkFBK0I7WUFDL0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFNLElBQUksR0FBRyxJQUFJLDJCQUFTLENBQ3RCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQixDQUFDO1FBQ0wsQ0FBQztRQUNELElBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFNLE9BQUEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQXhCLENBQXdCLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQXZEWSxnQkFBZ0I7UUFENUIsaUJBQVUsRUFBRTtPQUNBLGdCQUFnQixDQXdENUI7SUFBRCx1QkFBQztDQUFBLEFBeERELElBd0RDO0FBeERZLDRDQUFnQjtBQXlEekIsMkNBQTJDO0FBQ2xDLFFBQUEsSUFBSSxHQUFHO0lBQ2hCLFVBQVUsRUFBRTtRQUNSO1lBQ0ksR0FBRyxFQUFFLGNBQWM7WUFDbkIsR0FBRyxFQUFFLGFBQWE7WUFDbEIsS0FBSyxFQUFFLFVBQVU7WUFDakIsS0FBSyxFQUFFLENBQUM7U0FDWDtRQUNEO1lBQ0ksR0FBRyxFQUFFLFdBQVc7WUFDaEIsR0FBRyxFQUFFLGFBQWE7WUFDbEIsS0FBSyxFQUFFLFVBQVU7WUFDakIsS0FBSyxFQUFFLENBQUM7U0FDWDtLQUNKO0NBQ0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCB7IHBhcnNlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvY3NzL3Jld29ya2Nzc1wiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIjtcbmltcG9ydCB7IEVsb2ZpemV0byB9IGZyb20gXCIuLy4uL21vZGVscy9lbG9maXpldG8ubW9kZWxcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVsb2ZpemV0b1NlcnZpY2Uge1xuICAgIHByaXZhdGUgc3Vic2NyO1xuXG4gICAgbG9hZCgpOiBSeE9ic2VydmFibGU8QXJyYXk8RWxvZml6ZXRvPj4ge1xuICAgICAgICByZXR1cm4gUnhPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyID0gb2JzZXJ2ZXI7XG4gICAgICAgICAgICB0aGlzLnJlYWRFbG9maXpldG9rKCk7XG4gICAgICAgIH0pOyAvLyAuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xuICAgIH1cblxuICAgICAgICAgICAgLypjb25zdCBwYXRoID0gXCJjYXJzXCI7XG5cbiAgICAgICAgICAgIGNvbnN0IG9uVmFsdWVFdmVudCA9IChzbmFwc2hvdDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMgPSB0aGlzLmhhbmRsZVNuYXBzaG90KHNuYXBzaG90LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvL2ZpcmViYXNlLmFkZFZhbHVlRXZlbnRMaXN0ZW5lcihvblZhbHVlRXZlbnQsIGAvJHtwYXRofWApOyovXG4gICAgcHJpdmF0ZSByZWFkRWxvZml6ZXRvaygpIHtcbiAgICAgICAgY29uc3QgZG9jdW1lbnRzID0gZnMua25vd25Gb2xkZXJzLmRvY3VtZW50cygpO1xuICAgICAgICBjb25zdCBjc3ZGaWxlID0gZG9jdW1lbnRzLmdldEZpbGUoXCJhcHAvZmlsZXMvdWpzYWdsaXN0YS5jc3ZcIik7XG4gICAgICAgIGNzdkZpbGUucmVhZFRleHQoKS5cbiAgICAgICAgdGhlbigoY29udGVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5leHRyYWN0RGF0YShjb250ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuLypcbiAgICBwcml2YXRlIGhhbmRsZUVycm9ycyhlcnJvcjogUmVzcG9uc2UpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcik7XG4gICAgfSovXG5cbiAgICBwcml2YXRlIGV4dHJhY3REYXRhKHJlczogc3RyaW5nKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVzOlwiICsgcmVzKTtcbiAgICAgICAgY29uc3QgYWxsVGV4dExpbmVzID0gcmVzLnNwbGl0KC9cXHJcXG58XFxuLyk7XG4gICAgICAgIGNvbnN0IGxpbmVzID0gW107XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwicmVzOlwiICsgcmVzKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJOdWxsYWRpayBzb3I6XCIgKyBhbGxUZXh0TGluZXNbMF0pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInNvcm9rIHN6w6FtYTpcIiArIGFsbFRleHRMaW5lcy5sZW5ndGgpO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWZvci1vZlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsbFRleHRMaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8gc3BsaXQgY29udGVudCBiYXNlZCBvbiBjb21tYVxuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGFsbFRleHRMaW5lc1tpXS5yZXBsYWNlKC9cXHMrLywgXCIgXCIpLnNwbGl0KFwiLFwiKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRGF0YTpcIiArIGRhdGEpO1xuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJyID0gbmV3IEVsb2ZpemV0byhcbiAgICAgICAgICAgICAgICAgICAgZGF0YVswXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVsxXSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVsyXSk7XG4gICAgICAgICAgICAgICAgbGluZXMucHVzaCh0YXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZW5kZXpldHQgPSBsaW5lcy5zb3J0KChhLCBiKSA9PiAgKGEuY2ltID49IGIuY2ltKSA/IDEgOiAwKTtcbiAgICAgICAgdGhpcy5zdWJzY3IubmV4dChyZW5kZXpldHQpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInNvcm9rIHN6w6FtYTpcIiArIGxpbmVzLmxlbmd0aCk7XG59XG59XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1lbWJlci1vcmRlcmluZ1xuZXhwb3J0IGNvbnN0IG1vY2sgPSB7XG4gICAgZWxvZml6ZXRvazogW1xuICAgICAgICB7XG4gICAgICAgICAgICBuZXY6IFwiQmxhc2vDsyBKw6Fub3NcIixcbiAgICAgICAgICAgIGNpbTogXCJNYWxvbSB1LiA0MFwiLFxuICAgICAgICAgICAgdWpzYWc6IFwiTsOpcHN6YXZhXCIsXG4gICAgICAgICAgICBkYXJhYjogMVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuZXY6IFwiUsOpcGEgUm96aVwiLFxuICAgICAgICAgICAgY2ltOiBcIk1hbG9tIHUuIDQxXCIsXG4gICAgICAgICAgICB1anNhZzogXCJOw6lwc3phdmFcIixcbiAgICAgICAgICAgIGRhcmFiOiAxXG4gICAgICAgIH1cbiAgICBdXG4gICAgIH07XG4iXX0=