import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;

const card = () => (
  <Card style={styles.tarjeta}>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    <Card.Content>
      <Text variant="titleLarge">Título de la tarjeta</Text>
      <Text variant="bodyMedium">Contenido de ejemplo</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button onPress={() => console.log('Cancelado')}>Cancel</Button>
      <Button onPress={() => console.log('Aceptado')}>Ok</Button>
    </Card.Actions>
  </Card>
);

export default card;

const styles = StyleSheet.create({
  tarjeta: {
    margin: 16,
    elevation: 4,
    borderRadius: 12,
  },
});
