import { ActivityIndicator, Image, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../../components/Themed';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Detail from '../../components/Detail';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [err, setErr] = useState(false);
  const [detail, setDetail] = useState(null);
  const getMovies = async () => {
    setLoading(true)
    try {

      if (filter === "") {
        const datos = await axios.get("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-ES&page=1&sort_by=popularity.desc", {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjdmZDIyZWNiMGE4M2JlMjQ1ZjYwZWEzMDU3M2UzMSIsInN1YiI6IjY1NzlmZmQwZTkzZTk1MjE4ZGNjYTRkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9JBIJaB6JcmgD38m5EeTCwuQfDH9b0774AiCt00QpkE'
          }
        })
        setMovies(datos.data.results);
        setLoading(false)
      } else {
        const datos = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${filter}&include_adult=false&language=es-ES&page=1`, {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjdmZDIyZWNiMGE4M2JlMjQ1ZjYwZWEzMDU3M2UzMSIsInN1YiI6IjY1NzlmZmQwZTkzZTk1MjE4ZGNjYTRkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9JBIJaB6JcmgD38m5EeTCwuQfDH9b0774AiCt00QpkE'
          }
        })
        setMovies(datos.data.results);
        setLoading(false)
      }
    } catch (err) {
      setErr(true)
      console.log(err)
    }
  }
  useEffect(() => {
    getMovies()
  }, [])
  if (loading) return (
    <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
      <ActivityIndicator size="large" />
    </View>
  )
  if (detail) {
    return (
      <Detail movie={detail} goBack={() => setDetail(null)} />
    )
  }
  return (
    <ScrollView>
      <View>
        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20, marginBottom: 20 }}>

          <TextInput
            maxFontSizeMultiplier={1}
            placeholder="Ingrese titulo a buscar"
            value={filter}
            onChangeText={ev => setFilter(ev)}
            style={{
              borderWidth: 1,
              width: 180,
              textAlign: 'center',
              padding: 0,
              height: 40,
              borderRadius: 30,
              color: "white",
              marginBottom: 8,
              borderColor: "white",
            }}
            placeholderTextColor={"white"}
          />
          <TouchableOpacity onPress={() => getMovies()} style={{ backgroundColor: "white", padding: 5, borderRadius: 8 }}>
            <Text style={{ color: "black", fontSize: 18 }}>Buscar</Text>
          </TouchableOpacity>
        </View>
        {err ? (
          <Text style={{textAlign: "center", fontSize: 16}}>Ha ocurrido un error con la conexion a nuestro servidor</Text>
        ) : movies.length < 1 ? (
          <View>
            <Text style={{textAlign: "center", fontSize: 16}}>No hemos encontrado ninguna pelicula con el titulo solicitado</Text>
          </View>
        ) : movies.map((m: any) => (
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