// multi.test.ts
//import { describe, expect, test } from '@jest/globals';
import { CalcMulti } from './multi'

describe('multi module', () => {
    test('multi 8 * 9 to 72', () => {
        expect(CalcMulti(8, 9)).toBe(72);
    })
})