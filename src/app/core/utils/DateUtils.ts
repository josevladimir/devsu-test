import { completeWithZeros } from "./NumbersUtils"

export const parseDate = (date: Date): string => {
    return `${date.getFullYear()}-${completeWithZeros(date.getMonth()+1, 2)}-${completeWithZeros(date.getDate(), 2)}`;
}