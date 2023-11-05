function checkMediaType(mediaType: any, type: string) {
    return mediaType.toLowerCase().startsWith(type);
}

export default checkMediaType;
