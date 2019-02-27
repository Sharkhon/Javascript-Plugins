class DateTime {
    month: number;
    day: number;
    year: number;

    

    /**
     * Makes the datetime object
     * @precondition The day must be between 1 and 31 based on the month. 
     *              The month must be between 1 and 12
     *              The year must be at least 1950
     *              The hour must be be betweeen 1 and 12
     *              The minute must be between 0 and 60
     *              The second must be between 0 and 60
     * 
     * @param day The day
     * @param month The month
     * @param year The year
     * @param hour 
     * @param minute 
     * @param second 
     */
    constructor(day: number = 1, month: number = 1, year: number = 1950, hour: number = 1, minute: number = 0, second: number = 0, period: DateTime.Period) {

    }
}

module DateTime {
    export enum Period {
        "AM",
        "PM"
    };
}

export = DateTime;