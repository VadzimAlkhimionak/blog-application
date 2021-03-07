import {isValidEmail} from "./isValidEmail";

describe('Correct email function', () => {
    test('should return true', () => {
        const actual = 'vad.alkhimenok@gmail.com';
        const expected = isValidEmail(actual);
        expect(expected).toBeTruthy();
    });

    test('should return false', () => {
        const actual = 'vad.alkhimenok.gmail.com';
        const expected = isValidEmail(actual);
        expect(expected).toBeFalsy();
    });
});