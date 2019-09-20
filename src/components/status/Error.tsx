import React from 'react';

import {Icon} from 'react-materialize';

export default function Error({name, error}: { name: string, error: string }) {
  return (
    <div className='center error'>
      <Icon small>error</Icon>
      <p>Error loading {name}: {error}</p>
    </div>
  );
}
