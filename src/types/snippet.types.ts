export interface Snippet {
    id: string;
    title: string;
    description: string;
    content: string;
    tags: string[];
    githubUrl?: string;
    demoUrl?: string;
    lastUpdated: string;
    language: string;
}

export interface CardProps {
    snippet: Snippet;
}