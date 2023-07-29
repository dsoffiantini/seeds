import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Avatar, Spinner, Text } from "tamagui";

function User() {
  const { id } = useLocalSearchParams();

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch(
        `https://64c556b0c853c26efadabe1e.mockapi.io/users/${id}`
      );
      return await response.json();
    },
  });

  if (isLoading) {
    return <Spinner size="large" color="$green10" />;
  }

  if (error) {
    return <Text>Whoops there was an error!</Text>;
  }

  return (
    <>
      <Text>Hello From User Page - User ID {user.id}</Text>
      <Avatar circular size="$16">
        <Avatar.Image src={user.avatar} />
        <Avatar.Fallback bc="red" />
      </Avatar>
    </>
  );
}

export default User;
