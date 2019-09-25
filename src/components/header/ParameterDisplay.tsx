import React from 'react';
import TextFit from 'react-textfit';
import {useMediaQuery} from 'react-responsive';

import './ParameterDisplay.css';

type Props<T> = {
  value: T
  image: any
  formatter?: (value: T, small: boolean) => string
}


export default function ParameterDisplay<R>(props: Props<R>) {
  const {value, image, formatter}: any = props;
  const isSmall = useMediaQuery({query: '(max-width: 900px)'});
  const formatted: string = formatter ? formatter(value, isSmall) : value.toString();
  return (
    <div className="weatherElement">
      <div className="parameter">
        <div className="icon-wrapper">{image}</div>
        <div className="label-wrapper">
          <p>{formatted}</p>
        </div>
      </div>
    </div>
  );
}
