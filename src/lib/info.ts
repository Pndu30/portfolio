import rawSiteInfo from "../data/user.json";

export interface ContactLink {
    label: string;
    text: string;
    href: string;
    target?: string;
    rel?: string;
}

export interface DownloadItem {
    label: string;
    text: string;
    href: string;
    filename?: string;
}

export interface ExperienceItem {
    role: string;
    company?: string;
    location?: string;
    period: string;
    description: string[];
}

export interface EducationItem {
    degree: string;
    institution: string;
    period: string;
    details?: string[];
}

export interface LanguageItem {
    language: string;
    proficiency?: string;
}

export interface HonourItem {
    title: string;
    issuer?: string;
    date?: string;
    description?: string;
}

export interface SkillCategory {
    category: string;
    items: string[];
}

export interface ResumeData {
    name: string;
    role: string;
    bio: string;
    downloads: {
        resume: DownloadItem;
        pgp?: DownloadItem; // omit to hide the PGP link/button
    };
    pgpFingerprint?: string;
    experience: ExperienceItem[];
    volunteering?: ExperienceItem[];
    languages?: LanguageItem[];
    honours?: HonourItem[];
    skills: SkillCategory[];
    education?: EducationItem[];
    certifications?: string[];
}

export interface SiteMeta {
    name: string;
    url: string;
    title: string;
    description: string;
    locale?: string;
    ogImage?: string;
}

export interface SiteInfo {
    name: string;
    role: string;
    site: SiteMeta;
    contacts: ContactLink[];
    resume: ResumeData;
}

export const info: SiteInfo = rawSiteInfo as SiteInfo;

export const contacts = info.contacts;
export const resume = info.resume;

export default info;