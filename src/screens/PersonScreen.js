import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from "../api/movieDB";
import Loading from "../components/Loading";
import MovieList from "../components/MovieList";
import { styles, theme } from "../theme";

var { width, height } = Dimensions.get("window");

const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-3";

function PersonScreen(props) {
    const {params: item} = useRoute()
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [person, setPerson] = useState([]);
  const [loading, setLoading] = useState(true);

    const getPersonDetails = async (id) => {
        const data = await fetchPersonDetails(id);
        if (data) setPerson(data)
        setLoading(false)
    }

    const getPersonMovies = async (id) => {
        const data = await fetchPersonMovies(id);
        if (data && data.cast) setPersonMovies(data.cast) 
    }

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id)
    getPersonMovies(item.id)
  },[item])


  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/** Back and heart button */}
      <SafeAreaView
        className={
          "z-20 justify-between w-full items-center flex-row px-4" +
          verticalMargin
        }
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.background}
          className="rounded-xl p-1 ml-2"
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsFavourite(!isFavourite)}
          className="mr-2"
        >
          <HeartIcon
            size="35"
            color={isFavourite ? theme.background : "white"}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/** Person details */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            style={{
              shadowColor: "#808080", // Sử dụng màu gray hợp lệ
              shadowRadius: 10, // Giảm giá trị shadowRadius
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.5, // Sử dụng giá trị opacity hợp lệ
            }}
            className="flex-row justify-center"
          >
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500 ">
              <Image
                // source={require("../assets/castImages/test.png")}
                source={{
                    uri: image342(person?.profile_path) || fallbackPersonImage
                }}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>
          {/** Name and address */}
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
             {person?.name}
            </Text>
            <Text className="text-base text-neutral-500  text-center">
              {person?.place_of_birth}
            </Text>
          </View>
          {/**  Infomation  */}
          <View className="mx-3 mt-6 p-4 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">
                {
                    person?.gender === 1 ? "Female" : "Male"
                }
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">{person?.birthday}</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Known for</Text>
              <Text className="text-neutral-300 text-sm">{person?.known_for_department}</Text>
            </View>
            <View className=" px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">{person?.popularity?.toFixed(2)}%</Text>
            </View>
          </View>

          {/**  BIography  */}
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biographhy</Text>
            <Text className="text-neutral-400 tracking-wide">
              {
                person?.biography || "N/A"
              }
            </Text>
          </View>

          {/**  Movies  */}
          <MovieList title={"Movies"} hideSeeAll={true} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
}

export default PersonScreen;
