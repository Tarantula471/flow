import React, { useEffect, useRef, useState, WheelEvent } from "react";
import {
  ShowMore,
  TimelineContentDetails,
  TimelineContentDetailsWrapper,
  TimelineContentText,
  TimelineContentTitle,
  TimelineItemContentWrapper,
} from "./timeline-item-content.styles";

const TimelineItemContent: React.FunctionComponent<{
  content: string;
  active?: boolean;
  title?: string;
  detailedText?: string;
  onShowMore: () => void;
}> = ({ content, active, title, detailedText, onShowMore }) => {
  const [showMore, setShowMore] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [canShowMore, setCanShowMore] = useState(false);

  useEffect(() => {
    const detailsEle = detailsRef.current;

    if (!detailsEle) {
      return;
    }

    setCanShowMore(detailsEle.scrollHeight > 100);
  }, []);

  useEffect(() => {
    if (!active && ShowMore) {
      setShowMore(false);
    }
  }, [active]);

  useEffect(() => {
    const detailsEle = detailsRef.current;

    if (detailsEle) {
      detailsEle.scrollTop = 0;
    }
  }, [showMore]);

  const handleMouseWheel = (event: WheelEvent) => {
    if (showMore) {
      event.stopPropagation();
    }
  };

  return (
    <TimelineItemContentWrapper className={active ? "active" : ""}>
      {title && (
        <TimelineContentTitle className={active ? "active" : ""}>
          {title}
        </TimelineContentTitle>
      )}
      <TimelineContentText>{content}</TimelineContentText>
      <TimelineContentDetailsWrapper
        ref={detailsRef}
        className={!showMore ? "show-less" : ""}
      >
        <TimelineContentDetails onWheel={handleMouseWheel}>
          {detailedText}
        </TimelineContentDetails>
      </TimelineContentDetailsWrapper>
      {canShowMore && (
        <ShowMore
          role="button"
          onClick={() => {
            if (active) {
              setShowMore(!showMore);
              onShowMore();
            }
          }}
          className="show-more"
        >
          {active ? (showMore ? "show less" : "show more") : "..."}
        </ShowMore>
      )}
    </TimelineItemContentWrapper>
  );
};

export default TimelineItemContent;
