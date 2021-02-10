const validateHeaders = (req) =>{
    const status = req.get('Content-Type').split(';')[0]=='application/json';
    return  status;
}

module.exports = validateHeaders;