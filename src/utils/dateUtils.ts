export const formatDate = (date: Date | string): string => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    return new Date(date).toLocaleDateString('en-GB', options);
};

export const getMinEndDate = (startDate: Date) => {
    const currentStartDate = new Date(startDate);
    currentStartDate.setDate(currentStartDate.getDate() + 1);
    return currentStartDate;
};