import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

import { useNavigation } from "@react-navigation/native";

import Logo from "../assets/logo.svg";

export function Header() {
  const { navigate } = useNavigation();

  return (
    <View className="w-full flex-row items-center justify-between">
      <Logo />

      <TouchableOpacity
        activeOpacity={0.7}
        className="h-11 px-4 flex-row items-center border border-violet-500 rounded-lg"
        onPress={() => navigate("new")}
      >
        <Feather name="plus" color={colors.violet[500]} size={20} />
        <Text className=" ml-3 text-white font-semibold leading-tight">
          Novo
        </Text>
      </TouchableOpacity>
    </View>
  );
}
