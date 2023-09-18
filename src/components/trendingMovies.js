import React from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../api/movieDB";

var { width, height } = Dimensions.get("window");

function TrendingMovies({ data }) {
  const navigation = useNavigation();
  const handleClickImage = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      <Carousel
        firstItem={1}
        inactiveSlideOpacity={0.68}
        sliderWidth={width}
        itemWidth={width * 0.62}
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClickImage} />
        )}
        slideStyle={{ display: "flex", alignItems: "center",  }}
      />
    </View>
  );
}

export default TrendingMovies;

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{
          uri: image500(item.poster_path)
        }}
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};
