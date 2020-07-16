interface String {
    decodeBase64(): string;
}

String.prototype.decodeBase64 = function(this: string) {
    return Buffer.from(this, "base64").toString();
}