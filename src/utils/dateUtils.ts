export const formatDate = (date: Date | string): string => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    return new Date(date).toLocaleDateString('en-GB', options);
};

export const getMinEndDate = (startDate: Date) => {
    const currentStartDate = new Date(startDate);
    currentStartDate.setDate(currentStartDate.getDate() + 1);
    return currentStartDate;
};

export const formatEventDate = (eventDate: string | Date): string => {
    const date = new Date(eventDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
};