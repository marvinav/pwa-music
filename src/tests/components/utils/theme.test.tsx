import { defaultThemeVariables } from '../../../components/types';
import { iterateThemeVariables, setThemeVariables, useThemeVariables } from '../../../components/utils/themeVariables';

it('Iterate theme variables', () => {
    const obj = {
        a: {
            aa: {
                aaa: 'aaa',
                aab: 'aab',
            },
            ab: {
                aba: 'aba',
                abb: {
                    abba: 'abba',
                },
            },
            ac: 'ac',
        },
        b: 'b',
    };
    const called: { key: string; val: string }[] = [];
    iterateThemeVariables(obj, (parents, val) => {
        called.push({ key: parents.join('-'), val });
    });

    expect(called.length).toBe(6);
    expect(called.find((x) => x.key === 'a-aa-aaa').val).toBe('aaa');
    expect(called.find((x) => x.key === 'a-aa-aab').val).toBe('aab');
    expect(called.find((x) => x.key === 'a-ab-aba').val).toBe('aba');
    expect(called.find((x) => x.key === 'a-ab-abb-abba').val).toBe('abba');
    expect(called.find((x) => x.key === 'a-ac').val).toBe('ac');
    expect(called.find((x) => x.key === 'b').val).toBe('b');
});

describe('Use theme variable', () => {
    let called: { property: string; value: string }[] = [];
    global.document.documentElement.style.setProperty = (property, value) => {
        called.push({ property, value });
    };
    it('Default', () => {
        called = [];
        useThemeVariables();
        expect(called.find((x) => x.property === '--size-xs').value).toBe('8px');
        expect(called.find((x) => x.property === '--border-color-radius').value).toBe('5px');
    });

    it('Not default', () => {
        called = [];
        useThemeVariables({
            background: { color: 'not-default' },
            font: {
                family: {
                    main: 'not-main',
                },
            },
        });
        expect(called.find((x) => x.property === '--background-color').value).toBe('not-default');
        expect(called.find((x) => x.property === '--font-family-main').value).toBe('not-main');
        expect(called.find((x) => x.property === '--font-family-special').value).toBe(
            defaultThemeVariables.font.family.special,
        );
        expect(called.find((x) => x.property === '--size-xs').value).toBe('8px');
        expect(called.find((x) => x.property === '--border-color-radius').value).toBe('5px');
    });
});

it('Set theme variables', () => {
    const called: { property: string; value: string }[] = [];
    global.document.documentElement.style.setProperty = (property, value) => {
        called.push({ property, value });
    };
    setThemeVariables({
        background: { color: 'not-default' },
        font: {
            family: {
                main: 'not-main',
            },
        },
    });
    expect(called.find((x) => x.property === '--background-color').value).toBe('not-default');
    expect(called.find((x) => x.property === '--font-family-main').value).toBe('not-main');
});
