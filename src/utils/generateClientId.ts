import CryptoJS from 'crypto-js';

const generateClientId = (uid: string) => {
    const hash = CryptoJS.SHA256(uid).toString(CryptoJS.enc.Hex);
    const numId = parseInt(hash.slice(0, 10), 16).toString().slice(0, 5);
    
    return numId;
};

export default generateClientId;