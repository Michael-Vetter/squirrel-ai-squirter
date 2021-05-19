const net = require('net');

exports.squirtSquirrel = function () {
    const client = new net.Socket();

    client.connect(8000, '192.168.1.150', () => {
        client.write('!Q12=1$');
    });
}