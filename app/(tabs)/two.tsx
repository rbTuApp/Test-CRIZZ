import { ActivityIndicator, Image, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../../components/Themed';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Detail from '../../components/Detail';
import { MoviesContext } from '../../utils/context';

export default function Movies() {
  const { favorites } = useContext(MoviesContext)
  const [detail, setDetail] = useState(null);
  if (detail) {
    return (
      <Detail movie={detail} goBack={() => setDetail(null)} />
    )
  }
  return (
    <ScrollView>
      <View>
        {favorites.length < 1 ? (
          <View style={{marginTop: "75%", justifyContent: "center", alignItems: "center"}}>
            <Text style={{ textAlign: "center", fontSize: 16 }}>No tienes ningun favorito hasta ahora</Text>
          </View>
        ) : favorites.map((m: any) => (
          <TouchableOpacity onPress={() => {
            setDetail(m)
          }} style={{ padding: 10, paddingBottom: 20, borderRadius: 20, borderColor: "#fff", borderWidth: 2, marginBottom: 20 }}>
            <Text style={{ textAlign: "center", fontSize: 25, marginBottom: 5, fontWeight: "800" }}>{m.title}</Text>
            <Image source={{ uri: "http://image.tmdb.org/t/p/w500/" + m.poster_path }} height={200} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}