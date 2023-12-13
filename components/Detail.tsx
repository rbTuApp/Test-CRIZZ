import { ActivityIndicator, BackHandler, Image, StyleSheet } from 'react-native';
import { Text, View } from './Themed';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MoviesContext } from '../utils/context';
function useBackButton(handler: any) {
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handler)

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handler)
        }

    }, [handler])
    return true; // This will prevent the regular handling of the back button
}
export default function Detail({ movie, goBack }: any) {
    const { setFavorites, favorites, deleteFavorites } = useContext(MoviesContext);

    function backButtonHandler(): any {
        goBack()
        return true;
    }
    useBackButton(backButtonHandler)
    const isFavorite = favorites.find((f: any) => f.id === movie.id);

    return (
        <ScrollView style={{ padding: 8 }}>
            <View>
                <Text style={{ textAlign: "center", fontSize: 25, marginBottom: 5, fontWeight: "800" }}>{movie.title}</Text>
                <Image style={{ borderRadius: 20, marginVertical: 20 }} source={{ uri: "http://image.tmdb.org/t/p/w500/" + movie.poster_path }} height={200} />
                <Text style={{ fontSize: 18, marginBottom: 8 }}>Descripcion: {movie.overview}</Text>
                <Text style={{ fontSize: 18, marginBottom: 8 }}>Puntuacion: {movie.vote_average}</Text>
                <Text style={{ fontSize: 18, marginBottom: 5 }}>Fecha de lanzamiento: {movie.release_date}</Text>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => goBack()} style={{ backgroundColor: "white", padding: 5, borderRadius: 8 }}>
                        <Text style={{ color: "black", fontSize: 18 }}>Volver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => !isFavorite ? setFavorites(movie) : deleteFavorites(movie)} style={{ marginLeft: 15, padding: 2, paddingHorizontal: 4, borderRadius: 8, borderWidth: 1, borderColor: "white" }}>
                        <Icon name={isFavorite ? 'cards-heart' : "cards-heart-outline"} color={"white"} size={25} />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}