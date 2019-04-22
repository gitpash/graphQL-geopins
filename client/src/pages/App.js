import React, { useContext, useEffect } from 'react';
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

import withRoot from '../withRoot';
import Header from '../components/Header';
import Map from '../components/Map';
import Context from '../context';

const App = () => {
  const { dispatch } = useContext(Context);
  const mobileSize = useMediaQuery('(max-width: 650px)');

  useEffect(() => {
    dispatch({ type: 'DEFINE_MEDIA_QUERY', payload: mobileSize });
  }, [mobileSize]);

  return (
    <>
      <Header />
      <Map />
    </>
  );
};

export default withRoot(App);
