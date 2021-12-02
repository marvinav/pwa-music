import { iterateThemeVariables, setThemeVariables, useTheme } from 'shared/ui/components/themes';
import { draculaTheme } from 'shared/ui/components/themes/dracula.theme';

it('Iterate theme variables', () => {
    const object = {
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
    iterateThemeVariables(object, (parents, value) => {
        called.push({ key: parents.join('-'), val: value });
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
        useTheme();
        expect(called.find((x) => x.property === '--size-xs').value).toBe('8px');
        expect(called.find((x) => x.property === '--font-family-main').value).toBe("'Roboto', sans-serif");
    });

    it('Not default', () => {
        called = [];
        useTheme({
            layer: {
                color: {
                    primary: {
                        '0': 'not-red',
                    },
                },
            },
            font: {
                family: {
                    main: 'not-main',
                },
            },
        });
        expect(called.find((x) => x.property === '--layer-color-primary-0').value).toBe('not-red');
        expect(called.find((x) => x.property === '--font-family-main').value).toBe('not-main');
        expect(called.find((x) => x.property === '--font-family-special').value).toBe(draculaTheme.font.family.special);
        expect(called.find((x) => x.property === '--size-xs').value).toBe('8px');
    });
});

it('Set theme variables', () => {
    const called: { property: string; value: string }[] = [];
    global.document.documentElement.style.setProperty = (property, value) => {
        called.push({ property, value });
    };
    setThemeVariables({
        layer: {
            background: {
                '0': 'not-default',
            },
        },
        font: {
            family: {
                main: 'not-main',
            },
        },
    });
    expect(called.find((x) => x.property === '--layer-background-0').value).toBe('not-default');
    expect(called.find((x) => x.property === '--font-family-main').value).toBe('not-main');
    expect(called.length).toBe(2);
});
