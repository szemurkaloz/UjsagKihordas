Object.defineProperty(exports, "__esModule", { value: true });
var commonModule = require("./calendar-common");
var utilsModule = require("tns-core-modules/utils/utils");
var color_1 = require("tns-core-modules/color");
var observable_array_1 = require("tns-core-modules/data/observable-array");
require("utils/module-merge").merge(commonModule, exports);
var CalendarEvent = (function (_super) {
    __extends(CalendarEvent, _super);
    function CalendarEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CalendarEvent.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.calendar.events.Event("default", new Date(1990, 0, 1).getTime(), new Date(1990, 0, 2).getTime());
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    CalendarEvent.prototype._setIsAllDay = function (value) {
        this.android.setAllDay(value);
    };
    CalendarEvent.prototype._getIsAllDay = function () {
        return this.android.isAllDay();
    };
    CalendarEvent.prototype._setEndDate = function (date) {
        this.android.setEndDate(date.getTime());
    };
    CalendarEvent.prototype._getEndDate = function () {
        return new Date(this.android.getEndDate());
    };
    CalendarEvent.prototype._setStartDate = function (date) {
        this.android.setStartDate(date.getTime());
    };
    CalendarEvent.prototype._getStartDate = function () {
        return new Date(this.android.getStartDate());
    };
    CalendarEvent.prototype._setTitle = function (value) {
        this.android.setTitle(value);
    };
    CalendarEvent.prototype._getTitle = function () {
        return this.android.getTitle();
    };
    CalendarEvent.prototype._setEventColor = function (value) {
        this.android.setEventColor(value.argb);
    };
    CalendarEvent.prototype._getEventColor = function () {
        return new color_1.Color(this.android.getEventColor());
    };
    return CalendarEvent;
}(commonModule.CalendarEvent));
exports.CalendarEvent = CalendarEvent;
/**
 * Helper methods
 */
var /**
 * Helper methods
 */
Tool = (function () {
    function Tool() {
    }
    Tool.createTypeface = function (name, style) {
        var fontStyle = android.graphics.Typeface.NORMAL;
        if (style) {
            switch (style.toLowerCase()) {
                case commonModule.FontStyles.Bold.toLowerCase():
                    fontStyle = android.graphics.Typeface.BOLD;
                    break;
                case commonModule.FontStyles.Italic.toLowerCase():
                    fontStyle = android.graphics.Typeface.ITALIC;
                    break;
                case commonModule.FontStyles.BoldItalic.toLowerCase():
                    fontStyle = android.graphics.Typeface.BOLD_ITALIC;
                    break;
                default:
                    console.log("WARNING: Unsupported typeface style: " + style);
            }
        }
        if (name) {
            return android.graphics.Typeface.create(name, fontStyle);
        }
        return android.graphics.Typeface.create(android.graphics.Typeface.DEFAULT, fontStyle);
    };
    return Tool;
}());
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                          STYLES FOR DIFFERENT CELL TYPES
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Enum values identify to what type of cells is related the style object
 */
//                                          STYLES FOR DIFFERENT CELL TYPES
/**
 * Enum values identify to what type of cells is related the style object
 */
var CellStyleType;
//                                          STYLES FOR DIFFERENT CELL TYPES
/**
 * Enum values identify to what type of cells is related the style object
 */
