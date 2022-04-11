export class DateHelper{
    month(index=null){
        const m = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        if (index == null) return m;
        return m[index] || null;
    }

    monthMini(index=null){
        const m = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];
        if (index == null) return m;
        return m[index] || null;
    }

    week(index){
        const w = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        if (index == null) return w;
        return w[index] || null;
    }

    weekMini(index){
        const w = [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
        ];
        if (index == null) return w;
        return w[index] || null;
    }

    minizeWeekAndMonth(value){
        let index = 0;
        if(!value) return value;
        for(let month of this.month()){
            value = value.replace(month, this.monthMini(index));
            index ++;
        }
        index = 0;
        for(let week of this.week()){
            value = value.replace(week, this.weekMini(index));
            index ++;
        }
        return value || null;
    }
}