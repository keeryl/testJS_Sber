import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

function decode() {
    const uniqesSet = new Set();
    const uniqeId = {uniqe: uniqesSet};
    const res = encoded.map(item => {
        for (let key in item) {
            const value = item[key];
            if (key !== 'groupId' && key.includes('Id') && item[key] !== null) {
                if (translations.hasOwnProperty(value)) {
                    item[key] = translations[value];
                } else {
                    uniqesSet.add(value);
                }
            }
        }
        return item;
    });
    res.push(uniqeId);
    return res;
}

const decoded = decode();

console.log(decoded)
