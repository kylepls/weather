import React from 'react';

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
      <div className="parameter"> {image} <p> <span>{formatted}</span> </p></div>
    </div>
  );
}

export default parameterDisplay;
