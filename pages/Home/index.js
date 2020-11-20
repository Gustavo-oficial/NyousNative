import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import ItemEvento from '../../components/Evento';
import AsyncStorage from '@react-native-async-storage/async-storage';

  const Home = () => {

    const [token, setToken] = useState('');

    const getToken = async () => {
        setToken(await AsyncStorage.getItem('@jwt'));
    }

    useEffect(()=>{
        getToken();
    }, [])


    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        listarEventos();
    },[])

    const listarEventos = () => {
        fetch(`http://172.28.48.1:5000/api/Eventos`)
        .then(response => response.json())
        .then(dados => {
            setEventos(dados.data);
            console.log(dados.data);
        })
        .catch(err => console.error(err));
    }

    const renderItem = (evento) => {
        return (
            <ItemEvento 
                nome={evento.item.nome} 
                imagem={evento.item.urlImagem}
                link={evento.item.link} />
        )
    }   

      return(
          <View>
              <Text>Home</Text>

           <FlatList 
                data={eventos}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
          </View>
      )
  }

  export default Home;