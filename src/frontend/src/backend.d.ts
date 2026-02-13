import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Circle {
    id: string;
    members: Array<string>;
    admin?: Principal;
    name: string;
    description: string;
    isDemo: boolean;
}
export interface MBTIType {
    feeling: bigint;
    thinking: bigint;
    extrovert: bigint;
    introvert: bigint;
}
export interface UserProfile {
    bio: string;
    growthGoals: Array<string>;
    username: string;
    interests: Array<string>;
    userId: string;
    mbti?: MBTIType;
    avatar: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addMembersToCircle(circleId: string, newMembers: Array<string>): Promise<Circle>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCircle(name: string, description: string, isDemo: boolean): Promise<Circle>;
    createOrUpdateProfile(username: string, avatar: bigint, isAnonymous: boolean): Promise<UserProfile>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserProfileById(userId: string): Promise<UserProfile>;
    hasCircle(circleId: string): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    isRegistered(): Promise<boolean>;
    manageChallenge(id: string, title: string, description: string, isWeekly: boolean): Promise<string>;
    removeChallenge(id: string): Promise<void>;
    removeCircle(id: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateChallenge(id: string, title: string, description: string): Promise<void>;
    updateCircle(name: string, description: string, id: string): Promise<Circle>;
    uploadBlob(id: string, name: string, blob: ExternalBlob): Promise<ExternalBlob>;
}
