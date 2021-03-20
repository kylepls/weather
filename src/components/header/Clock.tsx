import React, {useState} from 'react';
import {duration, useInterval} from 'util/Hooks';
import moment from 'moment';
import TextFit from 'react-textfit';
import TextTransition, {presets} from 'react-text-transition';

import './Clock.css';

interface Props {
  format: string
  update: duration
}

export default function Clock({format, update}: Props) {
  const [time, setTime] = useState(moment());
  useInterval(() => setTime(moment()), update);
  return (
    <TextFit className="text-container" mode="single" forceSingleModeWidth={false}>
      <TextTransition
        text={time.format(format)}
        springConfig={ presets.wobbly }
      />
    </TextFit>
  );
}
