import React from 'react';
import {Textfit} from 'react-textfit';

export default function FactView({value}) {
  return (
    <div className="fact">
      <h5>Fun Fact</h5>
      <div className="value">
        <Textfit>
          {value}
        </Textfit>
      </div>
    </div>
  );
}
