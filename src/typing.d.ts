export interface Instance {
    host: string;
    jobs: string[];
}

export interface AppConfig {
    instances: Instance[];
}