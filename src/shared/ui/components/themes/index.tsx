import { GlobalThemeContract } from './theme.css';
import { draculaTheme } from './dracula.theme';

export const useTheme = (props?: GlobalThemeContract): void => {
    const unionProps = JSON.parse(JSON.stringify(draculaTheme)) as GlobalThemeContract;

    props &&
        iterateThemeVariables(props, (parentProps, value) => {
            let buff = unionProps;
            parentProps.forEach((x, ind) => {
                if (ind + 1 === parentProps.length) {
                    buff[x] = value;
                } else {
                    buff = buff[x];
                }
            });
        });

    setThemeVariables(unionProps);
};

export const setThemeVariables = (props: GlobalThemeContract): void => {
    iterateThemeVariables(props, (parentProps, value) => {
        document.documentElement.style.setProperty(`--${parentProps.join('-')}`, value);
    });
};

export const iterateThemeVariables = (
    obj: Record<string, unknown>,
    action: (parentProps: string[], value: string) => void,
): void => {
    const getProperty = (prop: string, parentProps: string[], parent: unknown) => {
        const currentProps = [...parentProps, prop];

        if (parent[prop].constructor === String) {
            action(currentProps, parent[prop]);
        } else {
            for (const nestedProp of Object.getOwnPropertyNames(parent[prop])) {
                getProperty(nestedProp, currentProps, parent[prop]);
            }
        }
    };

    for (const prop of Object.getOwnPropertyNames(obj)) {
        getProperty(prop, [], obj);
    }
};
