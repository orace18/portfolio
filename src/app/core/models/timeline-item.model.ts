export type TimelineItemType = 'experience' | 'formation';

export interface TimelineItem {
  period: string;
  title: string;
  place: string;
  description: string;
  type: TimelineItemType;
}
