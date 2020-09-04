export interface note {
    noteTitle:string,
    noteText:string,
    timeNoteCreated:number,
    videoTimeNoteTakenInSeconds:number,
    username:string
    _id:string
}

export interface sanitizedNote {
    noteText: string,
    noteTitle: string,
    timeNoteCreated: string,
    timeOfNote: number,
    timeSpot: string,
    _id: string,
}
