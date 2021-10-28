const FontStyle = {
    main: 'main-font',
    special: 'special-font',
};

const PaperStyle = {
    firstPaper: 'paper-0',
    secondPaper: 'paper-1',
};

export function useStyle(main: string, flags: [font: keyof typeof FontStyle, paper: keyof typeof PaperStyle]): string {
    return [main, flags].filter((x) => x != null).join(' ');
}
