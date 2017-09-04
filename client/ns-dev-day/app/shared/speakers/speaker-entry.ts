export class SpeakerEntry {
    id: number;
    name: string;
    sessionsCount: string;
    bio: string;
    sessions: any[];
    imageUrl: string;

    constructor(id?: number, name?: string, sessionsCount?: number, bio?: string, sessions?: any[]) {
        this.id = id || -1;
        this.name = name || "";
        this.sessionsCount = (sessionsCount || 0) + (sessionsCount !== 1 ? " sessions" : " session");
        this.bio = bio || "";
        this.sessions = sessions || [];

        let trimmedName = this.name.toLowerCase().replace(" ", "");
        this.imageUrl = "~/images/speakers/" + trimmedName + ".jpg";
    }
}