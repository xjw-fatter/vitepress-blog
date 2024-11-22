export type NavData = {
    title: string;
    items: NavDataItem[];
};

export type NavDataItem = {
    icon: string | { svg: string };
    title: string;
    desc?: string;
    link: string;
};