import { createContext } from 'react';

const CardContext = createContext({
    cardCode: null,
    step: 1
});

export default CardContext;