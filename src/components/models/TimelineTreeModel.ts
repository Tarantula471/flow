export interface TreeLeafModel {
  className: string;
  id?: string;
  active?: boolean;
  onClick: (id: string) => void;
  onActive: (timelinePointOffset: number) => void;
}

export interface TreeBranchModel {
  className: string;
  index: number;
  contentText: string;
  contentTitle?: string;
  active?: boolean;
  id?: string;
  onClick: (id: string) => void;
  onActive: (
    timelinePointOffset: number,
    timelineContentHeight: number,
    timelineContentOffset: number
  ) => void;
  title: string;
  visible?: boolean;
}