const log = (tag, message, ...rest) => {
    console.log(`[${tag}] ${message} ${rest}`);
}

const error = (tag, message, ...rest) => {
    console.error(`[${tag}] ${message} ${rest}`);
}

const warn = (tag, message, ...rest) => {
    console.warn(`[${tag}] ${message} ${rest}`);
}

const LogService = {
    log,
    error,
    warn
};

export default LogService;