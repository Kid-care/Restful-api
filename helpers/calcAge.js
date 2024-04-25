const { mongo } = require("mongoose");


function calculateAge(birthDate) {
    const [month, day, year] = birthDate.split('/').map(Number);
    const birth = new Date(year, month - 1, day);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        return age - 1;
    } else {
        return age;
    }
}

module.exports = calculateAge;