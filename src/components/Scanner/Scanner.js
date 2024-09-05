import React, { useContext } from 'react';
import './Scanner.css'
import { ActionsContext } from '../../context/NFCContext';
import { Image } from 'react-native';
import Spinner from '../../img/spinner.gif';

const Scanner = () => {
  const { actions, setActions} = useContext(ActionsContext);
    return (
      <div className="scanner">
        <p className="scanner-exit" onClick={()=>setActions({...actions, scan: null})}>X</p>
        <div className="scanner-container">
            <Image src={Spinner} alt="spinning log" className="scanner-image"/>
          <p className="scanner-text">
            Scanning...
          </p>
        </div>
      </div>
    );
};

export default Scanner;