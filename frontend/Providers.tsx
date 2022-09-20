import * as React from "react";
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import { WalletConnectProviderProps } from "@walletconnect/react-native-dapp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import { DmwWeb3Provider } from "./constans/DmwWeb3Provider";
import * as eva from "@eva-design/eva";

import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "react-native";

interface ProvidersProps {
  readonly children: JSX.Element;
}
const walletConnectOptions: WalletConnectProviderProps = {
  storageOptions: {
    // @ts-ignore
    asyncStorage: AsyncStorage,
  },
  qrcodeModalOptions: {
    mobileLinks: [
      "rainbow",
      "metamask",
      "argent",
      "trust",
      "imtoken",
      "pillar",
    ],
  },
  // Uncomment to show a QR-code to connect a wallet
  //renderQrcodeModal: Qrcode,
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <WalletConnectProvider {...walletConnectOptions}>
      <DmwWeb3Provider>
        <PaperProvider>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            {children}
          </NavigationContainer>
        </PaperProvider>
      </DmwWeb3Provider>
    </WalletConnectProvider>
  );
};
