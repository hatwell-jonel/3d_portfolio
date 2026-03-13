export enum ChatRole {
    user = "user",
    assistant = "assistant",
};

export interface ChatMessage {
    role: ChatRole;
    content: string;
}


export type Project = {
    title: string;
    description: string;
    image: string;
    tags: string[];
    link: string;
    isFeatured?: boolean;
};