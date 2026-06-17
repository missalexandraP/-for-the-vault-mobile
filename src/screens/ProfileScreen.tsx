import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';
import { useAuth } from '../store/AuthContext';
import { LogOut, User, Shield, Package } from 'lucide-react-native';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const MenuItem = ({ icon: Icon, label, onPress }: any) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Icon color={COLORS.deepOnyx} size={20} />
      <Text style={styles.menuLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <User color={COLORS.champagneGold} size={40} />
        </View>
        <Text style={styles.userName}>{user?.full_name || 'Vault Member'}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
        
        {user?.is_verified && (
          <View style={styles.verifiedBadge}>
            <Shield color={COLORS.success} size={14} />
            <Text style={styles.verifiedText}>VERIFIED MEMBER</Text>
          </View>
        )}
      </View>

      <View style={styles.menu}>
        <MenuItem icon={Package} label="My Reservations" onPress={() => {}} />
        <MenuItem icon={Shield} label="Identity & Trust" onPress={() => {}} />
        <MenuItem icon={LogOut} label="Log Out" onPress={logout} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.version}>The Vault v1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ivoryCream,
  },
  header: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.pureWhite,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.champagneGold,
  },
  userName: {
    fontFamily: FONTS.heading,
    fontSize: 24,
    color: COLORS.deepOnyx,
  },
  userEmail: {
    fontFamily: FONTS.body,
    fontSize: 14,
    color: COLORS.softSlate,
    marginTop: 4,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: SPACING.md,
  },
  verifiedText: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 10,
    color: COLORS.success,
    marginLeft: 6,
    letterSpacing: 1,
  },
  menu: {
    padding: SPACING.xl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.03)',
  },
  menuLabel: {
    fontFamily: FONTS.bodyMedium,
    fontSize: 16,
    color: COLORS.deepOnyx,
    marginLeft: 16,
  },
  footer: {
    position: 'absolute',
    bottom: SPACING.xl,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  version: {
    fontFamily: FONTS.body,
    fontSize: 12,
    color: COLORS.softSlate,
    opacity: 0.5,
  },
});
