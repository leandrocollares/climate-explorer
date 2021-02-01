import { useEffect } from 'react';
import Netcdfjs from 'netcdfjs'

const useNetcdfData = () => {
  const urlpath =
    'https://gist.githubusercontent.com/danielstaal/bfe3b1646719ff37c47369fc62614128/raw/b9fb06bdddd7c8f7a7fe0c36d5e85dc4632e448d/NL_historic_temperature.nc';
  let reader = null
  let readerUrl = null

  const oReq = new XMLHttpRequest();
  oReq.open('GET', urlpath, true);
  oReq.responseType = 'blob';

  oReq.onload = function() {
    const blob = oReq.response;
    readerUrl = new FileReader();

    readerUrl.onload = function() {
      console.log(this.result)
      reader = new Netcdfjs(this.result);
    };

    readerUrl.readAsArrayBuffer(blob);
  };
  oReq.send();


  reader.getDataVariable('wmoId'); // go to offset and read it



  useEffect(() => {

  }, []);

  return null;
};

export default useNetcdfData;
