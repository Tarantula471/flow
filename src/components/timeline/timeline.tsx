import React, { useCallback, useEffect, useRef } from "react";
import useNewScrollPosition from "../effects/useNewScrollPosition";
import { Scroll } from "../models/TimelineCollnModel";
import { TimelineItemViewModel } from "../models/TimelineItemModel";
import { TimelineModel } from "../models/TimelineModel";
import TimelineCollection from "../timeline-collection/timeline-collection";
import TimelineControl from "../timeline-control/timeline-control";
import TimelineTree from "../timeline-tree/timeline-tree";
import {
  Outline,
  TimelineContentRender,
  TimelineControlContainer,
  TimelineMain,
  TimelineMainWrapper,
  Wrapper,
} from "./timeline.style";

const Timeline: React.FunctionComponent<TimelineModel> = ({
  activeTimelineItem,
  disableNavOnScroll,
  disableNavOnKey,
  itemWidth = 320,
  items,
  mode = "HORIZONTAL",
  onNext,
  onPrevious,
  onTimelineUpdated,
  slideShowRunning,
  onLast,
  onFirst,
}) => {
  const [newOffSet, setNewOffset] = useNewScrollPosition(mode, itemWidth);

  const timelineMainRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    onNext();
  };

  const handlePrevious = () => {
    onPrevious();
  };

  const handleFirst = () => {
    onFirst();
  };

  const handleLast = () => {
    onLast();
  };

  const handleKeySelection = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { keyCode } = event;

    if (
      (mode === "HORIZONTAL" && keyCode === 39) ||
      ((mode === "VERTICAL" || mode === "TREE") && keyCode === 40)
    ) {
      handleNext();
    } else if (
      (mode === "HORIZONTAL" && keyCode === 37) ||
      ((mode === "VERTICAL" || mode === "TREE") && keyCode === 38)
    ) {
      handlePrevious();
    } else if (keyCode === 36) {
      handleFirst();
    } else if (keyCode === 35) {
      handleLast();
    }
  };

  const handleMouseWheel = (evt: React.WheelEvent) => {
    if (slideShowRunning) {
      return;
    }

    if (evt.deltaY > 0) {
      handleNext();
    } else if (evt.deltaY < 0) {
      handlePrevious();
    }
  };

  const handleTimelineItemClick = (id?: string) => {
    if (id && !slideShowRunning) {
      for (let idx = 0; idx < items.length; idx++) {
        if (items[idx].id === id) {
          onTimelineUpdated && onTimelineUpdated(idx);
          break;
        }
      }
    }
  };

  const handleScroll = useCallback(
    (scroll: Partial<Scroll>) => {
      const element = timelineMainRef.current;
      if (element) {
        setNewOffset(element, scroll);
      }
    },
    [setNewOffset]
  );

  useEffect(() => {
    const ele = timelineMainRef.current;
    if (!ele) {
      return;
    }
    if (mode === "HORIZONTAL") {
      ele.scrollLeft = newOffSet;
    } else {
      ele.scrollTop = newOffSet;
    }
  }, [newOffSet, mode]);

  return (
    <Wrapper
      tabIndex={0}
      onKeyDown={(evt) => (!disableNavOnKey ? handleKeySelection(evt) : null)}
      onWheel={(evt) => (!disableNavOnScroll ? handleMouseWheel(evt) : null)}
      className={mode.toLowerCase()}
    >
      <TimelineMainWrapper ref={timelineMainRef} className={mode.toLowerCase()}>
        {mode !== "TREE" ? (
          <TimelineMain className={mode.toLowerCase()}>
            {mode === "HORIZONTAL" && <Outline />}
            <TimelineCollection
              items={items as TimelineItemViewModel[]}
              itemWidth={itemWidth}
              handleItemClick={handleTimelineItemClick}
              autoScroll={handleScroll}
              mode={mode}
            />
          </TimelineMain>
        ) : (
          <TimelineTree
            items={items as TimelineItemViewModel[]}
            onClick={handleTimelineItemClick}
            activeTimelineItem={activeTimelineItem}
            autoScroll={handleScroll}
          />
        )}
      </TimelineMainWrapper>
      <TimelineControlContainer className={slideShowRunning ? "hide" : "show"}>
        <TimelineControl
          onNext={handleNext}
          onPrevious={handlePrevious}
          disableLeft={activeTimelineItem === 0}
          disableRight={activeTimelineItem === items.length - 1}
        />
      </TimelineControlContainer>
      <TimelineContentRender id="content-render" />
    </Wrapper>
  );
};

export default Timeline;
