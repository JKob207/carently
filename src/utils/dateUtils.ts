export const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
};

export const getMinEndDate = (startDate: Date) => {
    const currentStartDate = new Date(startDate);
    currentStartDate.setDate(currentStartDate.getDate() + 1);
    return currentStartDate;
};