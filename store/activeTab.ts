import { atom } from 'nanostores';

export type TabState = 'loans' | 'insurance';

export const activeTabStore = atom<TabState>('loans');

export function setActiveTab(tab: TabState) {
  activeTabStore.set(tab);
}
