export interface Task {
    title: string,
    description: string,
    isCompleted: boolean,
    imageURL: string,
    type: string,
    dateCompleted: Date,
    deadline: Date,
    startTime: Date,
    endTime: Date,
    location: string,
    googleMeet: string,
    guests: string,
    user: string,
    goal: string
}