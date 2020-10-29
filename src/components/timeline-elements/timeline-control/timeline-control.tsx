import React from 'react';
import { TimelineControlModel } from '../../../models/TimelineControlModel';
import ChevronLeft from '../../icons/chev-left';
import ChevronRightIcon from '../../icons/chev-right';
import ChevronsLeftIcon from '../../icons/chevs-left';
import ChevronsRightIcon from '../../icons/chevs-right';
import ReplayIcon from '../../icons/replay-icon';
import {
  ReplayWrapper,
  TimelineControlContainer,
  TimelineNavButton,
  TimelineNavItem,
  TimelineNavWrapper,
} from './timeline-control.styles';

const TimelineControl: React.FunctionComponent<TimelineControlModel> = React.memo(
  ({
    onNext,
    onPrevious,
    onFirst,
    onLast,
    disableLeft,
    disableRight,
    theme,
    slideShowRunning,
    onReplay,
    slideShowEnabled,
    mode,
  }: TimelineControlModel) => {
    return (
      <TimelineControlContainer slideShowActive={slideShowRunning}>
        <TimelineNavWrapper className="timeline-controls">
          {/* jump to first */}
          <TimelineNavItem disable={disableLeft}>
            <TimelineNavButton
              mode={mode}
              theme={theme}
              onClick={onFirst}
              title="Go to First"
              aria-label="first"
              tabIndex={0}
            >
              <ChevronsLeftIcon />
            </TimelineNavButton>
          </TimelineNavItem>

          {/* previous */}
          <TimelineNavItem disable={disableLeft}>
            <TimelineNavButton
              mode={mode}
              theme={theme}
              onClick={onPrevious}
              title="Previous"
              aria-label="previous"
              tabIndex={0}
            >
              <ChevronLeft />
            </TimelineNavButton>
          </TimelineNavItem>

          {/* next */}
          <TimelineNavItem disable={disableRight}>
            <TimelineNavButton
              mode={mode}
              theme={theme}
              onClick={onNext}
              title="Next"
              aria-label="next"
              tabIndex={0}
            >
              <ChevronRightIcon />
            </TimelineNavButton>
          </TimelineNavItem>

          {/* jump to last */}
          <TimelineNavItem disable={disableRight}>
            <TimelineNavButton
              mode={mode}
              theme={theme}
              onClick={onLast}
              title="Go to Last"
              aria-label="last"
              tabIndex={0}
            >
              <ChevronsRightIcon />
            </TimelineNavButton>
          </TimelineNavItem>

          {/* slideshow button */}
          <TimelineNavItem>
            {slideShowEnabled && (
              <ReplayWrapper
                theme={theme}
                onClick={onReplay}
                title="Play Slideshow"
                tabIndex={0}
              >
                <ReplayIcon />
              </ReplayWrapper>
            )}
          </TimelineNavItem>
        </TimelineNavWrapper>
      </TimelineControlContainer>
    );
  },
);

TimelineControl.displayName = 'Timeline Control';

export default TimelineControl;
