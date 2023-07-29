import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Avatar, ListItem, Text } from "tamagui";
import { router } from "expo-router";

interface User {
  id: string;
  bio: string;
  avatar: string;
  createdAt: string;
  name: string;
}

export default function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(
        "https://64c556b0c853c26efadabe1e.mockapi.io/users"
      );
      const data: User[] = await response.json();
      console.log(data);
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <ListItem
            onPress={() => router.push(`/users/${item.id}`)}
            icon={
              <Avatar circular size="$6">
                <Avatar.Image src={item.avatar} />
                <Avatar.Fallback bc="red" />
              </Avatar>
            }
            title={item.name}
            subTitle={item.bio}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
