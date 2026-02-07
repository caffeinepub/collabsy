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
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface BrandProfile {
    name: string;
    createdAt: bigint;
    email: string;
    industry: string;
}
export interface SocialMediaLinks {
    tiktok?: string;
    twitter?: string;
    instagram?: string;
    others?: Array<string>;
    facebook?: string;
    youtube?: string;
}
export interface PaymentTransaction {
    id: bigint;
    status: Variant_pending_completed_failed;
    createdAt: bigint;
    sender: Principal;
    amount: bigint;
    receiver: Principal;
}
export interface DashboardStats {
    active: bigint;
    pending: bigint;
    totalSpend: bigint;
    totalCampaigns: bigint;
    completedCampaigns: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface CreatorProfile {
    id: Principal;
    instagramFollowers: bigint;
    youtubeSubscribers: bigint;
    pricingPost: bigint;
    pricingReel: bigint;
    createdAt: bigint;
    fullName: string;
    email: string;
    socialMediaLinks: SocialMediaLinks;
    category: string;
    phoneNumber: string;
    profilePicture?: ExternalBlob;
    pricingVideo: bigint;
    tiktokFollowers?: bigint;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface CollaborationRequest {
    id: bigint;
    status: Variant_pending_completed_rejected_accepted;
    creator: Principal;
    createdAt: bigint;
    campaignDetails: string;
    brand: Principal;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface UserProfile {
    createdAt: bigint;
    role: UserRole;
    email: string;
}
export enum UserRole {
    creator = "creator",
    brand = "brand"
}
export enum UserRole__1 {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_pending_completed_failed {
    pending = "pending",
    completed = "completed",
    failed = "failed"
}
export enum Variant_pending_completed_rejected_accepted {
    pending = "pending",
    completed = "completed",
    rejected = "rejected",
    accepted = "accepted"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole__1): Promise<void>;
    browseCreators(platform: string | null, minFollowers: bigint | null, maxFollowers: bigint | null, minPrice: bigint | null, maxPrice: bigint | null, category: string | null): Promise<Array<CreatorProfile>>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createCollaborationRequest(creatorId: Principal, campaignDetails: string): Promise<CollaborationRequest>;
    createPaymentTransaction(receiver: Principal, amount: bigint): Promise<PaymentTransaction>;
    getBrandDashboardStats(): Promise<DashboardStats>;
    getBrandProfile(): Promise<BrandProfile>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole__1>;
    getCollaborationRequest(collabId: bigint): Promise<CollaborationRequest>;
    getCreatorById(creatorId: Principal): Promise<CreatorProfile>;
    getCreatorDashboardStats(): Promise<DashboardStats>;
    getCreatorProfile(): Promise<CreatorProfile>;
    getPaymentTransaction(transactionId: bigint): Promise<PaymentTransaction>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    registerBrand(name: string, email: string, industry: string): Promise<void>;
    registerCreator(fullName: string, phoneNumber: string, email: string, instagramFollowers: bigint, youtubeSubscribers: bigint, tiktokFollowers: bigint | null, pricingReel: bigint, pricingPost: bigint, pricingVideo: bigint, category: string, socialMediaLinks: SocialMediaLinks, profilePicture: ExternalBlob | null): Promise<CreatorProfile>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateCollaborationStatus(collabId: bigint, status: Variant_pending_completed_rejected_accepted): Promise<void>;
    updateCreatorProfile(fullName: string, phoneNumber: string, instagramFollowers: bigint, youtubeSubscribers: bigint, tiktokFollowers: bigint | null, pricingReel: bigint, pricingPost: bigint, pricingVideo: bigint, category: string, socialMediaLinks: SocialMediaLinks, profilePicture: ExternalBlob | null): Promise<CreatorProfile>;
    updatePaymentStatus(transactionId: bigint, status: Variant_pending_completed_failed): Promise<void>;
}
