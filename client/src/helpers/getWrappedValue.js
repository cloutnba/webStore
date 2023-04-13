import { take, trim } from "lodash";

export const getWrappedValue = (str, length) => {
    const charArr = [...trim(str).replace(/\s+/g, ' ')];

    return charArr.length > length ? `${ take(charArr, length).join('') }...` : charArr.join('');
};
