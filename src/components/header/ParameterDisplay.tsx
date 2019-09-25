import React from 'react';

import './ParameterDisplay.css';

type Props<T> = {
  value: T
  image: any
  formatter?: (value: T) => string
}

function parameterDisplay<R>(props: Props<R>) {
  const {value, image, formatter}: any = props;
  const formatted: string = formatter ? formatter(value) : value.toString();
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

export default parameterDisplay;
