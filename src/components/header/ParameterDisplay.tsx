import React from 'react';
import {Col} from 'react-materialize';

type Props<T> = {
  value: T
  image: any
  colSize: number
  formatter?: (value: T) => string
}

function parameterDisplay<R>(props: Props<R>) {
  const {value, image, formatter, colSize}: any = props;
  const formatted: string = formatter ? formatter(value) : value.toString();
  return (
    <Col s={colSize}>
      <div className="center-align">
        <div className="parameter">
          {image}
          <p><span>{formatted}</span></p>
        </div>
      </div>
    </Col>
  );
}

export default parameterDisplay;
