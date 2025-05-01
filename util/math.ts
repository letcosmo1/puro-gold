export const toNegative = (value: number) => {
    return value > 0 ? -value : value;
}

export const toPositive = (value: number) => {
    return Math.abs(value);
}