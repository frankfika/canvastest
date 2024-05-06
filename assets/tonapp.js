import TonConnect from '@tonconnect/sdk';

const connector = new TonConnect({
    manifestUrl: 'assets/manifest.json', // Replace with your manifest URL
    storage: window.localStorage
});

document.getElementById('connectWallet').addEventListener('click', function() {
    connector.connect().then((response) => {
        console.log('Wallet is connected', response);
        document.getElementById('walletInfo').innerHTML = `Connected Wallet: ${response.address}`;
        document.getElementById('connectWallet').style.display = 'none';
        document.getElementById('disconnectWallet').style.display = 'inline-block';
    }).catch((error) => {
        console.error('Failed to connect wallet', error);
    });
});

document.getElementById('disconnectWallet').addEventListener('click', function() {
    connector.disconnect().then(() => {
        console.log('Wallet is disconnected');
        document.getElementById('walletInfo').innerHTML = 'Wallet is disconnected.';
        document.getElementById('connectWallet').style.display = 'inline-block';
        document.getElementById('disconnectWallet').style.display = 'none';
    }).catch((error) => {
        console.error('Failed to disconnect wallet', error);
    });
});
