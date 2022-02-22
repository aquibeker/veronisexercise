export interface BuildJob {
    id: number;
    name: string;
    number: number;
    complexity: number;
}

/* I think this data structure will have better for performance
export interface BuildJobDictionary {
    id: number;
    data: {
        name: string;
        number: number;
        complexity: number;
    }
}
*/