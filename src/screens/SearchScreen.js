import { useNavigation } from "@react-navigation/native";
import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { fallbackMoviePoster, image185, searchMovies } from "../api/movieDB";
import Loading from "../components/Loading";

const { width, height } = Dimensions.get("window");

function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchMovies = value => {
    if (value && value.length > 2) {
        setLoading(true)
        searchMovies({
            query: value,
            include_adult: "false",
            language: "en-US",
            page:"1"
        }).then(data => {
            setLoading(false)
            if (data && data.results) setResults(data.results)
        })
    }else{
        setLoading(false);
        setResults([])
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearchMovies,400),[])

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      {/** Search input */}
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
        onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon color="white" size="20" />
        </TouchableOpacity>
      </View>
      {/** Result */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results: ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.push("Movie", item)}
              >
                <View className="space-y-2 mb-4">
                  <Image
                    className="rounded-3xl"
                    // source={require("../assets/images/moviePoster7.jpeg")}
                    source={{
                        uri: image185(item?.poster_path) || fallbackMoviePoster
                    }}
                    style={{ width: width * 0.44, height: height * 0.3 }}
                  />
                  <Text className="text-neutral-400 ml-1">
                    {item?.title.length > 227
                      ? item?.title.slice(0, 22) + "..."
                      : item?.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            className="h-96 w-96"
            source={require("../assets/images/movieTime1.png")}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export default SearchScreen;
