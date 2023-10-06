import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

function decode() {
    const uniqeId = {uniqe: []};
    const res = encoded.map(item => {
        for (let key in item) {
            const value = item[key];
            if (key !== 'groupId' && key.includes('Id') && item[key] !== null) {
                if (translations.hasOwnProperty(value)) {
                    item[key] = translations[value];
                } else {
                    uniqeId.uniqe.push(value);
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
