export interface IFileName {
    id: string;
    contenthash: string;
    type: 'chunk' | 'bundle';
    ext: 'js';
}

export function parseFileNames(fileNames: string | string[]) {
    const parseFileName = (fileName: string): IFileName => {
        const lastPaths = fileName.split('/');
        const lastPath = lastPaths[lastPaths.length - 1];
        const splitted = lastPath.split('.');
        if (splitted.length !== 3 || (splitted[2] !== 'chunk' && splitted[2] !== 'bundle') || splitted[3] != 'js') {
            return null;
        }
        return splitted.length === 3
            ? {
                  id: splitted[0],
                  contenthash: splitted[1],
                  type: splitted[2],
                  ext: splitted[3],
              }
            : null;
    };
    if (typeof fileNames === 'string') {
        return parseFileName(fileNames);
    }
    return fileNames.map(parseFileName);
}
