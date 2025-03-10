import { 
    View, Text, SafeAreaView, StyleSheet, StatusBar, ScrollView, 
    TouchableOpacity, Platform 
} from 'react-native';
import React, { useContext } from 'react';
import COLORS from '../../../const/color';
import { AuthContext } from '../../../context/AuthContext';
import ProfilFoto from './ProfilFoto';
import ButtonProfil from './ButtonProfil';

const Profil = ({ navigation }) => {
    const { logouts, permanentlyDelete } = useContext(AuthContext);

    const HandledLogout = () => logouts(navigation);
    const HandledDeleteUser = () => permanentlyDelete(navigation);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor={COLORS.transparent} />
            
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Profil</Text>
            </View>

            {/* Konten */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                <View style={styles.section}>
                    <ProfilFoto />
                </View>
                <View style={styles.section}>
                    <ButtonProfil />
                </View>
            </ScrollView>

            {/* Footer dengan tombol */}
            <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.btnDelete} onPress={HandledDeleteUser}>
                    <Text style={styles.btnText}>Hapus Akun</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnLogout} onPress={HandledLogout}>
                    <Text style={styles.btnText}>Keluar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        width: '100%',
        height: 50,
        backgroundColor: COLORS.white,
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 18,
        color: COLORS.dark,
        fontWeight: 'bold',
    },
    content: {
        flexGrow: 1, 
        paddingBottom: 100, // Tambahan padding agar tombol tidak tertutup saat scroll
    },
    section: {
        margin: 20,
    },
    footerContainer: {
        paddingHorizontal: 20,
        paddingBottom: Platform.OS === 'ios' ? 110 : 70, // Tambahkan padding ekstra untuk iOS
        backgroundColor: COLORS.white,
        borderTopColor: COLORS.secondgrey,
        borderTopWidth: 1,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        position: 'absolute', 
        bottom: 0, 
        width: '100%',
    },
    btnDelete: {
        width: '100%',
        height: 55,
        backgroundColor: COLORS.red,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnLogout: {
        width: '100%',
        height: 55,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Profil;
