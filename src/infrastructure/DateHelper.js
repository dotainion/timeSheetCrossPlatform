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
        return m[parseInt(index)] || null;
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
        return m[parseInt(index)] || null;
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
        return w[parseInt(index)] || null;
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
        return w[parseInt(index)] || null;
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

    monthIndex(month){
        let index = 0;
        for(let mth of this.month()){
            if(mth?.toLowerCase()?.includes(month?.toLowerCase())){
                return index;
            }
            index ++;
        }
        return null;
    }

    monthMiniWithinRange(from, to){
        let months = [];
        let start = null;
        for(let month of this.monthMini()){
            if(month === from){
                months.push(month);
                start = true;
                if(from === to) break;
                continue;
            }else if(month === to){
                months.push(month);
                break;
            }
            if(start === true){
                months.push(month);
            }
        }
        return months;
    }

    yearsWithinRange(from, to){
        if (isNaN(from) || isNaN(to) || parseInt(to) < parseInt(from)) return [];
        let years = [`${from}`];
        for(let _ of [...Array((parseInt(to) - parseInt(from)) || 0).keys()]){
            years.push(`${parseInt(from) +1}`);
        }
        return years;
    }

    isValidMonth(month){
        for(let mth of this.month()){
            if(mth === month) return true;
        }
        return false;
    }

    isValidMinMonth(month){
        for(let mth of this.monthMini()){
            if(mth === month) return true;
        }
        return false;
    }

    isValidMinWeek(week){
        for(let mth of this.weekMini()){
            if(mth === week) return true;
        }
        return false;
    }
    
    isValidWeek(week){
        for(let mth of this.week()){
            if(mth === week) return true;
        }
        return false;
    }
}