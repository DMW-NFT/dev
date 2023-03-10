import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, Provider, Text } from 'react-native-paper';
import { useTranslation } from "react-i18next";
const CheckDialog = (props) => {
    const { t, i18n } = useTranslation();
    const [visible, setVisible] = useState(props.visible)

    const comfirmed = () => {
        props.setConfirmed(true)
    };

    const hideDialog = () => props.setVisible(false);

    return (

        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>{props.title}</Dialog.Title>
                <Dialog.Content>
                    <Text >{props.content}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>{t("取消")}</Button>
                    <Button onPress={comfirmed}>{t("确认")}</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>

    );
};

export default CheckDialog;