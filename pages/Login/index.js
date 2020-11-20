import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

  const Login = ( {navigation} ) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const salvar = async (value) => {
        try {
          await AsyncStorage.setItem('@jwt', value)
        } catch (e) {

        }
      }

    const logar = () => {
         const inputs = {
             email : email,
             sneha : senha
         }
        fetch('http://172.28.48.1:5000/api/Account/Login', {
           method: 'POST',
           headers :{
               'Content-Type' : 'application/json'
           },
           body : JSON.stringify(inputs)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status !== 404){
                alert('Welcome!');
                console.log(data.token);
                salvar(data.token);
                navigation.push('Autenticacao');
            }else{
                alert('Dados invalidos');  
            }
        }) 
    }

      return(
          <View style={styles.container}>
            
            <Image
                style={styles.logo}
                source={{
                    uri: 'https://raw.githubusercontent.com/sena-code/React-Node/main/4%20-%20Trabalhando%20com%20react-bootstrap%20e%20react-router-dom/nyous-react/src/assets/img/Logo.svg',
                }}
            />

              <Text>Email</Text>
              <TextInput
               style={styles.input}
               onChangeText={text => setEmail(text)}
               value={email}
               placeholder="Digite seu email"
             />

             
            <Text>Senha</Text>
              <TextInput
               style={styles.input}
               onChangeText={text => setSenha(text)}
               value={senha}
               secureTextEntry={true}
               placeholder="Digite sua senha"
            />
             <TouchableOpacity
                style={styles.button}
                onPress={logar}
            >
            <Text styles={styles.textButton}>Logar</Text>
           </TouchableOpacity>
          </View>
      )
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
     
    },
    input : {
        height: 40,
        color : 'white',
        width : '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 22
    },
    button : {
        alignItems: "center",
        backgroundColor: "green",
        padding: 10,
        borderRadius: 6,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton : {
        color: 'white'
    }, 
     logo : {
      width: 200,
      height: 200,
     }
  });
  export default Login;