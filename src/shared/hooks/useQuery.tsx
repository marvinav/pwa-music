// A custom hook that builds on useLocation to parse
import { useLocation } from 'react-router-dom';

const jsonKeys = new Set(['filter']);

// the query string for you.
export function useQuery<T extends { [key: string]: unknown }>(): T {
    const search = new URLSearchParams(useLocation().search);
    const result: Record<string, unknown> = {};
    for (const [key, value] of search.entries()) {
        const toInsert = jsonKeys.has(key) ? JSON.parse(value) : value;
        let old = result[key];
        if (old && Array.isArray(old)) {
            old.push(toInsert);
        } else if (old) {
            old = [old, toInsert];
        } else {
            old = toInsert;
        }
        result[key] = old;
    }
    return result as T;
}
