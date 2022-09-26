import * as React from 'react';
import WalletConnectProvider from '@walletconnect/react-native-dapp';
import { WalletConnectProviderProps } from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { DmwWeb3Provider } from './DmwWeb3/DmwWeb3Provider';
import * as eva from '@eva-design/eva';
import { DmwWalletProvider } from './DmwWallet/DmwWalletProvider'
interface ProvidersProps {
    readonly children: JSX.Element;
}
const walletConnectOptions: WalletConnectProviderProps = {
    storageOptions: {
        // @ts-ignore
        asyncStorage: AsyncStorage,
    },
    clientMeta: {
        description: 'Connect to DMW',
        url: 'https://walletconnect.org',
        icons: ['https://walletconnect.org/walletconnect-logo.png'],
        name: 'DMW',
    },
    qrcodeModalOptions: {
        mobileLinks: [
            'rainbow',
            'metamask',
            'argent',
            'trust',
            'imtoken',
            'pillar',
        ],
    },
    // Uncomment to show a QR-code to connect a wallet
    //renderQrcodeModal: Qrcode,
};


export const Providers = ({ children }: ProvidersProps) => {
    return (
        < WalletConnectProvider {...walletConnectOptions}>
            <DmwWeb3Provider>
                <DmwWalletProvider>
                    <ApplicationProvider {...eva} theme={eva.light}>
                        {children}
                    </ApplicationProvider>
                </DmwWalletProvider>
            </DmwWeb3Provider>
        </WalletConnectProvider>
    )
}
