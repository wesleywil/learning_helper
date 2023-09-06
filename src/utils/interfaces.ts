export interface Topic{
    id?:number,
    status:Status,
    title:string,
    description:string,
    finished:boolean,
    sub_topics?:SubTopic[],
}

export interface SubTopic{
    id:number,
    title:string,
    description:string,
    finished:boolean,
}

export enum Status{
    LEARNING  = "LEARNING",
    WANT_TO_LEARN = "WANT_TO_LEARN",
    FINISHED = "FINISHED"
}