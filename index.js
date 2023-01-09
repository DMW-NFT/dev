/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */

// This file has been auto-generated by Ξ create-react-native-dapp Ξ.
// Feel free to modify it, but please take care to maintain the exact
// procedure listed between /* dapp-begin */ and /* dapp-end */, as
// this will help persist a known template for future migrations.

/* dapp-begin */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// 自編語言包

import jp from './languages/jp.json'
import zh from './languages/zh.json'
import en from './languages/en.json'

const resources = {
  jp: {
    translation: jp
  },
  zh: {
    translation: zh
  },
  en: {
    translation: en
  }
}

const { Platform, LogBox } = require('react-native');

if (Platform.OS !== 'web') {
  require('react-native-get-random-values');
  // LogBox.ignoreAllLogs(true)//关闭全部黄色警告
  LogBox.ignoreLogs(
    [
      "The provided value 'moz-chunked-arraybuffer' is not a valid 'responseType'.",
      "The provided value 'ms-stream' is not a valid 'responseType'.",
      "source.uri should not be an empty string",
      'Warning: Each child in a list should have a unique "key" prop.',
      "Got a component with the name 'str' for the screen"

    ],
  );
}

if (typeof Buffer === 'undefined') {
  global.Buffer = require('buffer').Buffer;
}

global.btoa = global.btoa || require('base-64').encode;
global.atob = global.atob || require('base-64').decode;

process.version = 'v9.40';

const { registerRootComponent, scheme } = require('expo');
const { default: App } = require('./App');

const { default: AsyncStorage } = require('@react-native-async-storage/async-storage');
const { withWalletConnect } = require('@walletconnect/react-native-dapp');

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(withWalletConnect(App, {
  redirectUrl: Platform.OS === 'web' ? window.location.origin : `${scheme}://`,
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
}));
/* dapp-end */


i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3', // 对安卓进行兼容
    resources,
    fallbackLng: 'jp', // 默认语言，也是设置语言时设置了不存在的语言时使用的
    interpolation: {
      escapeValue: false
    }
  }, (err) => {
    // 錯誤
    if (err) throw err;
    // 这里放多一层函数是为了方便之后切换语言的同时做一些其他的统一处理
    i18n.setLocalLanguage = function (value) {
      // 設置項目文本的語言
      this.changeLanguage(value);
      // 做点别的，比如同时切换别的插件的语言
    }
    // 初始化
    i18n.setLocalLanguage(i18n.language);
  });

 
 // 关闭全部黄色警告


export default i18n;
