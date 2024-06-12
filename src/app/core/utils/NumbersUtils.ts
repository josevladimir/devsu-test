export const completeWithZeros = (value: number, totalDigits: number): string => {
    let newValue: string = value.toString();
    
    let difference = totalDigits - newValue.length;
    if(difference <= 0) return value.toString();
    return '0'.repeat(difference) + newValue;
}

export const nextInteger = (value: number): number => {
    if(!value) return 0;
    if(value.toString().includes('.')) value = Math.trunc(value) + 1;
    return value;
}