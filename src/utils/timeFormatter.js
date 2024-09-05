const formatMintoHMin = value => {
    if (value >= 60) {
        let hours = value / 60;
        // Round hours to nearest 0.0 or 0.5
        hours = Math.round(hours * 2) / 2;
        return `${hours}h`;
    } else {
        return `${value}min`;
    }
}

export default formatMintoHMin;


/*const formatMintoHMin = value => {
    if (value >= 60) {
        const hours = Math.floor(value / 60)
        const minutes = value % 60
        if (minutes === 0) {
            return `${hours}h`
        } else {
            return `${hours}h ${minutes}min`
        }
    } else {
        return `${value}min`
    }
}

export default formatMintoHMin
*/
