const convertIpfsAddressToUrl = function (ipfsAddress: string) {
    if (ipfsAddress.startsWith("ipfs://")) {
        const ipfsHash = ipfsAddress.slice("ipfs://".length);
        const ipfsURL = `https://ipfs.io/ipfs/${ipfsHash}`;
        return ipfsURL;
    } else {
        return null;
    }
};
export default convertIpfsAddressToUrl;
