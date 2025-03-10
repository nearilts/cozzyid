import React from 'react';
import { View, StyleSheet, FlatList, Platform } from 'react-native';
import COLORS from '../../../const/color';
import ButtonCircle from './ButtonCircle';
import { useNavigation } from '@react-navigation/native';

const ButtomIcon = () => {
    const navigation = useNavigation();

    // Data tombol dengan kondisi platform
    const buttonData = [
        { id: '1', iconName: 'calendar-month', color: COLORS.navy, label: 'Hotel', onClick: 'Services' },
        { id: '2', iconName: 'shopping-cart', color: COLORS.darkGreen, label: 'Product', onClick: 'ListProduct' },
    ];

    if (Platform.OS === 'android') {
        buttonData.push(
            { id: '3', iconName: 'account-balance-wallet', color: COLORS.red, label: 'Top Up', onClick: 'TopUp' },
            { id: '4', iconName: 'paid', color: COLORS.orange, label: 'Bayar', onClick: 'BayarPpob' },
            { id: '5', iconName: 'sports-esports', color: COLORS.pink, label: 'Games', onClick: 'GamePpob' },
            { id: '6', iconName: 'confirmation-number', color: COLORS.darkBlue, label: 'Voucher', onClick: 'VoucherPpob' },
            { id: '7', iconName: 'book-online', color: COLORS.primary2, label: 'Tiket', onClick: 'Ticket' },
            { id: '8', iconName: 'apps', color: COLORS.gold, label: 'Semua', onClick: 'SemuaPpob' }
        );
    } else {
        buttonData.push(
            { id: '3', iconName: 'chat', color: COLORS.red, label: 'Chat', onClick: 'InboxScreen' },
            { id: '4', iconName: 'book-online', color: COLORS.orange, label: 'Checkin', onClick: 'CekInOnline' }
        );
    }

    // Fungsi untuk merender item dalam FlatList
    const renderItem = ({ item }) => (
        <ButtonCircle
            iconName={item.iconName}
            color={item.color}
            onPress={() => {
                if (item.onClick) {
                    navigation.navigate(item.onClick);
                } else {
                    console.warn('Nama rute tidak ditemukan:', item.label);
                }
            }}
            label={item.label}
        />
    );

    return (
        <View style={{ alignItems: 'center' }}>
            <FlatList
                data={buttonData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={4}
                columnWrapperStyle={styles.row}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        justifyContent: 'space-between',
    },
});

export default ButtomIcon;
