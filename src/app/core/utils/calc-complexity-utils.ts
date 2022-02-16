export function calcComplexity(k) {
    if (k === 3) { return 2; }
    if ((k === 1) || (k === 2)) { return 1; }

    return calcComplexity(k - 3) + calcComplexity(k - 2) + calcComplexity(k - 1);
}
