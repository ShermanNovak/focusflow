export interface JournalEntry {
    createdAt: string | number | Date;
    _id: string;
    title: string, 
    content: string,
    user: object,
    photoURL: string, 
}