export function convertDurationToHumanRead(duration: number): string {
    if (!duration) {
        return `--:--`;
    }
    const min = duration / 60000;
    const sec = (min - Math.trunc(min)) * 60;

    console.log({ cd: duration, min, sec });
    return `${formatTime(min)}:${formatTime(sec)}`;
}

function formatTime(time: number) {
    if (time >= 10) {
        return Math.trunc(time);
    } else if (time >= 1) {
        return `0${Math.trunc(time)}`;
    }
    return `00`;
}