(function (CellStyleType) {
    CellStyleType[CellStyleType["RegularDayStyle"] = 0] = "RegularDayStyle";
    CellStyleType[CellStyleType["SelectedDayStyle"] = 1] = "SelectedDayStyle";
    CellStyleType[CellStyleType["TodayStyle"] = 2] = "TodayStyle";
    CellStyleType[CellStyleType["WeekNumberStyle"] = 3] = "WeekNumberStyle";
    CellStyleType[CellStyleType["WeekendStyle"] = 4] = "WeekendStyle";
    CellStyleType[CellStyleType["DayNameStyle"] = 5] = "DayNameStyle";
    CellStyleType[CellStyleType["TitleStyle"] = 6] = "TitleStyle";
    CellStyleType[CellStyleType["MonthNameStyle"] = 7] = "MonthNameStyle"; //cell for month name in compact Year view mode
})(CellStyleType = exports.CellStyleType || (exports.CellStyleType = {}));
var CellStyleInitializer = (function () {
    function CellStyleInitializer() {
    }
    CellStyleInitializer.prototype.applyStyle = function (value) {
        this.changeCellBorderWidth(value.cellBorderWidth, value);
        this.changeCellBorderColor(value.cellBorderColor, value);
        this.changeCellBackgroundColor(value.cellBackgroundColor, value);
        this.changeCellAlignment(value.cellAlignment, value);
        this.changeCellPaddingHorizontal(value.cellPaddingHorizontal, value);
        this.changeCellPaddingVertical(value.cellPaddingVertical, value);
        this.changeCellTextColor(value.cellTextColor, value);
        this.changeCellTextFontName(value.cellTextFontName, value);
        this.changeCellTextFontStyle(value.cellTextFontStyle, value);
        this.changeCellTextSize(value.cellTextSize, value);
        value.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellBorderWidth = function (value, style) {
        if (isNaN(value)) {
            return;
        }
        var borderWidth = new java.lang.Float(value * utilsModule.layout.getDisplayDensity());
        style.android.setBorderWidth(borderWidth);
    };
    CellStyleInitializer.prototype.onCellBorderWidthChanged = function (value, style) {
        this.changeCellBorderWidth(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellBorderColor = function (value, style) {
        if (!value) {
            return;
        }
        var color = (new color_1.Color(value)).argb;
        var borderColor = new java.lang.Integer(color);
        style.android.setBorderColor(borderColor);
    };
    CellStyleInitializer.prototype.onCellBorderColorChanged = function (value, style) {
        this.changeCellBorderColor(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellBackgroundColor = function (value, style) {
        if (!value) {
            return;
        }
        var color = (new color_1.Color(value)).argb;
        var backgroundColor = new java.lang.Integer(color);
        style.android.setBackgroundColor(backgroundColor);
    };
    CellStyleInitializer.prototype.onCellBackgroundColorChanged = function (value, style) {
        this.changeCellBackgroundColor(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellAlignment = function (value, style) {
        if (!value) {
            return;
        }
        var position;
        switch (value.toLowerCase()) {
            case commonModule.CalendarCellAlignment.Bottom.toLowerCase():
                position = com.telerik.widget.calendar.CalendarElement.BOTTOM;
                break;
            case commonModule.CalendarCellAlignment.Top.toLowerCase():
                position = com.telerik.widget.calendar.CalendarElement.TOP;
                break;
            case commonModule.CalendarCellAlignment.Left.toLowerCase():
                position = com.telerik.widget.calendar.CalendarElement.LEFT;
                break;
            case commonModule.CalendarCellAlignment.Right.toLowerCase():
                position = com.telerik.widget.calendar.CalendarElement.RIGHT;
                break;
            case commonModule.CalendarCellAlignment.HorizontalCenter.toLowerCase():
                position = com.telerik.widget.calendar.CalendarElement.CENTER_HORIZONTAL;
                break;
            case commonModule.CalendarCellAlignment.VerticalCenter.toLowerCase():
                position = com.telerik.widget.calendar.CalendarElement.CENTER_VERTICAL;
                break;
            default:
                position = com.telerik.widget.calendar.CalendarElement.CENTER;
        }
        var positionValue = new java.lang.Integer(position);
        style.android.setTextPosition(positionValue);
    };
    CellStyleInitializer.prototype.onCellAlignmentChanged = function (value, style) {
        this.changeCellAlignment(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellPaddingHorizontal = function (value, style) {
        if (isNaN(value)) {
            return;
        }
        var paddingVal = value * utilsModule.layout.getDisplayDensity();
        var padding = new java.lang.Integer(paddingVal);
        style.android.setPaddingHorizontal(padding);
    };
    CellStyleInitializer.prototype.onCellPaddingHorizontalChanged = function (value, style) {
        this.changeCellPaddingHorizontal(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellPaddingVertical = function (value, style) {
        if (isNaN(value)) {
            return;
        }
        var paddingVal = value * utilsModule.layout.getDisplayDensity();
        var padding = new java.lang.Integer(paddingVal);
        style.android.setPaddingVertical(padding);
    };
    CellStyleInitializer.prototype.onCellPaddingVerticalChanged = function (value, style) {
        this.changeCellPaddingVertical(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellTextColor = function (value, style) {
        if (!value) {
            return;
        }
        var color = (new color_1.Color(value)).argb;
        var textColor = new java.lang.Integer(color);
        style.android.setTextColor(textColor);
    };
    CellStyleInitializer.prototype.onCellTextColorChanged = function (value, style) {
        this.changeCellTextColor(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellTextFontName = function (value, style) {
        if (!value) {
            return;
        }
        var font = Tool.createTypeface(value, style.cellTextFontStyle);
        style.android.setFontName(value);
    };
    CellStyleInitializer.prototype.onCellTextFontNameChanged = function (value, style) {
        this.changeCellTextFontName(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellTextFontStyle = function (value, style) {
        if (!value) {
            return;
        }
        var font = Tool.createTypeface(style.cellTextFontName, value);
        var fontStyle = new java.lang.Integer(font.getStyle());
        style.android.setFontStyle(fontStyle);
    };
    CellStyleInitializer.prototype.onCellTextFontStyleChanged = function (value, style) {
        this.changeCellTextFontStyle(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.changeCellTextSize = function (value, style) {
        if (isNaN(value)) {
            return;
        }
        var size = value * utilsModule.layout.getDisplayDensity();
        var textSize = new java.lang.Float(size);
        style.android.setTextSize(textSize);
    };
    CellStyleInitializer.prototype.onCellTextSizeChanged = function (value, style) {
        this.changeCellTextSize(value, style);
        style.onStyleChanged();
    };
    CellStyleInitializer.prototype.makeDayCellFilter = function (cellStyleType, displayMode) {
        var cellFilter = new com.telerik.widget.calendar.CalendarDayCellFilter();
        var positiveFilter = new java.lang.Boolean(true);
        switch (cellStyleType) {
            case CellStyleType.TodayStyle:
                cellFilter.setIsToday(positiveFilter);
            case CellStyleType.RegularDayStyle:
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.Date);
                break;
            case CellStyleType.WeekendStyle:
                cellFilter.setIsWeekend(positiveFilter);
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.Date);
                break;
            case CellStyleType.DayNameStyle:
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.DayName);
                break;
            case CellStyleType.WeekNumberStyle:
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.WeekNumber);
                break;
            case CellStyleType.TitleStyle:
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.Title);
                break;
            case CellStyleType.SelectedDayStyle:
                cellFilter.setCellType(com.telerik.widget.calendar.CalendarCellType.Date);
                cellFilter.setIsSelected(positiveFilter);
                break;
        }
        if (displayMode) {
            cellFilter.setCalendarDisplayMode(displayMode);
        }
        return cellFilter;
    };
    CellStyleInitializer.prototype.makeMonthCellFilter = function () {
        var cellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
        var positiveFilter = new java.lang.Boolean(true);
        cellFilter.setMonthIsCompact(positiveFilter);
        return cellFilter;
    };
    return CellStyleInitializer;
}());
exports.CellStyleInitializer = CellStyleInitializer;
var CellStyle = (function (_super) {
    __extends(CellStyle, _super);
    function CellStyle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._nativeIsYear = false;
        return _this;
    }
    Object.defineProperty(CellStyle.prototype, "nativeIsYear", {
        set: function (value) {
            if (this._nativeIsYear != value) {
                this._nativeIsYear = value;
                this._android = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellStyle.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new CellStyleInitializer();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CellStyle.prototype, "android", {
        get: function () {
            if (!this._android) {
                if (this._nativeIsYear) {
                    this._android = new com.telerik.widget.calendar.CalendarMonthCellStyle();
                    this.initializer.applyStyle(this);
                }
                else {
                    this._android = new com.telerik.widget.calendar.CalendarDayCellStyle();
                }
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    CellStyle.prototype.updateNativeStyleFilters = function (cellStyleType, displayMode) {
        if (!this._owner) {
            return;
        }
        if (this._nativeIsYear) {
            var filter = this.initializer.makeMonthCellFilter();
            this.android.setFilter(filter);
        }
        else {
            var filter = this.initializer.makeDayCellFilter(cellStyleType, displayMode);
            this.android.setFilter(filter);
        }
    };
    CellStyle.prototype.onStyleChanged = function () {
        if (this._owner) {
            this._owner.updateCalendar();
        }
    };
    CellStyle.prototype.onCellBorderWidthChanged = function (oldValue, newValue) {
        this.initializer.onCellBorderWidthChanged(newValue, this);
    };
    CellStyle.prototype.onCellBorderColorChanged = function (oldValue, newValue) {
        this.initializer.onCellBorderColorChanged(newValue, this);
    };
    CellStyle.prototype.onCellBackgroundColorChanged = function (oldValue, newValue) {
        this.initializer.onCellBackgroundColorChanged(newValue, this);
    };
    CellStyle.prototype.onCellTextColorChanged = function (oldValue, newValue) {
        this.initializer.onCellTextColorChanged(newValue, this);
    };
    CellStyle.prototype.onCellTextFontNameChanged = function (oldValue, newValue) {
        this.initializer.onCellTextFontNameChanged(newValue, this);
    };
    CellStyle.prototype.onCellTextFontStyleChanged = function (oldValue, newValue) {
        this.initializer.onCellTextFontStyleChanged(newValue, this);
    };
    CellStyle.prototype.onCellTextSizeChanged = function (oldValue, newValue) {
        this.initializer.onCellTextSizeChanged(newValue, this);
    };
    CellStyle.prototype.onCellPaddingHorizontalChanged = function (oldValue, newValue) {
        this.initializer.onCellPaddingHorizontalChanged(newValue, this);
    };
    CellStyle.prototype.onCellPaddingVerticalChanged = function (oldValue, newValue) {
        this.initializer.onCellPaddingVerticalChanged(newValue, this);
    };
    CellStyle.prototype.onCellAlignmentChanged = function (oldValue, newValue) {
        this.initializer.onCellAlignmentChanged(newValue, this);
    };
    return CellStyle;
}(commonModule.CellStyle));
exports.CellStyle = CellStyle;
var DayEventsViewStyle = (function (_super) {
    __extends(DayEventsViewStyle, _super);
    function DayEventsViewStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DayEventsViewStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
            this.applyStyles();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayEventsViewStyle.prototype, "android", {
        get: function () {
            if (!this._owner) {
                return null;
            }
            return this._owner.getDayView().getDayEventsViewStyle();
        },
        enumerable: true,
        configurable: true
    });
    DayEventsViewStyle.prototype.applyStyles = function () {
        if (this.backgroundColor) {
            this.changeBackgroundColor(null, this.backgroundColor);
        }
        if (this.timeLabelFormat) {
            this.changeTimeLabelFormat(null, this.timeLabelFormat);
        }
        if (this.timeLabelTextColor) {
            this.changeTimeLabelTextColor(null, this.timeLabelTextColor);
        }
        if (this.timeLabelTextSize) {
            this.changeTimeLabelTextSize(null, this.timeLabelTextSize);
        }
        if (this.timeLinesWidth) {
            this.changeTimeLinesWidth(null, this.timeLinesWidth);
        }
        if (this.timeLinesColor) {
            this.changeTimeLinesColor(null, this.timeLinesColor);
        }
    };
    DayEventsViewStyle.prototype.onBackgroundColorChanged = function (oldValue, newValue) {
        this.changeBackgroundColor(oldValue, newValue);
    };
    DayEventsViewStyle.prototype.changeBackgroundColor = function (oldValue, newValue) {
        if (this.android) {
            this.android.setBackgroundColor((new color_1.Color(newValue)).android);
        }
    };
    DayEventsViewStyle.prototype.onTimeLabelFormatChanged = function (oldValue, newValue) {
        this.changeTimeLabelFormat(oldValue, newValue);
    };
    DayEventsViewStyle.prototype.changeTimeLabelFormat = function (oldValue, newValue) {
        if (this.android) {
            this.android.setTimeLabelFormat(new java.text.SimpleDateFormat(newValue));
        }
    };
    DayEventsViewStyle.prototype.onTimeLabelTextColorChanged = function (oldValue, newValue) {
        this.changeTimeLabelTextColor(oldValue, newValue);
    };
    DayEventsViewStyle.prototype.changeTimeLabelTextColor = function (oldValue, newValue) {
        if (this.android) {
            this.android.setTimeLabelColor((new color_1.Color(newValue)).android);
        }
    };
    DayEventsViewStyle.prototype.onTimeLabelTextSizeChanged = function (oldValue, newValue) {
        this.changeTimeLabelTextSize(oldValue, newValue);
    };
    DayEventsViewStyle.prototype.changeTimeLabelTextSize = function (oldValue, newValue) {
        if (this.android) {
            this.android.setTimeLabelTextSize(newValue * utilsModule.layout.getDisplayDensity());
        }
    };
    DayEventsViewStyle.prototype.onTimeLinesWidthChanged = function (oldValue, newValue) {
        this.changeTimeLinesWidth(oldValue, newValue);
    };
    DayEventsViewStyle.prototype.changeTimeLinesWidth = function (oldValue, newValue) {
        if (this.android) {
            this.android.setTimeLinesWidth(newValue * utilsModule.layout.getDisplayDensity());
        }
    };
    DayEventsViewStyle.prototype.onTimeLinesColorChanged = function (oldValue, newValue) {
        this.changeTimeLinesColor(oldValue, newValue);
    };
    DayEventsViewStyle.prototype.changeTimeLinesColor = function (oldValue, newValue) {
        if (this.android) {
            this.android.setTimeLinesColor((new color_1.Color(newValue)).android);
        }
    };
    return DayEventsViewStyle;
}(commonModule.DayEventsViewStyle));
exports.DayEventsViewStyle = DayEventsViewStyle;
var AllDayEventsViewStyle = (function (_super) {
    __extends(AllDayEventsViewStyle, _super);
    function AllDayEventsViewStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AllDayEventsViewStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
            this.applyStyles();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AllDayEventsViewStyle.prototype, "android", {
        get: function () {
            if (!this._owner) {
                return null;
            }
            return this._owner.getDayView().getAllDayEventsViewStyle();
        },
        enumerable: true,
        configurable: true
    });
    AllDayEventsViewStyle.prototype.applyStyles = function () {
        if (this.backgroundColor) {
            this.changeBackgroundColor(null, this.backgroundColor);
        }
        if (this.allDayText != AllDayEventsViewStyle.ALL_DAY_TEXT) {
            this.changeAllDayText(AllDayEventsViewStyle.ALL_DAY_TEXT, this.allDayText);
        }
        if (this.allDayTextIsVisible != undefined) {
            this.changeAllDayTextIsVisible(null, this.allDayTextIsVisible);
        }
    };
    AllDayEventsViewStyle.prototype.onBackgroundColorChanged = function (oldValue, newValue) {
        this.changeBackgroundColor(oldValue, newValue);
    };
    AllDayEventsViewStyle.prototype.changeBackgroundColor = function (oldValue, newValue) {
        if (this.android) {
            this.android.setBackgroundColor((new color_1.Color(newValue)).android);
        }
    };
    AllDayEventsViewStyle.prototype.onAllDayTextChanged = function (oldValue, newValue) {
        this.changeAllDayText(oldValue, newValue);
    };
    AllDayEventsViewStyle.prototype.changeAllDayText = function (oldValue, newValue) {
        if (this.android) {
            this.android.setAllDayText(newValue);
        }
    };
    AllDayEventsViewStyle.prototype.onAllDayTextIsVisibleChanged = function (oldValue, newValue) {
        this.changeAllDayTextIsVisible(oldValue, newValue);
    };
    AllDayEventsViewStyle.prototype.changeAllDayTextIsVisible = function (oldValue, newValue) {
        if (this.android) {
            this.android.setAllDayTextIsVisible(newValue);
        }
    };
    return AllDayEventsViewStyle;
}(commonModule.AllDayEventsViewStyle));
exports.AllDayEventsViewStyle = AllDayEventsViewStyle;
var DayCellStyle = (function (_super) {
    __extends(DayCellStyle, _super);
    function DayCellStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DayCellStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayCellStyle.prototype, "eventAdapter", {
        set: function (value) {
            this._eventAdapter = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayCellStyle.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new CellStyleInitializer();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DayCellStyle.prototype, "android", {
        get: function () {
            if (!this._android) {
                this._android = new com.telerik.widget.calendar.CalendarDayCellStyle();
            }
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    DayCellStyle.prototype.updateNativeStyleFilters = function (cellStyleType, displayMode) {
        if (!this._owner) {
            return;
        }
        var filter = this.initializer.makeDayCellFilter(cellStyleType, displayMode);
        this.android.setFilter(filter);
    };
    DayCellStyle.prototype.onCellBorderWidthChanged = function (oldValue, newValue) {
        this.initializer.onCellBorderWidthChanged(newValue, this);
    };
    DayCellStyle.prototype.onCellBorderColorChanged = function (oldValue, newValue) {
        this.initializer.onCellBorderColorChanged(newValue, this);
    };
    DayCellStyle.prototype.onCellBackgroundColorChanged = function (oldValue, newValue) {
        this.initializer.onCellBackgroundColorChanged(newValue, this);
    };
    DayCellStyle.prototype.onCellTextColorChanged = function (oldValue, newValue) {
        this.initializer.onCellTextColorChanged(newValue, this);
    };
    DayCellStyle.prototype.onCellTextFontNameChanged = function (oldValue, newValue) {
        this.initializer.onCellTextFontNameChanged(newValue, this);
    };
    DayCellStyle.prototype.onCellTextFontStyleChanged = function (oldValue, newValue) {
        this.initializer.onCellTextFontStyleChanged(newValue, this);
    };
    DayCellStyle.prototype.onCellTextSizeChanged = function (oldValue, newValue) {
        this.initializer.onCellTextSizeChanged(newValue, this);
    };
    DayCellStyle.prototype.onCellPaddingHorizontalChanged = function (oldValue, newValue) {
        this.initializer.onCellPaddingHorizontalChanged(newValue, this);
    };
    DayCellStyle.prototype.onCellPaddingVerticalChanged = function (oldValue, newValue) {
        this.initializer.onCellPaddingVerticalChanged(newValue, this);
    };
    DayCellStyle.prototype.onCellAlignmentChanged = function (oldValue, newValue) {
        this.initializer.onCellAlignmentChanged(newValue, this);
    };
    DayCellStyle.prototype.onStyleChanged = function () {
        if (this._owner) {
            this._owner.updateCalendar();
        }
    };
    //day cell specific properties
    //day cell specific properties
    DayCellStyle.prototype.onShowEventsTextChanged = 
    //day cell specific properties
    function (oldValue, newValue) {
        if (newValue == undefined || newValue == null || !this.eventAdapter) {
            return;
        }
        this.eventAdapter.getRenderer().setEventRenderMode(newValue ? com.telerik.widget.calendar.events.EventRenderMode.Shape_And_Text : com.telerik.widget.calendar.events.EventRenderMode.Shape);
    };
    DayCellStyle.prototype.onEventTextColorChanged = function (oldValue, newValue) {
        if (!newValue || !this.eventAdapter) {
            return;
        }
        //TODO: Event text color property not supported in Android.
    };
    DayCellStyle.prototype.onEventFontNameChanged = function (oldValue, newValue) {
        if (!newValue || !this.eventAdapter) {
            return;
        }
        //TODO: Event font name property not supported in Android.
    };
    DayCellStyle.prototype.onEventFontStyleChanged = function (oldValue, newValue) {
        if (!newValue || !this.eventAdapter) {
            return;
        }
        //TODO: Event font style property not supported in Android.
    };
    DayCellStyle.prototype.onEventTextSizeChanged = function (oldValue, newValue) {
        if (isNaN(newValue) || !this.eventAdapter) {
            return;
        }
        this.eventAdapter.getRenderer().setEventTextSize(newValue * utilsModule.layout.getDisplayDensity());
    };
    return DayCellStyle;
}(commonModule.DayCellStyle));
exports.DayCellStyle = DayCellStyle;
/**
 * Cell style class for months in year view mode
 */
var /**
 * Cell style class for months in year view mode
 */
MonthCellStyle = (function (_super) {
    __extends(MonthCellStyle, _super);
    function MonthCellStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MonthCellStyle.prototype, "regularDayStyle", {
        get: function () {
            if (!this._regularDayStyle) {
                this._regularDayStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
                var dateMonthCellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
                var positiveFilter = new java.lang.Boolean(true);
                dateMonthCellFilter.setTextIsDate(positiveFilter);
                this._regularDayStyle.setFilter(dateMonthCellFilter);
            }
            return this._regularDayStyle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthCellStyle.prototype, "weekendStyle", {
        get: function () {
            if (!this._weekendStyle) {
                this._weekendStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
                var weekendMonthCellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
                var positiveFilter = new java.lang.Boolean(true);
                weekendMonthCellFilter.setTextIsWeekend(positiveFilter);
                this._weekendStyle.setFilter(weekendMonthCellFilter);
            }
            return this._weekendStyle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthCellStyle.prototype, "todayStyle", {
        get: function () {
            if (!this._todayStyle) {
                this._todayStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
                var todayMonthCellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
                var positiveFilter = new java.lang.Boolean(true);
                todayMonthCellFilter.setTextIsToday(positiveFilter);
                this._todayStyle.setFilter(todayMonthCellFilter);
            }
            return this._todayStyle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthCellStyle.prototype, "dayNameStyle", {
        get: function () {
            if (!this._dayNameStyle) {
                this._dayNameStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
                var dayNameMonthCellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
                var positiveFilter = new java.lang.Boolean(true);
                dayNameMonthCellFilter.setTextIsDayName(positiveFilter);
                this._dayNameStyle.setFilter(dayNameMonthCellFilter);
            }
            return this._dayNameStyle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthCellStyle.prototype, "monthNameStyle", {
        get: function () {
            if (!this._monthNameStyle) {
                this._monthNameStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
                var monthNameMonthCellFilter = new com.telerik.widget.calendar.CalendarMonthCellFilter();
                var positiveFilter = new java.lang.Boolean(true);
                monthNameMonthCellFilter.setTextIsMonthName(positiveFilter);
                this._monthNameStyle.setFilter(monthNameMonthCellFilter);
            }
            return this._monthNameStyle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MonthCellStyle.prototype, "monthCellStyle", {
        get: function () {
            if (!this._monthCellStyle) {
                this._monthCellStyle = new com.telerik.widget.calendar.CalendarMonthCellStyle();
            }
            return this._monthCellStyle;
        },
        enumerable: true,
        configurable: true
    });
    MonthCellStyle.prototype.onStyleChanged = function () {
        if (this.owner && this.owner.getDisplayMode() === com.telerik.widget.calendar.CalendarDisplayMode.Year) {
            this.owner.updateCalendar();
        }
    };
    MonthCellStyle.prototype.onWeekendTextColorChanged = function (oldValue, newValue) {
        if (newValue) {
            var color = (new color_1.Color(newValue)).argb;
            var textColor = new java.lang.Integer(color);
            this.weekendStyle.setTextColor(textColor);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onTodayTextColorChanged = function (oldValue, newValue) {
        if (newValue) {
            var color = (new color_1.Color(newValue)).argb;
            var textColor = new java.lang.Integer(color);
            this.todayStyle.setTextColor(textColor);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayTextColorChanged = function (oldValue, newValue) {
        if (newValue) {
            var color = (new color_1.Color(newValue)).argb;
            var textColor = new java.lang.Integer(color);
            this.regularDayStyle.setTextColor(textColor);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayFontNameChanged = function (oldValue, newValue) {
        if (newValue) {
            this.regularDayStyle.setFontName(newValue);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayFontStyleChanged = function (oldValue, newValue) {
        if (newValue) {
            var font = Tool.createTypeface(this.dayFontName, newValue);
            var fontStyle = new java.lang.Integer(font.getStyle());
            this.regularDayStyle.setFontStyle(fontStyle);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayTextSizeChanged = function (oldValue, newValue) {
        if (!isNaN(+newValue)) {
            var size = newValue * utilsModule.layout.getDisplayDensity();
            var sizeValue = new java.lang.Float(size);
            this.regularDayStyle.setTextSize(sizeValue);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayNameTextColorChanged = function (oldValue, newValue) {
        if (newValue) {
            var color = (new color_1.Color(newValue)).argb;
            var colorValue = new java.lang.Integer(color);
            this.dayNameStyle.setTextColor(colorValue);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayNameFontNameChanged = function (oldValue, newValue) {
        if (newValue) {
            this.dayNameStyle.setFontName(newValue);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayNameFontStyleChanged = function (oldValue, newValue) {
        if (newValue) {
            var font = Tool.createTypeface(this.dayNameFontName, newValue);
            var fontStyle = new java.lang.Integer(font.getStyle());
            this.dayNameStyle.setFontStyle(fontStyle);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onDayNameTextSizeChanged = function (oldValue, newValue) {
        if (!isNaN(+newValue)) {
            var size = newValue * utilsModule.layout.getDisplayDensity();
            var sizeValue = new java.lang.Float(size);
            this.dayNameStyle.setTextSize(sizeValue);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onMonthNameTextColorChanged = function (oldValue, newValue) {
        if (newValue) {
            var color = (new color_1.Color(newValue)).argb;
            var colorValue = new java.lang.Integer(color);
            this.monthNameStyle.setTextColor(colorValue);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onMonthNameFontNameChanged = function (oldValue, newValue) {
        if (newValue) {
            this.monthNameStyle.setFontName(newValue);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onMonthNameFontStyleChanged = function (oldValue, newValue) {
        if (newValue) {
            var font = Tool.createTypeface(this.monthNameFontName, newValue);
            var fontStyle = new java.lang.Integer(font.getStyle());
            this.monthNameStyle.setFontStyle(fontStyle);
            this.onStyleChanged();
        }
    };
    MonthCellStyle.prototype.onMonthNameTextSizeChanged = function (oldValue, newValue) {
        if (!isNaN(+newValue)) {
            var size = newValue * utilsModule.layout.getDisplayDensity();
            var sizeValue = new java.lang.Float(size);
            this.monthNameStyle.setTextSize(sizeValue);
            this.onStyleChanged();
        }
    };
    return MonthCellStyle;
}(commonModule.MonthCellStyle));
exports.MonthCellStyle = MonthCellStyle;
/**
 * Cell style class for inline events cells in month view
 */
var /**
 * Cell style class for inline events cells in month view
 */
InlineEventCellStyle = (function (_super) {
    __extends(InlineEventCellStyle, _super);
    function InlineEventCellStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InlineEventCellStyle.prototype.apply = function (adapter) {
        if (!adapter) {
            return;
        }
        this._adapter = adapter;
        var color;
        if (this.cellBackgroundColor) {
            color = (new color_1.Color(this.cellBackgroundColor)).argb;
            this._adapter.setInlineEventsBackgroundColor(color);
        }
        if (this.eventTextColor) {
            //TODO: Text color for inline event is not supported for Android calendar.
        }
        if (this.eventFontName) {
            //TODO: Font name property for inline event text is not supported for Android calendar.
        }
        if (this.eventFontStyle) {
            //TODO: Font style property for inline event text is not supported for Android calendar.
        }
        if (!isNaN(this.eventTextSize)) {
            this._adapter.setInlineEventTitleTextSize(this.eventTextSize);
        }
        if (this.timeTextColor) {
            var color_2 = (new color_1.Color(this.timeTextColor)).argb;
            this._adapter.setInlineEventTimeStartTextColor(color_2);
            this._adapter.setInlineEventTimeEndTextColor(color_2);
        }
        if (this.timeFontName) {
            //TODO: Font name property for for inline event date/time is not supported for Android calendar.
        }
        if (this.timeFontStyle) {
            //TODO: Font style property for for inline event date/time is not supported for Android calendar.
        }
        if (this.timeTextSize) {
            if (!isNaN(+this.timeTextSize)) {
                //note: these methods don't require display density to be taken account
                this._adapter.setInlineEventTimeEndTextSize(this.timeTextSize);
                this._adapter.setInlineEventTimeStartTextSize(this.timeTextSize);
            }
        }
    };
    InlineEventCellStyle.prototype.onCellBackgroundColorChanged = function (oldValue, newValue) {
        if (newValue && this._adapter) {
            var color = (new color_1.Color(newValue)).argb;
            this._adapter.setInlineEventsBackgroundColor(color);
        }
    };
    InlineEventCellStyle.prototype.onEventTextColorChanged = function (oldValue, newValue) {
        //TODO: console.log("WARNING: Text color for inline event is not supported for Android calendar.")
    };
    InlineEventCellStyle.prototype.onEventFontNameChanged = function (oldValue, newValue) {
        //TODO: console.log("WARNING: Font name property for inline event text is not supported for Android calendar.")
    };
    InlineEventCellStyle.prototype.onEventFontStyleChanged = function (oldValue, newValue) {
        //TODO: console.log("WARNING: Font style property for inline event text is not supported for Android calendar.")
    };
    InlineEventCellStyle.prototype.onEventTextSizeChanged = function (oldValue, newValue) {
        if (!isNaN(+newValue) && this._adapter) {
            this._adapter.setInlineEventTitleTextSize(newValue);
        }
    };
    InlineEventCellStyle.prototype.onTimeTextColorChanged = function (oldValue, newValue) {
        if (newValue && this._adapter) {
            var color = (new color_1.Color(newValue)).argb;
            this._adapter.setInlineEventTimeStartTextColor(color);
            this._adapter.setInlineEventTimeEndTextColor(color);
        }
    };
    InlineEventCellStyle.prototype.onTimeFontNameChanged = function (oldValue, newValue) {
        //TODO: console.log("WARNING: Font name property for for inline event date/time is not supported for Android calendar.")
    };
    InlineEventCellStyle.prototype.onTimeFontStyleChanged = function (oldValue, newValue) {
        //TODO: console.log("WARNING: Font style property for for inline event date/time is not supported for Android calendar.")
    };
    InlineEventCellStyle.prototype.onTimeTextSizeChanged = function (oldValue, newValue) {
        if (!isNaN(+newValue) && this._adapter) {
            //note: these methods don't require display density to be taken account
            this._adapter.setInlineEventTimeEndTextSize(newValue);
            this._adapter.setInlineEventTimeStartTextSize(newValue);
        }
    };
    return InlineEventCellStyle;
}(commonModule.InlineEventCellStyle));
exports.InlineEventCellStyle = InlineEventCellStyle;
//                                          STYLES FOR DIFFERENT VIEW MODES
var 
//                                          STYLES FOR DIFFERENT VIEW MODES
CalendarStyleInitializer = (function () {
    function CalendarStyleInitializer() {
    }
    CalendarStyleInitializer.prototype.updateNativeStyles = function (style) {
        if (!style._owner || !style._owner._nativeView) {
            return;
        }
        if (style.backgroundColor) {
            var color = (new color_1.Color(style.backgroundColor)).argb;
            style._owner._nativeView.setBackgroundColor(color);
        }
        if (style.showDayNames != undefined && style.showDayNames != null) {
            style._owner._nativeView.setShowDayNames(style.showDayNames);
        }
        if (style.showTitle != undefined && style.showTitle != null) {
            style._owner._nativeView.setShowTitle(style.showTitle);
        }
        if (style.showWeekNumbers != undefined && style.showWeekNumbers != null) {
            style._owner._nativeView.setWeekNumbersDisplayMode(style.showWeekNumbers ? com.telerik.widget.calendar.WeekNumbersDisplayMode.Block : com.telerik.widget.calendar.WeekNumbersDisplayMode.None);
        }
        if (style.dayCellStyle) {
            style.prepareNativeStyle(style.dayCellStyle, CellStyleType.RegularDayStyle);
            style._owner._nativeView.addDayCellStyle(style.dayCellStyle.android);
        }
        if (style.weekendCellStyle) {
            style.prepareNativeStyle(style.weekendCellStyle, CellStyleType.WeekendStyle);
            style._owner._nativeView.addDayCellStyle(style.weekendCellStyle.android);
        }
        if (style.todayCellStyle) {
            style.prepareNativeStyle(style.todayCellStyle, CellStyleType.TodayStyle);
            style._owner._nativeView.addDayCellStyle(style.todayCellStyle.android);
        }
        if (style.dayNameCellStyle) {
            style.prepareNativeStyle(style.dayNameCellStyle, CellStyleType.DayNameStyle);
            style._owner._nativeView.addDayCellStyle(style.dayNameCellStyle.android);
        }
        if (style.weekNumberCellStyle) {
            style.prepareNativeStyle(style.weekNumberCellStyle, CellStyleType.WeekNumberStyle);
            style._owner._nativeView.addDayCellStyle(style.weekNumberCellStyle.android);
        }
        if (style.titleCellStyle) {
            style.prepareNativeStyle(style.titleCellStyle, CellStyleType.TitleStyle);
            style._owner._nativeView.addDayCellStyle(style.titleCellStyle.android);
        }
        if (style.selectedDayCellStyle) {
            style.prepareNativeStyle(style.selectedDayCellStyle, CellStyleType.SelectedDayStyle);
            style._owner._nativeView.addDayCellStyle(style.selectedDayCellStyle.android);
        }
        if (style.inlineEventCellStyle) {
            style.prepareNativeStyle(style.inlineEventCellStyle, null);
        }
        this.syncSelectionShape(style);
    };
    CalendarStyleInitializer.prototype.onShowWeekNumbersChanged = function (oldValue, newValue, style) {
        this.changeShowWeekNumbers(newValue, style);
    };
    CalendarStyleInitializer.prototype.changeShowWeekNumbers = function (newValue, style) {
        if (style._owner && style._owner._nativeView) {
            style._owner._nativeView.setWeekNumbersDisplayMode(newValue ? com.telerik.widget.calendar.WeekNumbersDisplayMode.Block : com.telerik.widget.calendar.WeekNumbersDisplayMode.None);
        }
    };
    CalendarStyleInitializer.prototype.onShowTitleChanged = function (oldValue, newValue, style) {
        this.changeShowTitle(newValue, style);
    };
    CalendarStyleInitializer.prototype.changeShowTitle = function (newValue, style) {
        if (style._owner && style._owner._nativeView) {
            style._owner._nativeView.setShowTitle(newValue);
        }
    };
    CalendarStyleInitializer.prototype.onShowDayNamesChanged = function (oldValue, newValue, style) {
        this.changeShowDayNames(newValue, style);
    };
    CalendarStyleInitializer.prototype.changeShowDayNames = function (newValue, style) {
        if (style._owner && style._owner._nativeView) {
            style._owner._nativeView.setShowDayNames(newValue);
        }
    };
    CalendarStyleInitializer.prototype.onBackgroundColorChanged = function (oldValue, newValue, style) {
        this.changeBackgroundColor(newValue, style);
    };
    CalendarStyleInitializer.prototype.changeBackgroundColor = function (newValue, style) {
        if (newValue && style._owner && style._owner._nativeView) {
            var color = (new color_1.Color(newValue)).argb;
            style._owner._nativeView.setBackgroundColor(color);
        }
    };
    CalendarStyleInitializer.prototype.onDayCellStyleChanged = function (oldValue, newValue, style) {
        this.changeDayCellStyle(oldValue, newValue, style);
    };
    CalendarStyleInitializer.prototype.changeDayCellStyle = function (oldValue, newValue, style) {
        if (style._owner && style._owner._nativeView) {
            if (oldValue) {
                style._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                style.prepareNativeStyle(newValue, CellStyleType.RegularDayStyle);
                style._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    };
    CalendarStyleInitializer.prototype.onSelectedDayCellStyleChanged = function (oldValue, newValue, style) {
        this.changeSelectedDayCellStyle(oldValue, newValue, style);
    };
    CalendarStyleInitializer.prototype.changeSelectedDayCellStyle = function (oldValue, newValue, style) {
        if (style._owner && style._owner._nativeView) {
            if (oldValue) {
                style._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                style.prepareNativeStyle(newValue, CellStyleType.SelectedDayStyle);
                style._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    };
    CalendarStyleInitializer.prototype.onTodayCellStyleChanged = function (oldValue, newValue, style) {
        this.changeTodayCellStyle(oldValue, newValue, style);
    };
    CalendarStyleInitializer.prototype.changeTodayCellStyle = function (oldValue, newValue, style) {
        if (style._owner && style._owner._nativeView) {
            if (oldValue) {
                style._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                style.prepareNativeStyle(newValue, CellStyleType.TodayStyle);
                style._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    };
    CalendarStyleInitializer.prototype.onWeekNumberCellStyleChanged = function (oldValue, newValue, style) {
        this.changeWeekNumberCellStyle(oldValue, newValue, style);
    };
    CalendarStyleInitializer.prototype.changeWeekNumberCellStyle = function (oldValue, newValue, style) {
        if (style._owner && style._owner._nativeView) {
            if (oldValue) {
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                style.prepareNativeStyle(newValue, CellStyleType.WeekNumberStyle);
                // TODO: See if this was working as the addDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    };
    CalendarStyleInitializer.prototype.onWeekendCellStyleChanged = function (oldValue, newValue, style) {
        this.changeWeekendCellStyle(oldValue, newValue, style);
    };
    CalendarStyleInitializer.prototype.changeWeekendCellStyle = function (oldValue, newValue, style) {
        if (style._owner && style._owner._nativeView) {
            if (oldValue) {
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                style.prepareNativeStyle(newValue, CellStyleType.WeekendStyle);
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    };
    CalendarStyleInitializer.prototype.onDayNameCellStyleChanged = function (oldValue, newValue, style) {
        this.changeDayNameCellStyle(oldValue, newValue, style);
    };
    CalendarStyleInitializer.prototype.changeDayNameCellStyle = function (oldValue, newValue, style) {
        if (style._owner && style._owner._nativeView) {
            if (oldValue) {
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                style.prepareNativeStyle(newValue, CellStyleType.DayNameStyle);
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    };
    CalendarStyleInitializer.prototype.onTitleCellStyleChanged = function (oldValue, newValue, style) {
        this.changeTitleCellStyle(oldValue, newValue, style);
    };
    CalendarStyleInitializer.prototype.changeTitleCellStyle = function (oldValue, newValue, style) {
        if (style._owner && style._owner._nativeView) {
            if (oldValue) {
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                style.prepareNativeStyle(newValue, CellStyleType.TitleStyle);
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                style._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    };
    CalendarStyleInitializer.prototype.syncSelectionShape = function (style) {
        if (style._owner) {
            style._owner._syncSelectionShape();
        }
    };
    return CalendarStyleInitializer;
}());
exports.CalendarStyleInitializer = CalendarStyleInitializer;
/**
 * Class for month view style
 */
var /**
 * Class for month view style
 */
CalendarMonthViewStyle = (function (_super) {
    __extends(CalendarMonthViewStyle, _super);
    function CalendarMonthViewStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CalendarMonthViewStyle.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new CalendarStyleInitializer();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarMonthViewStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
            this.initializer.updateNativeStyles(this);
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthViewStyle.prototype.updateNativeStyles = function () {
        this.initializer.updateNativeStyles(this);
    };
    CalendarMonthViewStyle.prototype.prepareNativeStyle = function (style, cellType) {
        if (!style || !this._owner || !this._owner._nativeView) {
            return;
        }
        style.owner = this._owner._nativeView;
        if (style instanceof DayCellStyle) {
            style.eventAdapter = this._owner._nativeView.getEventAdapter();
        }
        if (cellType != null) {
            this.updateNativeStyleFilters(style, cellType);
        }
        else {
            style.apply(this._owner._nativeView.getAdapter());
        }
    };
    CalendarMonthViewStyle.prototype.updateNativeStyleFilters = function (style, cellType) {
        style.updateNativeStyleFilters(cellType, com.telerik.widget.calendar.CalendarDisplayMode.Month);
    };
    //properties
    //properties
    CalendarMonthViewStyle.prototype.onShowWeekNumbersChanged = 
    //properties
    function (oldValue, newValue) {
        this.initializer.onShowWeekNumbersChanged(oldValue, newValue, this);
    };
    CalendarMonthViewStyle.prototype.onSelectionShapeChanged = function (oldValue, newValue) {
        this.initializer.syncSelectionShape(this);
    };
    CalendarMonthViewStyle.prototype.onSelectionShapeSizeChanged = function (oldValue, newValue) {
        this.initializer.syncSelectionShape(this);
    };
    CalendarMonthViewStyle.prototype.onSelectionShapeColorChanged = function (oldValue, newValue) {
        this.initializer.syncSelectionShape(this);
    };
    CalendarMonthViewStyle.prototype.onShowTitleChanged = function (oldValue, newValue) {
        this.initializer.onShowTitleChanged(oldValue, newValue, this);
    };
    CalendarMonthViewStyle.prototype.onShowDayNamesChanged = function (oldValue, newValue) {
        this.initializer.onShowDayNamesChanged(oldValue, newValue, this);
    };
    CalendarMonthViewStyle.prototype.onBackgroundColorChanged = function (oldValue, newValue) {
        this.initializer.onBackgroundColorChanged(oldValue, newValue, this);
    };
    CalendarMonthViewStyle.prototype.onDayCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onDayCellStyleChanged(oldValue, newValue, this);
    };
    CalendarMonthViewStyle.prototype.onSelectedDayCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onSelectedDayCellStyleChanged(oldValue, newValue, this);
    };
    CalendarMonthViewStyle.prototype.onTodayCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onTodayCellStyleChanged(oldValue, newValue, this);
    };
    CalendarMonthViewStyle.prototype.onWeekNumberCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onWeekNumberCellStyleChanged(oldValue, newValue, this);
    };
    CalendarMonthViewStyle.prototype.onWeekendCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onWeekendCellStyleChanged(oldValue, newValue, this);
    };
    CalendarMonthViewStyle.prototype.onDayNameCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onDayNameCellStyleChanged(oldValue, newValue, this);
    };
    CalendarMonthViewStyle.prototype.onTitleCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onTitleCellStyleChanged(oldValue, newValue, this);
    };
    CalendarMonthViewStyle.prototype.onInlineEventCellStyleChanged = function (oldValue, newValue) {
        this.prepareNativeStyle(newValue, null);
    };
    return CalendarMonthViewStyle;
}(commonModule.CalendarMonthViewStyle));
exports.CalendarMonthViewStyle = CalendarMonthViewStyle;
/**
 * The style class for week mode.
 * NOTE: we should consider if we need an explicit class that is the same as the base one
 */
var /**
 * The style class for week mode.
 * NOTE: we should consider if we need an explicit class that is the same as the base one
 */
CalendarWeekViewStyle = (function (_super) {
    __extends(CalendarWeekViewStyle, _super);
    function CalendarWeekViewStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarWeekViewStyle.prototype.updateNativeStyleFilters = function (style, cellType) {
        style.updateNativeStyleFilters(cellType, com.telerik.widget.calendar.CalendarDisplayMode.Week);
    };
    return CalendarWeekViewStyle;
}(CalendarMonthViewStyle));
exports.CalendarWeekViewStyle = CalendarWeekViewStyle;
/**
 * The style class for day mode.
 */
var /**
 * The style class for day mode.
 */
CalendarDayViewStyle = (function (_super) {
    __extends(CalendarDayViewStyle, _super);
    function CalendarDayViewStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CalendarDayViewStyle.prototype, "initializer", {
        get: function () {
            if (!this._initializer) {
                this._initializer = new CalendarStyleInitializer();
            }
            return this._initializer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarDayViewStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
            this.updateNativeStyles();
        },
        enumerable: true,
        configurable: true
    });
    CalendarDayViewStyle.prototype.updateNativeStyles = function () {
        this.initializer.updateNativeStyles(this);
        this.updateNativeDayStyles();
    };
    CalendarDayViewStyle.prototype.updateNativeDayStyles = function () {
        if (this.dayEventsViewStyle) {
            this.changeDayEventsViewStyle(null, this.dayEventsViewStyle);
        }
        if (this.allDayEventsViewStyle) {
            this.changeAllDayEventsViewStyle(null, this.allDayEventsViewStyle);
        }
    };
    CalendarDayViewStyle.prototype.prepareNativeStyle = function (style, cellType) {
        if (!style || !this._owner || !this._owner._nativeView) {
            return;
        }
        style.owner = this._owner._nativeView;
        if (style instanceof DayCellStyle) {
            style.eventAdapter = this._owner._nativeView.getEventAdapter();
        }
        if (cellType != null) {
            this.updateNativeStyleFilters(style, cellType);
        }
        else {
            style.apply(this._owner._nativeView.getAdapter());
        }
    };
    CalendarDayViewStyle.prototype.updateNativeStyleFilters = function (style, cellType) {
        style.updateNativeStyleFilters(cellType, com.telerik.widget.calendar.CalendarDisplayMode.Day);
    };
    //properties
    //properties
    CalendarDayViewStyle.prototype.onShowWeekNumbersChanged = 
    //properties
    function (oldValue, newValue) {
        this.initializer.onShowWeekNumbersChanged(oldValue, newValue, this);
    };
    CalendarDayViewStyle.prototype.onSelectionShapeChanged = function (oldValue, newValue) {
        this.initializer.syncSelectionShape(this);
    };
    CalendarDayViewStyle.prototype.onSelectionShapeSizeChanged = function (oldValue, newValue) {
        this.initializer.syncSelectionShape(this);
    };
    CalendarDayViewStyle.prototype.onSelectionShapeColorChanged = function (oldValue, newValue) {
        this.initializer.syncSelectionShape(this);
    };
    CalendarDayViewStyle.prototype.onShowTitleChanged = function (oldValue, newValue) {
        this.initializer.onShowTitleChanged(oldValue, newValue, this);
    };
    CalendarDayViewStyle.prototype.onShowDayNamesChanged = function (oldValue, newValue) {
        this.initializer.onShowDayNamesChanged(oldValue, newValue, this);
    };
    CalendarDayViewStyle.prototype.onBackgroundColorChanged = function (oldValue, newValue) {
        this.initializer.onBackgroundColorChanged(oldValue, newValue, this);
    };
    CalendarDayViewStyle.prototype.onDayCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onDayCellStyleChanged(oldValue, newValue, this);
    };
    CalendarDayViewStyle.prototype.onSelectedDayCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onSelectedDayCellStyleChanged(oldValue, newValue, this);
    };
    CalendarDayViewStyle.prototype.onTodayCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onTodayCellStyleChanged(oldValue, newValue, this);
    };
    CalendarDayViewStyle.prototype.onWeekNumberCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onWeekNumberCellStyleChanged(oldValue, newValue, this);
    };
    CalendarDayViewStyle.prototype.onWeekendCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onWeekendCellStyleChanged(oldValue, newValue, this);
    };
    CalendarDayViewStyle.prototype.onDayNameCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onDayNameCellStyleChanged(oldValue, newValue, this);
    };
    CalendarDayViewStyle.prototype.onTitleCellStyleChanged = function (oldValue, newValue) {
        this.initializer.onTitleCellStyleChanged(oldValue, newValue, this);
    };
    CalendarDayViewStyle.prototype.onDayEventsViewStyleChanged = function (oldValue, newValue) {
        this.changeDayEventsViewStyle(oldValue, newValue);
    };
    CalendarDayViewStyle.prototype.changeDayEventsViewStyle = function (oldValue, newValue) {
        if (oldValue) {
            oldValue.owner = null;
        }
        if (newValue && this._owner) {
            newValue.owner = this._owner._nativeView;
        }
    };
    CalendarDayViewStyle.prototype.onAllDayEventsViewStyleChanged = function (oldValue, newValue) {
        this.changeAllDayEventsViewStyle(oldValue, newValue);
    };
    CalendarDayViewStyle.prototype.changeAllDayEventsViewStyle = function (oldValue, newValue) {
        if (oldValue) {
            oldValue.owner = null;
        }
        if (newValue && this._owner) {
            newValue.owner = this._owner._nativeView;
        }
    };
    CalendarDayViewStyle.prototype.onInlineEventCellStyleChanged = function (oldValue, newValue) {
        this.prepareNativeStyle(newValue, null);
    };
    return CalendarDayViewStyle;
}(commonModule.CalendarDayViewStyle));
exports.CalendarDayViewStyle = CalendarDayViewStyle;
/**
 * The year mode style class
 */
var /**
 * The year mode style class
 */
CalendarYearViewStyle = (function (_super) {
    __extends(CalendarYearViewStyle, _super);
    function CalendarYearViewStyle() {
        return _super.call(this) || this;
    }
    Object.defineProperty(CalendarYearViewStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
            this.updateNativeStyles();
        },
        enumerable: true,
        configurable: true
    });
    CalendarYearViewStyle.prototype.updateNativeStyles = function () {
        if (!this._owner || !this._owner._nativeView) {
            return;
        }
        if (this.titleCellStyle) {
            this.titleCellStyle.owner = this._owner._nativeView;
            this.titleCellStyle['updateNativeStyleFilters'](CellStyleType.TitleStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
            this._owner._nativeView.addDayCellStyle(this.titleCellStyle.android);
        }
        if (this.monthCellStyle) {
            this.monthCellStyle.owner = this._owner._nativeView;
            this._owner._nativeView.addMonthCellStyle(this.monthCellStyle.regularDayStyle);
            this._owner._nativeView.addMonthCellStyle(this.monthCellStyle.weekendStyle);
            this._owner._nativeView.addMonthCellStyle(this.monthCellStyle.todayStyle);
            this._owner._nativeView.addMonthCellStyle(this.monthCellStyle.dayNameStyle);
            this._owner._nativeView.addMonthCellStyle(this.monthCellStyle.monthNameStyle);
            this._owner._nativeView.addMonthCellStyle(this.monthCellStyle.monthCellStyle);
        }
    };
    CalendarYearViewStyle.prototype.onTitleCellStyleChanged = function (oldValue, newValue) {
        if (this._owner && this._owner._nativeView) {
            if (oldValue) {
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                this._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                newValue.owner = this._owner._nativeView;
                newValue.updateNativeStyleFilters(CellStyleType.TitleStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                this._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    };
    CalendarYearViewStyle.prototype.onMonthCellStyleChanged = function (oldValue, newValue) {
        if (this._owner && this._owner._nativeView) {
            if (oldValue) {
                this._owner._nativeView.removeMonthCellStyle(oldValue.regularDayStyle);
                this._owner._nativeView.removeMonthCellStyle(oldValue.weekendStyle);
                this._owner._nativeView.removeMonthCellStyle(oldValue.todayStyle);
                this._owner._nativeView.removeMonthCellStyle(oldValue.dayNameStyle);
                this._owner._nativeView.removeMonthCellStyle(oldValue.monthNameStyle);
                this._owner._nativeView.removeMonthCellStyle(oldValue.monthCellStyle);
            }
            if (newValue) {
                this._owner._nativeView.addMonthCellStyle(newValue.regularDayStyle);
                this._owner._nativeView.addMonthCellStyle(newValue.weekendStyle);
                this._owner._nativeView.addMonthCellStyle(newValue.todayStyle);
                this._owner._nativeView.addMonthCellStyle(newValue.dayNameStyle);
                this._owner._nativeView.addMonthCellStyle(newValue.monthNameStyle);
                this._owner._nativeView.addMonthCellStyle(newValue.monthCellStyle);
            }
        }
    };
    return CalendarYearViewStyle;
}(commonModule.CalendarYearViewStyle));
exports.CalendarYearViewStyle = CalendarYearViewStyle;
/**
 * The year view mode in compact view
 */
var /**
 * The year view mode in compact view
 */
CalendarMonthNamesViewStyle = (function (_super) {
    __extends(CalendarMonthNamesViewStyle, _super);
    function CalendarMonthNamesViewStyle() {
        return _super.call(this) || this;
    }
    Object.defineProperty(CalendarMonthNamesViewStyle.prototype, "owner", {
        set: function (value) {
            this._owner = value;
            this.updateNativeStyles();
        },
        enumerable: true,
        configurable: true
    });
    CalendarMonthNamesViewStyle.prototype.updateNativeStyles = function () {
        if (!this._owner || !this._owner._nativeView) {
            return;
        }
        if (this.titleCellStyle) {
            this.titleCellStyle.owner = this._owner._nativeView;
            this.titleCellStyle['updateNativeStyleFilters'](CellStyleType.TitleStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
            this._owner._nativeView.addDayCellStyle(this.titleCellStyle.android);
        }
        if (this.monthNameCellStyle) {
            this.monthNameCellStyle['nativeIsYear'] = true;
            this.monthNameCellStyle.owner = this._owner._nativeView;
            this.monthNameCellStyle['updateNativeStyleFilters'](CellStyleType.MonthNameStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
            this._owner._nativeView.addMonthCellStyle(this.monthNameCellStyle.android);
        }
    };
    CalendarMonthNamesViewStyle.prototype.updateFilterDisplayMode = function (filter) {
        var positiveFilter = new java.lang.Boolean(true);
        //filter.setTextIsMonthName(positiveFilter);
        filter.setMonthIsCompact(positiveFilter);
    };
    CalendarMonthNamesViewStyle.prototype.onTitleCellStyleChanged = function (oldValue, newValue) {
        if (this._owner && this._owner._nativeView) {
            if (oldValue) {
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                this._owner._nativeView.removeDayCellStyle(oldValue.android);
            }
            if (newValue) {
                newValue.owner = this._owner._nativeView;
                newValue.updateNativeStyleFilters(CellStyleType.TitleStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                this._owner._nativeView.addDayCellStyle(newValue.android);
            }
        }
    };
    CalendarMonthNamesViewStyle.prototype.onMonthNameCellStyleChanged = function (oldValue, newValue) {
        if (this._owner && this._owner._nativeView) {
            if (oldValue) {
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                this._owner._nativeView.removeMonthCellStyle(oldValue.android);
            }
            if (newValue) {
                newValue.nativeIsYear = true;
                newValue.owner = this._owner._nativeView;
                newValue.updateNativeStyleFilters(CellStyleType.MonthNameStyle, com.telerik.widget.calendar.CalendarDisplayMode.Year);
                // TODO: See if this was working as the removeDayCellStyle requires 'CalendarDayCellStyle'
                this._owner._nativeView.addMonthCellStyle(newValue.android);
            }
        }
    };
    return CalendarMonthNamesViewStyle;
}(commonModule.CalendarMonthNamesViewStyle));
exports.CalendarMonthNamesViewStyle = CalendarMonthNamesViewStyle;
//                                              RadCalendar
var 
//                                              RadCalendar
RadCalendar = (function (_super) {
    __extends(RadCalendar, _super);
    function RadCalendar() {
        var _this = _super.call(this) || this;
        _this._androidViewId = -1;
        return _this;
    }
    Object.defineProperty(RadCalendar.prototype, "_nativeView", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    RadCalendar.prototype.createNativeView = function () {
        this._android = new com.telerik.widget.calendar.RadCalendarView(this._context);
        this._android.setHorizontalScroll(this.horizontalTransition);
        this.addOnCellClickListener();
        this.addOnDisplayDateChangedListener();
        this.updateEventSource();
        this.addOnDisplayModeChangedListener();
        this.addOnSelectedDatesChangedListener();
        this.setDayViewEventSelectedListener();
        //set initial property values using value changed handlers
        this.setNativeMinDate(this.minDate);
        this.setNativeMaxDate(this.maxDate);
        if (this.displayedDate == undefined) {
            this.loadNativeDisplayedDate();
        }
        else {
            this.setNativeDisplayedDate(this.displayedDate);
        }
        this.setNativeSelectionMode(this.selectionMode);
        this.setNativeEventsViewMode(this.eventsViewMode);
        this.setNativeHorizontalTransition(this.horizontalTransition);
        this.setNativeTransitionMode(this.transitionMode);
        this.setNativeViewMode(this.viewMode);
        this.setNativeSelectedDate(this.selectedDate);
        this.setNativeSelectedDates(this.selectedDates);
        this.setNativeSelectedDateRange(this.selectedDateRange);
        this.initOnInlineEventsClickedListener();
        this.setNativeLocale(this.locale);
        //apply cell styles
        if (this.monthViewStyle) {
            this.monthViewStyle.owner = this;
        }
        if (this.weekViewStyle) {
            this.weekViewStyle.owner = this;
        }
        if (this.dayViewStyle) {
            this.dayViewStyle.owner = this;
        }
        if (this.yearViewStyle) {
            this.yearViewStyle.owner = this;
        }
        if (this.monthNamesViewStyle) {
            this.monthNamesViewStyle.owner = this;
        }
        return this._nativeView;
    };
    RadCalendar.prototype.initNativeView = function () {
        _super.prototype.initNativeView.call(this);
        if (this._androidViewId < 0) {
            this._androidViewId = android.view.View.generateViewId();
        }
        this._nativeView.setId(this._androidViewId);
    };
    RadCalendar.prototype.loadNativeDisplayedDate = function () {
        var date = new Date(this._android.getDisplayDate());
        if (this.displayedDate != date) {
            this.displayedDate = date;
        }
    };
    RadCalendar.prototype.addOnCellClickListener = function () {
        var that = new WeakRef(this);
        this._nativeView.setOnCellClickListener(new com.telerik.widget.calendar.RadCalendarView.OnCellClickListener({
            onCellClick: function (cell) {
                var args = {
                    eventName: commonModule.RadCalendar.cellTapEvent,
                    object: that.get(),
                    cell: cell,
                    date: new Date(cell.getDate())
                };
                that.get().notify(args);
            }
        }));
    };
    RadCalendar.prototype._syncSelectionShape = function () {
        var activeStyle = this.viewMode === commonModule.CalendarViewMode.Month ? this.monthViewStyle :
            this.viewMode === commonModule.CalendarViewMode.Week ? this.weekViewStyle :
                this.viewMode === commonModule.CalendarViewMode.Day ? this.dayViewStyle : undefined;
        if (this._nativeView) {
            var defaultDecorator = new com.telerik.widget.calendar.CellDecorationsLayer(this._nativeView);
            this._nativeView.setCellDecorator(defaultDecorator);
            if (activeStyle) {
                switch (activeStyle.selectionShape.toLowerCase()) {
                    case commonModule.SelectionShape.Round.toLowerCase():
                        var roundDecorator = new com.telerik.widget.calendar.decorations.CircularCellDecorator(this._nativeView);
                        roundDecorator.setStroked(false);
                        roundDecorator.setRadius(utilsModule.layout.toDevicePixels(activeStyle.selectionShapeSize));
                        if (activeStyle.selectionShapeColor) {
                            roundDecorator.setColor(new color_1.Color(activeStyle.selectionShapeColor).android);
                        }
                        this._nativeView.setCellDecorator(roundDecorator);
                        break;
                    case commonModule.SelectionShape.Square.toLowerCase():
                        var squareDecorator = new com.telerik.widget.calendar.decorations.SquareCellDecorator(this._nativeView);
                        squareDecorator.setStroked(false);
                        squareDecorator.setSize(utilsModule.layout.toDevicePixels(activeStyle.selectionShapeSize));
                        if (activeStyle.selectionShapeColor) {
                            squareDecorator.setColor(new color_1.Color(activeStyle.selectionShapeColor).android);
                        }
                        this._nativeView.setCellDecorator(squareDecorator);
                        break;
                }
            }
        }
    };
    RadCalendar.prototype.addOnInlineEventsClickedListener = function () {
        var that = new WeakRef(this);
        if (this._nativeView.eventsManager()) {
            this._nativeView.eventsManager().setOnItemClickListener(null);
            this._nativeView.eventsManager().setOnItemClickListener(new android.widget.AdapterView.OnItemClickListener({
                onItemClick: function (parent, view, position, id) {
                    var event = parent.getAdapter().getItem(position); //returned object is instance of EventsManager.EventInfo class
                    var inlineEventData = new CalendarEvent(event.title(), new Date(event.startTime()), new Date(event.endTime()), event.allDay);
                    var args = {
                        eventName: commonModule.RadCalendar.inlineEventSelectedEvent,
                        object: this._owner,
                        eventData: inlineEventData
                    };
                    that.get().notify(args);
                }
            }));
        }
    };
    //calendarDidNavigateToDate
    //calendarWillNavigateToDate
    //calendarDidNavigateToDate
    //calendarWillNavigateToDate
    RadCalendar.prototype.addOnDisplayDateChangedListener = 
    //calendarDidNavigateToDate
    //calendarWillNavigateToDate
    function () {
        var that = new WeakRef(this);
        this._nativeView.setOnDisplayDateChangedListener(new com.telerik.widget.calendar.RadCalendarView.OnDisplayDateChangedListener({
            onDisplayDateChanged: function (oldDate, newDate) {
                var newDisplayedDate = new Date(newDate);
                if (that.get().displayedDate == newDisplayedDate) {
                    return;
                }
                var navigationStartedArgs = {
                    eventName: commonModule.RadCalendar.navigatingToDateStartedEvent,
                    object: that.get(),
                    date: newDisplayedDate
                };
                that.get().notify(navigationStartedArgs);
                that.get().displayedDate = newDisplayedDate;
                var navigatedArgs = {
                    eventName: commonModule.RadCalendar.navigatedToDateEvent,
                    object: that.get(),
                    date: newDisplayedDate
                };
                that.get().notify(navigatedArgs);
            }
        }));
    };
    // calendarDidChangedViewModeFromTo
    // calendarDidChangedViewModeFromTo
    RadCalendar.prototype.addOnDisplayModeChangedListener = 
    // calendarDidChangedViewModeFromTo
    function () {
        var that = new WeakRef(this);
        this._nativeView.setOnDisplayModeChangedListener(new com.telerik.widget.calendar.RadCalendarView.OnDisplayModeChangedListener({
            onDisplayModeChanged: function (oldMode, newMode) {
                var newCalendarMode = RadCalendar.getViewModeFromAndroidViewMode(that.get(), newMode);
                that.get().viewMode = newCalendarMode;
                var oldCalendarMode = RadCalendar.getViewModeFromAndroidViewMode(that.get(), oldMode);
                that.get().notifyViewModeChanged(oldCalendarMode, newCalendarMode);
            }
        }));
    };
    RadCalendar.prototype.notifyViewModeChanged = function (oldMode, newMode) {
        var args = {
            eventName: commonModule.RadCalendar.viewModeChangedEvent,
            object: this,
            oldValue: oldMode,
            newValue: newMode
        };
        this.notify(args);
    };
    RadCalendar.prototype.setDayViewEventSelectedListener = function () {
        var that = new WeakRef(this);
        this._nativeView.getDayView().setEventViewTapListener(new com.telerik.widget.calendar.dayview.CalendarDayView.EventViewTapListener({
            onEventViewTap: function (event) {
                var dayViewEventData = new CalendarEvent(event.getTitle(), new Date(event.getStartDate()), new Date(event.getEndDate()), event.isAllDay());
                var args = {
                    eventName: commonModule.RadCalendar.dayViewEventSelectedEvent,
                    object: that.get(),
                    eventData: dayViewEventData
                };
                that.get().notify(args);
            }
        }));
    };
    //calendarDidDeselectedDate
    //calendarDidSelectDate
    //calendarShoudlSelectDate
    //calendarDidDeselectedDate
    //calendarDidSelectDate
    //calendarShoudlSelectDate
    RadCalendar.prototype.addOnSelectedDatesChangedListener = 
    //calendarDidDeselectedDate
    //calendarDidSelectDate
    //calendarShoudlSelectDate
    function () {
        var that = new WeakRef(this);
        this._nativeView.setOnSelectedDatesChangedListener(new com.telerik.widget.calendar.RadCalendarView.OnSelectedDatesChangedListener({
            onSelectedDatesChanged: function (context) {
                var selectedCount = context.datesAdded().size();
                var deselectedCount = context.datesRemoved().size();
                if (that.get().selectionMode !== commonModule.CalendarSelectionMode.Range && deselectedCount > 0) {
                    for (var i = 0; i < deselectedCount; i++) {
                        var deselectedDate = new Date(context.datesRemoved().get(i).longValue());
                        that.get().notifyDateDeselected(that.get(), deselectedDate);
                    }
                }
                if (that.get().selectionMode === commonModule.CalendarSelectionMode.Range && selectedCount > 0) {
                    var nativeCalendar = that.get().android;
                    var dateRange = nativeCalendar.getSelectionManager().getSelectedRange();
                    that.get().notifyRangeSelectionChanged(that.get(), new Date(dateRange.getStart()), new Date(dateRange.getEnd()));
                }
                else if (selectedCount > 0) {
                    for (var i = 0; i < selectedCount; i++) {
                        var millis = context.datesAdded().get(i).longValue();
                        var selectedDate = new Date(millis);
                        that.get().notifySingleDateSelected(that.get(), selectedDate);
                    }
                }
            }
        }));
    };
    RadCalendar.prototype.notifySingleDateSelected = function (calendar, date) {
        this._forbidNativeSelection = true;
        if (!this.selectedDate || this.parseDate(this.selectedDate).getTime() !== date.getTime()) {
            this.selectedDate = date;
        }
        if (calendar.selectionMode === commonModule.CalendarSelectionMode.Multiple) {
            this._addSelectedDate(date);
        }
        this._forbidNativeSelection = false;
        var selectedArgs = {
            eventName: commonModule.RadCalendar.dateSelectedEvent,
            object: calendar,
            date: date
        };
        calendar.notify(selectedArgs);
    };
    RadCalendar.prototype.notifyDateDeselected = function (calendar, date) {
        this._forbidNativeSelection = true;
        if (calendar.selectionMode === commonModule.CalendarSelectionMode.Multiple) {
            this._removeSelectedDate(date);
        }
        this._forbidNativeSelection = false;
        var selectedArgs = {
            eventName: commonModule.RadCalendar.dateDeselectedEvent,
            object: calendar,
            date: date
        };
        calendar.notify(selectedArgs);
    };
    RadCalendar.prototype.notifyRangeSelectionChanged = function (calendar, firstSelected, lastSelected) {
        this._forbidNativeSelection = true;
        if (!this.selectedDate || this.parseDate(this.selectedDate).getTime() !== lastSelected.getTime()) {
            this.selectedDate = lastSelected;
        }
        if (!this.selectedDateRange ||
            this.parseDate(this.selectedDateRange.endDate).getTime() !== lastSelected.getTime() ||
            this.parseDate(this.selectedDateRange.startDate).getTime() !== firstSelected.getTime()) {
            this.selectedDateRange = new commonModule.DateRange(firstSelected, lastSelected);
        }
        this._forbidNativeSelection = false;
        var lastSelectedArgs = {
            eventName: commonModule.RadCalendar.dateSelectedEvent,
            object: calendar,
            date: lastSelected
        };
        calendar.notify(lastSelectedArgs);
    };
    ///////////////////////////////////////////////////////////////////////////////////////////
    //NOTE: Since calendar is not created during xml parsing, we have setters for properties and call them from createUI & property changed handlers.
    ///////////////////////////////////////////////////////////////////////////////////////////
    //Native setters - it's assumed that this.android is initialized, so call these methods after createUI is already called
    //NOTE: Since calendar is not created during xml parsing, we have setters for properties and call them from createUI & property changed handlers.
    //Native setters - it's assumed that this.android is initialized, so call these methods after createUI is already called
    RadCalendar.prototype.setNativeViewMode = 
    //NOTE: Since calendar is not created during xml parsing, we have setters for properties and call them from createUI & property changed handlers.
    //Native setters - it's assumed that this.android is initialized, so call these methods after createUI is already called
    function (mode) {
        if (mode) {
            var bSetYearMode = false;
            var nativeMode = null;
            switch (mode.toLowerCase()) {
                case commonModule.CalendarViewMode.Month.toLowerCase():
                    nativeMode = com.telerik.widget.calendar.CalendarDisplayMode.Month;
                    break;
                case commonModule.CalendarViewMode.MonthNames.toLowerCase():
                    nativeMode = com.telerik.widget.calendar.CalendarDisplayMode.Year;
                    bSetYearMode = true;
                    break;
                case commonModule.CalendarViewMode.Week.toLowerCase():
                    nativeMode = com.telerik.widget.calendar.CalendarDisplayMode.Week;
                    break;
                case commonModule.CalendarViewMode.Year.toLowerCase():
                    nativeMode = com.telerik.widget.calendar.CalendarDisplayMode.Year;
                    break;
                case commonModule.CalendarViewMode.Day.toLowerCase():
                    nativeMode = com.telerik.widget.calendar.CalendarDisplayMode.Day;
                    break;
            }
            var eventsManager = this._android.eventsManager();
            if (eventsManager) {
                eventsManager.closeEvents();
            }
            if (nativeMode == com.telerik.widget.calendar.CalendarDisplayMode.Year) {
                if (this._android.isYearModeCompact() != bSetYearMode) {
                    if (this._android.getDisplayMode() == com.telerik.widget.calendar.CalendarDisplayMode.Year) {
                        // The NS calendar view modes Year and MonthName are both represented by CalendarDisplayMode.Year in android.
                        // To achieve the difference another property (isYearModeCompact) is used which has no listener.
                        // This is why we notify for the NS event at this point.
                        if (bSetYearMode) {
                            this.notifyViewModeChanged(commonModule.CalendarViewMode.Year, commonModule.CalendarViewMode.MonthNames);
                        }
                        else {
                            this.notifyViewModeChanged(commonModule.CalendarViewMode.MonthNames, commonModule.CalendarViewMode.Year);
                        }
                    }
                    this._android.setYearModeCompact(bSetYearMode);
                }
            }
            this._android.changeDisplayMode(nativeMode, false);
        }
    };
    RadCalendar.prototype.setNativeSelectionMode = function (mode) {
        if (mode) {
            var selMode = null;
            switch (mode.toLowerCase()) {
                case commonModule.CalendarSelectionMode.None.toLowerCase():
                    selMode = com.telerik.widget.calendar.CalendarSelectionMode.None;
                    break;
                case commonModule.CalendarSelectionMode.Single.toLowerCase():
                    selMode = com.telerik.widget.calendar.CalendarSelectionMode.Single;
                    break;
                case commonModule.CalendarSelectionMode.Multiple.toLowerCase():
                    selMode = com.telerik.widget.calendar.CalendarSelectionMode.Multiple;
                    break;
                case commonModule.CalendarSelectionMode.Range.toLowerCase():
                    selMode = com.telerik.widget.calendar.CalendarSelectionMode.Range;
                    break;
                default:
                    console.log("WARNING: Unsupported selection mode set: " + mode);
            }
            if (selMode) {
                this._android.setSelectionMode(selMode);
            }
        }
    };
    RadCalendar.prototype.setNativeTransitionMode = function (mode) {
        if (mode) {
            this._nativeView.setScrollMode(RadCalendar.getAndroidTransitonModeFromTransitionMode(mode));
        }
    };
    RadCalendar.prototype.setNativeEventsViewMode = function (data) {
        if (data) {
            this._nativeView.setEventsDisplayMode(RadCalendar.getAndroidEventsViewModeFromEventsViewMode(data));
        }
    };
    RadCalendar.prototype.setNativeMaxDate = function (data) {
        if (data) {
            var date = this.parseDate(data);
            var calendar = RadCalendar.getCalendarFromDate(date);
            this._nativeView.setMaxDate(calendar.getTimeInMillis());
        }
    };
    RadCalendar.prototype.setNativeMinDate = function (data) {
        if (data) {
            var date = this.parseDate(data);
            var calendar = RadCalendar.getCalendarFromDate(date);
            this._nativeView.setMinDate(calendar.getTimeInMillis());
        }
    };
    RadCalendar.prototype.setNativeDisplayedDate = function (data) {
        if (data) {
            var date = this.parseDate(data);
            var calendar = RadCalendar.getCalendarFromDate(date);
            this._nativeView.setDisplayDate(calendar.getTimeInMillis());
        }
    };
    RadCalendar.prototype.setNativeSelectedDate = function (data) {
        if (data) {
            var date = this.parseDate(data);
            var calendar = RadCalendar.getCalendarFromDate(date);
            var selectedDates = new java.util.ArrayList;
            selectedDates.add(new java.lang.Long(calendar.getTimeInMillis()));
            this._nativeView.setSelectedDates(selectedDates);
        }
    };
    RadCalendar.prototype.setNativeSelectedDates = function (data) {
        if (data) {
            var newDates = data;
            if (typeof (data) === "string") {
                newDates = newDates.split(",");
            }
            var selectedDates = new java.util.ArrayList();
            for (var date in newDates) {
                var newDate = RadCalendar.getCalendarFromDate(this.parseDate(newDates[date]));
                selectedDates.add(new java.lang.Long(newDate.getTimeInMillis()));
            }
            this._nativeView.setSelectedDates(selectedDates);
        }
    };
    RadCalendar.prototype.setNativeSelectedDateRange = function (data) {
        if (data && (data instanceof commonModule.DateRange)) {
            var newDateRange = data;
            var start = RadCalendar.getCalendarFromDate(this.parseDate(newDateRange.startDate));
            var end = RadCalendar.getCalendarFromDate(this.parseDate(newDateRange.endDate));
            var androidDateRange = new com.telerik.widget.calendar.DateRange(start.getTimeInMillis(), end.getTimeInMillis());
            this._nativeView.setSelectedRange(androidDateRange);
        }
    };
    RadCalendar.prototype.setNativeHorizontalTransition = function (data) {
        var horizontalTransition = data;
        this._nativeView.setHorizontalScroll(horizontalTransition);
    };
    RadCalendar.prototype.getDisplayedDate = function () {
        return this._android.getDisplayDate();
    };
    RadCalendar.prototype.onLocalePropertyChanged = function (oldValue, newValue) {
        _super.prototype.onLocalePropertyChanged.call(this, oldValue, newValue);
        this.setNativeLocale(newValue);
    };
    RadCalendar.prototype.setNativeLocale = function (locale) {
        if (locale && this._nativeView) {
            var langAndCountry = locale.split('-');
            if (langAndCountry.length === 1) {
                langAndCountry.push(langAndCountry[0].toUpperCase());
            }
            if (langAndCountry.length === 2) {
                var nativeLocale = new java.util.Locale(langAndCountry[0], langAndCountry[1]);
                this._nativeView.setLocale(nativeLocale);
            }
        }
    };
    ///////////////////////////////////////////////////////////////////////////////////////////
    //Property changed handlers
    //Property changed handlers
    RadCalendar.prototype.onViewModeChanged = 
    //Property changed handlers
    function (oldValue, newValue) {
        if (this._nativeView) {
            this.setNativeViewMode(newValue);
        }
        this._syncSelectionShape();
    };
    RadCalendar.prototype.onSelectionModeChanged = function (oldValue, newValue) {
        if (this._nativeView) {
            this.clearSelection();
            this.setNativeSelectionMode(newValue);
        }
    };
    RadCalendar.prototype.onTransitionModeChanged = function (oldValue, newValue) {
        if (this._nativeView) {
            this.setNativeTransitionMode(newValue);
        }
    };
    RadCalendar.prototype.onEventsViewModeChanged = function (oldValue, newValue) {
        if (this._nativeView) {
            this.setNativeEventsViewMode(newValue);
            this.initOnInlineEventsClickedListener();
        }
    };
    RadCalendar.prototype.onMaxDateChanged = function (oldValue, newValue) {
        if (this._nativeView) {
            this.setNativeMaxDate(newValue);
        }
    };
    RadCalendar.prototype.onMinDateChanged = function (oldValue, newValue) {
        if (this._nativeView) {
            this.setNativeMinDate(newValue);
        }
    };
    RadCalendar.prototype.onDisplayedDateChanged = function (oldValue, newValue) {
        if (this._nativeView) {
            this.setNativeDisplayedDate(newValue);
        }
    };
    RadCalendar.prototype.onSelectedDateChanged = function (oldValue, newValue) {
        if (this._forbidNativeSelection || !this._nativeView) {
            return;
        }
        this.setNativeSelectedDate(newValue);
    };
    RadCalendar.prototype.onSelectedDatesChanged = function (oldValue, newValue) {
        if (this._forbidNativeSelection || !this._nativeView) {
            return;
        }
        this.setNativeSelectedDates(newValue);
    };
    RadCalendar.prototype.onSelectedDateRangeChanged = function (oldValue, newValue) {
        if (this._forbidNativeSelection || !this._nativeView) {
            return;
        }
        this.setNativeSelectedDateRange(newValue);
    };
    RadCalendar.prototype.onHorizontalTransitionChanged = function (oldValue, newValue) {
        if (this._nativeView) {
            this.setNativeHorizontalTransition(newValue);
        }
    };
    RadCalendar.prototype.onMonthViewStyleChanged = function (oldValue, newValue) {
        if (newValue && (newValue instanceof CalendarMonthViewStyle)) {
            this.monthViewStyle.owner = this;
        }
    };
    RadCalendar.prototype.onWeekViewStyleChanged = function (oldValue, newValue) {
        if (newValue && (newValue instanceof CalendarWeekViewStyle)) {
            this.weekViewStyle.owner = this;
        }
    };
    RadCalendar.prototype.onDayViewStyleChanged = function (oldValue, newValue) {
        if (newValue && (newValue instanceof CalendarDayViewStyle)) {
            this.dayViewStyle.owner = this;
        }
    };
    RadCalendar.prototype.onMonthNamesViewStyleChanged = function (oldValue, newValue) {
        if (newValue && (newValue instanceof CalendarMonthNamesViewStyle)) {
            this.monthNamesViewStyle.owner = this;
        }
    };
    RadCalendar.prototype.onYearViewStyleChanged = function (oldValue, newValue) {
        if (newValue && (newValue instanceof CalendarYearViewStyle)) {
            this.yearViewStyle.owner = this;
        }
    };
    ///////////////////////////////////////////////////////////////////////////////////////////
    //Helper methods
    //Helper methods
    RadCalendar.prototype.reload = 
    //Helper methods
    function () {
        if (this._nativeView) {
            this._nativeView.invalidate();
        }
    };
    RadCalendar.prototype.navigateForward = function () {
        this._nativeView.shiftDate(true);
    };
    RadCalendar.prototype.navigateBack = function () {
        this._nativeView.shiftDate(false);
    };
    RadCalendar.prototype.goToDate = function (date) {
        this._nativeView.setDisplayDate(date.getTime());
    };
    RadCalendar.prototype.getEventsForDate = function (date) {
        var nativeResult = this._nativeView.getEventAdapter().getEventsForDate(date.getTime());
        var result = new Array();
        if (nativeResult) {
            for (var i = 0; i < nativeResult.size(); i++) {
                var nativeEvent = nativeResult.get(i);
                result.push(new CalendarEvent(nativeEvent.getTitle(), new Date(nativeEvent.getStartDate()), new Date(nativeEvent.getEndDate()), nativeEvent.isAllDay(), new color_1.Color(nativeEvent.getEventColor())));
            }
        }
        return result;
    };
    RadCalendar.getCalendarFromDate = function (date) {
        var calendar = java.util.Calendar.getInstance();
        calendar.setTimeInMillis(date.getTime());
        return calendar;
    };
    RadCalendar.getDateFromCalendar = function (calendar) {
        return new Date(calendar.getTimeInMillis());
    };
    RadCalendar.prototype.clearSelection = function () {
        this.selectedDates = new Array();
    };
    RadCalendar.prototype.initOnInlineEventsClickedListener = function () {
        if (this.eventsViewMode == commonModule.CalendarEventsViewMode.Inline) {
            this.addOnInlineEventsClickedListener();
        }
    };
    RadCalendar.prototype.updateEventSource = function () {
        if (!this._nativeView) {
            return;
        }
        if (this.eventSource) {
            var list = new java.util.ArrayList();
            for (var i = 0; i < this.eventSource.length; i++) {
                var item;
                if (this.eventSource instanceof observable_array_1.ObservableArray) {
                    item = this.eventSource.getItem(i).android;
                }
                else if (this.eventSource instanceof Array) {
                    item = this.eventSource[i].android;
                }
                list.add(item);
            }
            var eventAdapter = this._nativeView.getEventAdapter();
            eventAdapter.setEvents(list);
        }
    };
    RadCalendar.getAndroidViewModeFromViewMode = function (viewMode) {
        var modeString = viewMode.toLowerCase();
        var result = null;
        switch (modeString) {
            case commonModule.CalendarViewMode.Month.toLocaleLowerCase():
                result = com.telerik.widget.calendar.CalendarDisplayMode.Month;
                break;
            case commonModule.CalendarViewMode.MonthNames.toLocaleLowerCase():
                result = com.telerik.widget.calendar.CalendarDisplayMode.Year;
                break;
            case commonModule.CalendarViewMode.Week.toLocaleLowerCase():
                result = com.telerik.widget.calendar.CalendarDisplayMode.Week;
                break;
            case commonModule.CalendarViewMode.Year.toLocaleLowerCase():
                result = com.telerik.widget.calendar.CalendarDisplayMode.Year;
                break;
            case commonModule.CalendarViewMode.Day.toLocaleLowerCase():
                result = com.telerik.widget.calendar.CalendarDisplayMode.Day;
                break;
        }
        return result;
    };
    RadCalendar.getViewModeFromAndroidViewMode = function (calendar, viewMode) {
        var result = "";
        switch (viewMode) {
            case com.telerik.widget.calendar.CalendarDisplayMode.Month:
                result = commonModule.CalendarViewMode.Month;
                break;
            case com.telerik.widget.calendar.CalendarDisplayMode.Week:
                result = commonModule.CalendarViewMode.Week;
                break;
            case com.telerik.widget.calendar.CalendarDisplayMode.Day:
                result = commonModule.CalendarViewMode.Day;
                break;
            case com.telerik.widget.calendar.CalendarDisplayMode.Year: {
                if (calendar._nativeView.isYearModeCompact()) {
                    result = commonModule.CalendarViewMode.MonthNames;
                }
                else {
                    result = commonModule.CalendarViewMode.Year;
                }
                break;
            }
        }
        //?? case com.telerik.widget.calendar.CalendarDisplayMode.Flow: result = commonModule.CalendarViewMode.Flow; break;
        //?? case com.telerik.widget.calendar.CalendarDisplayMode.YearNumbers: result = commonModule.CalendarViewMode.YearNumbers; break;
        return result;
    };
    RadCalendar.getAndroidTransitonModeFromTransitionMode = function (value) {
        var transitionMode = value.toLowerCase();
        var nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Sticky;
        switch (transitionMode) {
            case commonModule.CalendarTransitionMode.None.toLowerCase():
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.None;
                break;
            case commonModule.CalendarTransitionMode.Slide.toLowerCase():
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Sticky;
                break;
            case commonModule.CalendarTransitionMode.Stack.toLowerCase():
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Stack;
                break;
            case commonModule.CalendarTransitionMode.Plain.toLowerCase():
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Plain;
                break;
            case commonModule.CalendarTransitionMode.Free.toLowerCase():
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Free;
                break;
            case commonModule.CalendarTransitionMode.Combo.toLowerCase():
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Combo;
                break;
            case commonModule.CalendarTransitionMode.Overlap.toLowerCase():
                nativeScrollMode = com.telerik.widget.calendar.ScrollMode.Overlap;
                break;
            default:
                console.log("WARNING: Unsupported transition mode: " + value);
        }
        return nativeScrollMode;
    };
    RadCalendar.getAndroidEventsViewModeFromEventsViewMode = function (value) {
        var eventsViewMode = value.toLowerCase();
        var nativeViewMode = com.telerik.widget.calendar.events.EventsDisplayMode.Normal;
        switch (eventsViewMode) {
            case commonModule.CalendarEventsViewMode.Inline.toLowerCase():
                nativeViewMode = com.telerik.widget.calendar.events.EventsDisplayMode.Inline;
                break;
            case commonModule.CalendarEventsViewMode.Popover.toLowerCase():
                nativeViewMode = com.telerik.widget.calendar.events.EventsDisplayMode.Popup;
                break;
            default:
                break;
        }
        return nativeViewMode;
    };
    return RadCalendar;
}(commonModule.RadCalendar));
exports.RadCalendar = RadCalendar;
