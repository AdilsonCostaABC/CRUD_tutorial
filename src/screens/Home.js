import * as React from 'react';
import * as RN from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { database } from '../config/fb';
import { collection,onSnapshot, orderBy,query, QuerySnapshot } from 'firebase/firestore';
import Product from '../components/Product';



export default function Home(){
    const navigation=useNavigation();
    const [products,setProducts]=React.useState([]);
    
    React.useLayoutEffect(()=> {

        navigation.setOptions({
           headerRight:()=><RN.Button title='Add' onPress={()=>navigation.navigate('Add')}/>
        })
   
    },[]);

    React.useEffect(()=>{
           const collectionRef=collection(database,'products');
           const q=query(collectionRef,orderBy('createAt','desc'));

            const unsuscribe=onSnapshot(q,querySnapshot=>{
                setProducts(
                    querySnapshot.docs.map(doc=>({
                        id:doc.id,
                        emoji:doc.data().emoji,
                        name:doc.data().name,
                        price:doc.data().price,
                        isSold:doc.data().isSold,
                        createAt:doc.data().createAt,
                    })
                    )
                    
                )})
            return unsuscribe;
    },[])
    return(
        <RN.View>
            <RN.Text style={styles.title}>Products</RN.Text>
            {products.map(product => <Product key={product.id} {...product}/>)}
        </RN.View>
        
    )
}

const styles=RN.StyleSheet.create({
    title:{
           fontSize:20,
           fontWeight:'bold',     
    },
})