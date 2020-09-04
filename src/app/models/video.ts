
export interface video {
    _id: string,
    title: string,
    image:
      string,
    videoUrl: string,
    noteCount: number,
    year: number,
    categories: string[],
    course: null,
    hasBeenWatchedByUser: boolean,
}