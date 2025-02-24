import { Activity } from "../types/activity";

export class ActivityFactory {
    static createActivity(name: string, level: string, description: string, details: string): Activity {
        return { name, level, description, details };
    }
}