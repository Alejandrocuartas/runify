export const combineDateTime = (dateStr: string, timeStr: string): string => {
    const date = new Date(`${dateStr}T${timeStr}:00Z`);
    return date.toISOString();
};
