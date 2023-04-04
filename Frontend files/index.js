function noOfTimesCharOccurrence(Strings,chars) {
    let count = 0
    let temp = chars;
    for(let i=0; i<Strings.length; i++) {
        if(Strings.charAt(i) === temp) {
            count++
        }
    }
    return count;
}

const result = noOfTimesCharOccurrence('sharpener','e');

console.log(result);