$(document).ready(function() {
    var selectedInput;

    var initialHour = 1;
    var initialMinute = 0;
    var initialPeriod = "AM";

    $(document).keyup(function(e) {
        if(e.key === "Escape" || e.key === "Esc") {
            $(".time-picker").remove();
        }
    });

    $(".time-input").attr('readonly', 'readonly');
    $(".time-input").attr('open', 'open');
    $(".time-input").attr('placeholder', '--:-- --');

    $(".time-input").on('click', function() {
        setupPicker($(this));
    });

    $(".time-input").focus(function() {
        setupPicker($(this));
    });

    function setupPicker(input) {
        selectedInput = input;
        if(selectedInput.val() != "") {
            setupInitalValues(selectedInput.val());
        }

        $(".time-picker").remove();
        
        selectedInput.parent().append(insertPicker());

        $(".hour-picker").select();
    }

    function setupInitalValues(value) {
        var split = value.split(':');

        var hour = parseInt(split[0]);
        
        if(hour - 12 > 0) {
            initialHour = hour - 12;
            initialPeriod = "PM";
        } else {
            initialHour = hour;
            initialPeriod = "AM";
        }

        initialMinute = parseInt(split[1]);
    }

    function hourPickerChange() {
        if($(this).val() > 12){
            $(this).val(12);
        } else if($(this).val() < 1) {
            $(this).val(1);
        }
    }

    function hourPickerMouseWheel(event) {
        event.preventDefault();
        var change = 0;
        var current = parseInt($(this).val());
        if(event.originalEvent.wheelDelta < 0) {
            change = -1;
        } else {
            change = 1;
        }

        updateHour(current, change);
    }

    function hourButtonClick() {
        var current = parseInt($(".hour-picker").val());
        var delta = parseInt($(this).val());
        updateHour(current, delta);
    }

    function minutePickerChange() {
        if($(this).val() > 59){
            $(this).val(59);
        } else if($(this).val() < 1) {
            $(this).val(1);
        }
    }

    function minutePickerMouseWheel(event) {
        event.preventDefault();
        var change = 0;
        var current = parseInt($(this).val());
        if(event.originalEvent.wheelDelta < 0) {
            change = -1;
        } else {
            change = 1;
        }

        updateMinute(current, change);
    }

    function minuteButtonClick() {
        var current = parseInt($(".minute-picker").val());
        var delta = parseInt($(this).val());
        updateMinute(current, delta);
    }

    function periodPickerMouseWheel(event) {
        event.preventDefault();
        if($(this).val() == 0) {
            $(this).val(12);
        } else {
            $(this).val(0);
        }
    }

    function updateHour(current, delta) {
        $(".hour-picker").val(calculateUpdatedValue(current, 12, 1, delta));
    }

    function updateMinute(current, delta) {
        $(".minute-picker").val(calculateUpdatedValue(current, 59, 0, delta));
    }

    function calculateUpdatedValue(current, upperBound, lowerBound, delta) {
        if(current == upperBound && delta > 0) {
            return lowerBound;
        } else if(current == lowerBound && delta < 0) {
            return upperBound;
        } else {
            return current + delta;
        }
    }

    function applyTimePicked() {
        var timeVal = "";

        var hour = parseInt($(".hour-picker").val());
        var period = parseInt($(".period-picker").val());
        if(hour == 12 & period == 0) {
            hour = "0";
        } else {
            hour = String(hour + period);
        }

        if(hour.length < 2) {
            hour = String('00' + hour).slice(-2);
        }
        var minute = $(".minute-picker").val();
        if(minute.length < 2) {
            minute = String('00' + minute).slice(-2);
        }

        timeVal = hour + ":" + minute;

        selectedInput.val(timeVal);
        selectedInput.text(timeVal);
        $(this).closest(".time-picker").remove();

        initialHour = 1;
        initialMinute = 0;
        initialPeriod = "AM";
    }

    function insertPicker() {
        var picker = $('<div class="time-picker"></div>');

        picker.append(setupPickerHeader());

        picker.append(setupTimeRow());
        
        picker.append(setupButtonRow());

        var coords = selectedInput.position();

        var top = coords.top + selectedInput.height() + 3;

        picker.css('top', top);
        picker.css('left', coords.left);
        picker.css('z-index', 1);
        return picker;
    }

    function setupPickerHeader() {
        var header = $('<div class="picker-header"><h5>Time Picker</h3></div>');

        return header;
    }

    function setupTimeRow() {
        var timeRow = $('<div class="picker-row" ></div>');  

        timeRow.append(setupHourCol());
        timeRow.append(setupMinuteCol());
        timeRow.append(setupPeriodCol());

        return timeRow;
    }

    function setupHourCol() {
        var hourCol = $('<div class="picker-col"><div class="picker-col-interior"></div></div>');

        var hourButtonUp = $('<button value="1" tabindex="-1" type="button" class="hour-picker-button btn picker-button">&#9206;</button>');
        var hourPicker = $('<input class="hour-picker picker form-control picker-input" type="number" value="' + initialHour + '" min="1" max="12"/>');
        var hourButtonDown = $('<button value="-1" tabindex="-1" type="button" class="hour-picker-button btn picker-button">&#9207;</button>');

        hourButtonUp.on('click', hourButtonClick);
        hourButtonDown.on('click', hourButtonClick);
        hourPicker.change(hourPickerChange);
        hourPicker.on('mousewheel', hourPickerMouseWheel);

        hourCol.append(hourButtonUp);
        hourCol.append(hourPicker);
        hourCol.append(hourButtonDown);

        return hourCol;
    }

    function setupMinuteCol() {
        var minuteCol = $('<div class="picker-col"><div class="picker-col-interior"></div></div>');

        var minuteButtonUp = $('<button value="1" tabindex="-1" type="button" class="minute-picker-button btn picker-button">&#9206;</button>');
        var minutePicker = $('<input class="minute-picker picker form-control picker-input" type="number" value="' + initialMinute + '" min="0" max="59"/>');
        var minuteButtonDown = $('<button value="-1" tabindex="-1" type="button" class="minute-picker-button btn picker-button">&#9207;</button>');
        
        minuteButtonUp.on('click', minuteButtonClick);
        minuteButtonDown.on('click', minuteButtonClick);
        minutePicker.on('mousewheel', minutePickerMouseWheel);
        minutePicker.change(minutePickerChange);

        minuteCol.append(minuteButtonUp);
        minuteCol.append(minutePicker);
        minuteCol.append(minuteButtonDown);

        return minuteCol;
    }

    function setupPeriodCol() {
        var periodCol = $('<div class="picker-col"><div class="picker-col-interior"></div></div>');

        if(initialPeriod === "AM") {
            var periodPicker = $('<select class="period-picker form-control"><option value="0">AM</option><option value="12">PM</option></select>');    
        } else {
            var periodPicker = $('<select class="period-picker form-control"><option value="0">AM</option><option selected value="12">PM</option></select>');
        }

        periodPicker.on('mousewheel', periodPickerMouseWheel);

        periodCol.append(periodPicker);

        return periodCol;
    }

    function setupButtonRow() {
        var buttonRow = $('<div class="picker-row btn-group" style="width: 100%;"></div>');

        var submitButton = $('<button type="button" class="submission-button btn submit">&#10003;</button>');
        var cancelButton = $('<button type="button" class="submission-button btn cancel">&#88;</button>');

        submitButton.on('click', applyTimePicked);
        cancelButton.on('click', function() {
            $(this).closest(".time-picker").remove();
        });

        buttonRow.append(submitButton);
        buttonRow.append(cancelButton);

        return buttonRow;
    }
});