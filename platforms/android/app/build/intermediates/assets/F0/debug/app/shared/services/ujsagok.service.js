"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var Observable_1 = require("rxjs/Observable");
var fs = require("tns-core-modules/file-system");
var elofizeto_model_1 = require("./../models/elofizeto.model");
var UjsagokService = /** @class */ (function () {
    function UjsagokService() {
        this._lista = new BehaviorSubject_1.BehaviorSubject(([]));
        // tslint:disable-next-line:member-ordering
        this.lista = this._lista.asObservable();
        this.readElofizetok();
    }
    UjsagokService.prototype.load = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            console.log("Betöltés2");
            _this.subscr = observer;
            _this.readElofizetok();
        });
    };
    UjsagokService.prototype.readElofizetok = function () {
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
    UjsagokService.prototype.extractData = function (res) {
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
            console.log("Data:" + data);
            if (data.length >= 1) {
                var tarr = new elofizeto_model_1.Elofizeto(data[0], data[1], data[2]);
                lines.push(tarr);
            }
        }
        var rendezett = lines.sort(function (a, b) { return (a.ujsag >= b.ujsag) ? 1 : 0; });
        // this.subscr.next(rendezett);
        this._lista.next(rendezett);
        console.log("sorok száma:" + lines.length);
    };
    UjsagokService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], UjsagokService);
    return UjsagokService;
}());
exports.UjsagokService = UjsagokService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWpzYWdvay5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWpzYWdvay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW1EO0FBQ25ELHdEQUF1RDtBQUN2RCw4Q0FBNkM7QUFFN0MsaURBQW1EO0FBQ25ELCtEQUF3RDtBQUd4RDtJQU9JO1FBTFEsV0FBTSxHQUFzQyxJQUFJLGlDQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlFLDJDQUEyQztRQUNsQyxVQUFLLEdBQWlDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7UUFJdEUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCw2QkFBSSxHQUFKO1FBQUEsaUJBTUM7UUFMRyxNQUFNLENBQUMsdUJBQVUsQ0FBQyxNQUFNLENBQUMsVUFBQyxRQUFRO1lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDekIsS0FBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFDdkIsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLHVDQUFjLEdBQXRCO1FBQUEsaUJBT0M7UUFORyxJQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzlDLElBQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztRQUM5RCxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxVQUFDLE9BQU87WUFDVCxLQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMOzs7V0FHTztJQUVLLG9DQUFXLEdBQW5CLFVBQW9CLEdBQVc7UUFDM0IsNkJBQTZCO1FBQzdCLElBQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsSUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLDZCQUE2QjtRQUM3QixrREFBa0Q7UUFDbEQscURBQXFEO1FBQ3JELHlDQUF5QztRQUN6QyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMzQywrQkFBK0I7WUFDL0IsSUFBTSxJQUFJLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsSUFBTSxJQUFJLEdBQUcsSUFBSSwyQkFBUyxDQUN0QixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckIsQ0FBQztRQUNMLENBQUM7UUFDRCxJQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBTSxPQUFBLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUE1QixDQUE0QixDQUFDLENBQUM7UUFDdEUsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBeERZLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTs7T0FDQSxjQUFjLENBeUQxQjtJQUFELHFCQUFDO0NBQUEsQUF6REQsSUF5REM7QUF6RFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSBcInJ4anMvQmVoYXZpb3JTdWJqZWN0XCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jc3MvcmV3b3JrY3NzXCI7XG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiO1xuaW1wb3J0IHsgRWxvZml6ZXRvIH0gZnJvbSBcIi4vLi4vbW9kZWxzL2Vsb2ZpemV0by5tb2RlbFwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVWpzYWdva1NlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBfbGlzdGE6IEJlaGF2aW9yU3ViamVjdDxBcnJheTxFbG9maXpldG8+PiA9IG5ldyBCZWhhdmlvclN1YmplY3QoKFtdKSk7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1lbWJlci1vcmRlcmluZ1xuICAgIHJlYWRvbmx5IGxpc3RhOiBPYnNlcnZhYmxlPEFycmF5PEVsb2ZpemV0bz4+ID0gdGhpcy5fbGlzdGEuYXNPYnNlcnZhYmxlKCk7XG4gICAgcHJpdmF0ZSBzdWJzY3I7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5yZWFkRWxvZml6ZXRvaygpO1xuICAgIH1cblxuICAgIGxvYWQoKTogT2JzZXJ2YWJsZTxBcnJheTxFbG9maXpldG8+PiB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZSgob2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmV0w7ZsdMOpczJcIik7XG4gICAgICAgICAgICB0aGlzLnN1YnNjciA9IG9ic2VydmVyO1xuICAgICAgICAgICAgdGhpcy5yZWFkRWxvZml6ZXRvaygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlYWRFbG9maXpldG9rKCkge1xuICAgICAgICBjb25zdCBkb2N1bWVudHMgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XG4gICAgICAgIGNvbnN0IGNzdkZpbGUgPSBkb2N1bWVudHMuZ2V0RmlsZShcImFwcC9maWxlcy91anNhZ2xpc3RhLmNzdlwiKTtcbiAgICAgICAgY3N2RmlsZS5yZWFkVGV4dCgpLlxuICAgICAgICB0aGVuKChjb250ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV4dHJhY3REYXRhKGNvbnRlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG4vKlxuICAgIHByaXZhdGUgaGFuZGxlRXJyb3JzKGVycm9yOiBSZXNwb25zZSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yKTtcbiAgICB9Ki9cblxuICAgIHByaXZhdGUgZXh0cmFjdERhdGEocmVzOiBzdHJpbmcpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZXM6XCIgKyByZXMpO1xuICAgICAgICBjb25zdCBhbGxUZXh0TGluZXMgPSByZXMuc3BsaXQoL1xcclxcbnxcXG4vKTtcbiAgICAgICAgY29uc3QgbGluZXMgPSBbXTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJyZXM6XCIgKyByZXMpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIk51bGxhZGlrIHNvcjpcIiArIGFsbFRleHRMaW5lc1swXSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwic29yb2sgc3rDoW1hOlwiICsgYWxsVGV4dExpbmVzLmxlbmd0aCk7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItZm9yLW9mXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWxsVGV4dExpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBzcGxpdCBjb250ZW50IGJhc2VkIG9uIGNvbW1hXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYWxsVGV4dExpbmVzW2ldLnJlcGxhY2UoL1xccysvLCBcIiBcIikuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEYXRhOlwiICsgZGF0YSk7XG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcnIgPSBuZXcgRWxvZml6ZXRvKFxuICAgICAgICAgICAgICAgICAgICBkYXRhWzBdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhWzFdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhWzJdKTtcbiAgICAgICAgICAgICAgICBsaW5lcy5wdXNoKHRhcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlbmRlemV0dCA9IGxpbmVzLnNvcnQoKGEsIGIpID0+ICAoYS51anNhZyA+PSBiLnVqc2FnKSA/IDEgOiAwKTtcbiAgICAgICAgLy8gdGhpcy5zdWJzY3IubmV4dChyZW5kZXpldHQpO1xuICAgICAgICB0aGlzLl9saXN0YS5uZXh0KHJlbmRlemV0dCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic29yb2sgc3rDoW1hOlwiICsgbGluZXMubGVuZ3RoKTtcbn1cbn1cbiJdfQ==