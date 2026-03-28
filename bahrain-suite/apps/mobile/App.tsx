import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

const cards = [
  'Front Desk Check-In/Check-Out',
  'Housekeeping Tasks',
  'Maintenance Tickets',
  'Expense Capture',
  'Utility Bill Upload',
  'Approvals',
  'Notifications',
];

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            marginBottom: 20,
          }}
        >
          <Image
            source={require('./assets/app-icon.png')}
            style={{ width: 44, height: 44, borderRadius: 12 }}
            accessibilityLabel="Axtella"
          />
          <Text style={{ fontSize: 22, fontWeight: '700', color: '#114A9F' }}>
            Axtella Mobile
          </Text>
        </View>
        {cards.map((item) => (
          <View key={item} style={{ padding: 16, borderWidth: 1, borderColor: '#ddd', borderRadius: 12, marginBottom: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>{item}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
