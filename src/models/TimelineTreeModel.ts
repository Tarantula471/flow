import { Scroll } from "./TimelineCollnModel";
import { Media } from "./TimelineItemMedia";
import { TimelineItemViewModel } from "./TimelineItemModel";
import { TimelineMode } from "./TimelineModel";

interface CommonPropsModel {
  onClick: (id?: string) => void;
  slideItemDuration?: number;
  slideShowRunning?: boolean;
  theme?: Theme;
  cardHeight?: number;
  mode?: TimelineMode;
  alternateCards?: boolean;
}

interface CommonBranchAndLeafModel extends CommonPropsModel {
  active?: boolean;
  className: string;
  id?: string;
}

export interface TreeLeafModel extends CommonBranchAndLeafModel {
  onActive: (timelinePointOffset: number) => void;
}

export interface TreeBranchModel extends CommonBranchAndLeafModel {
  contentDetailedText?: string;
  contentText: string;
  contentTitle?: string;
  index: number;
  media?: Media;
  onShowMore: () => void;
  title: string;
  visible?: boolean;
  onActive: (
    timelinePointOffset: number,
    timelineContentHeight: number,
    timelineContentOffset: number
    ) => void;
  onMediaStateChange: (state: { id?: string; playing?: boolean; paused?: boolean }) => void;
}

export interface TimelineTreeModel extends CommonPropsModel {
  activeTimelineItem: number;
  autoScroll: (s: Partial<Scroll>) => void;
  items: TimelineItemViewModel[];
  onMediaStateChange: (state: { id?: string; playing?: boolean; paused?: boolean }) => void;
}

export interface Theme {
  primary: string;
  secondary: string;
  textColor?: string;
}

