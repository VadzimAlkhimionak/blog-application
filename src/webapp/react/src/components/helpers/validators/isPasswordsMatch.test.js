import {isPasswordsMatch} from "./isPasswordsMatch";

describe('Passwords match function', () => {
    test('should return true', () => {
        const actualPassword = 'hello';
        const actualRepeatPassword = 'hello';
        const expected = isPasswordsMatch(actualPassword, actualRepeatPassword);
        expect(expected).toBeTruthy();
    });

    test('should return false', () => {
        const actualPassword = 'hello';
        const actualRepeatPassword = 'world';
        const expected = isPasswordsMatch(actualPassword, actualRepeatPassword);
        expect(expected).toBeFalsy();
    });
});