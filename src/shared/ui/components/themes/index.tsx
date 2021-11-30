import { draculaTheme } from './dracula.theme';
import { GlobalThemeContract } from './theme.css';

export const useTheme = (properties?: GlobalThemeContract): void => {
    const unionProperties = JSON.parse(JSON.stringify(draculaTheme)) as GlobalThemeContract;

    properties &&
        iterateThemeVariables(properties, (parentProperties, value) => {
            let buff = unionProperties;
            for (const [ind, x] of parentProperties.entries()) {
                if (ind + 1 === parentProperties.length) {
                    buff[x] = value;
                } else {
                    buff = buff[x];
                }
            }
        });

    setThemeVariables(unionProperties);
};

export const setThemeVariables = (properties: GlobalThemeContract): void => {
    iterateThemeVariables(properties, (parentProperties, value) => {
        document.documentElement.style.setProperty(`--${parentProperties.join('-')}`, value);
    });
};

export const iterateThemeVariables = (
    object: Record<string, unknown>,
    action: (parentProperties: string[], value: string) => void,
): void => {
    const getProperty = (property: string, parentProperties: string[], parent: unknown) => {
        const currentProperties = [...parentProperties, property];

        if (parent[property].constructor === String) {
            action(currentProperties, parent[property]);
        } else {
            for (const nestedProperty of Object.getOwnPropertyNames(parent[property])) {
                getProperty(nestedProperty, currentProperties, parent[property]);
            }
        }
    };

    for (const property of Object.getOwnPropertyNames(object)) {
        getProperty(property, [], object);
    }
};
