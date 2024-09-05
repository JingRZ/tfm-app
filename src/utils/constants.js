const baseIP = {
    local: 'localhost',
    home: '192.168.1.87',
    hotspot: '192.168.159.165',
    web: 'api.jrzhao.com'

};

const context = "web";
const ip = baseIP[context];

export const BLE_RETRY = 10;


const CONFIG = context != 'web' ? {
    graphql: `https://${ip}:4000/graphql`,
    refreshToken: `https://${ip}:4000/api/refreshToken`,
    login: `https://${ip}:4000/me`,
    img: `https://${ip}:9092/img/`,
    whereami: `https://${ip}:4000/whereami`
} : {
    graphql: `https://${ip}/graphql`,
    refreshToken: `https://${ip}/refreshToken`,
    login: `https://${ip}/me`,
    img: `https://${ip}/img/`,
    whereami: `https://${ip}/whereami`,
    pathfind: `https://${ip}/pathfind`,
    pathfindnextinstr: `https://${ip}/nextinstr`,
};

export default CONFIG;