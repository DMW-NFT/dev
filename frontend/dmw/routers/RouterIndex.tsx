import { Text, StyleSheet, View, SafeAreaView, ScrollView, Image, FlatList, TouchableWithoutFeedback } from 'react-native'
import React, { Component,useEffect,useState,useContext } from 'react'
import { connect } from 'react-redux'
import Routers from "./routers";
import StackNavigator from "./StackNavigator";
import Api from '../Request/http';
import { setMaxListeners } from 'events';
import { useDmwLogin } from '../../loginProvider/constans/DmwLoginProvider';

const mapStateToProps = state => {
    return {
        isLogin: state.Login.isLogin
    }
}

// async function FN() {
//     let a = await api.GetStorage()
//     initState['isLogin'] = a ? true : false
//     console.log(initState['isLogin']);
// }

const RouterIndex = (props) => {
    const {isLogin,setIsLogin,login,logOut} = useDmwLogin()
    // const api = new Api();
    // const [a,setA]  = useState()

    // const getA = async () =>{
    //     let a = await api.GetStorage()
    //     console.log(a,"fuck")
    //     // setA(a)
    // }
    
    
    // useEffect( () => {
        
    // },[])
    return (

        <>
            {isLogin ? <Routers /> : <StackNavigator />}
        </>
    )
}
// class RouterIndex extends Component {

//     const [a,setA] = useState()
//     useEffect ( () => {
//         setMaxListeners(api.ge)
//     },[])
//     render() {
//         return (
//             <>
//                 {
//                     this.props.isLogin ? <Routers /> : <StackNavigator />
//                 }

//             </>
//         )
//     }
// }
export default connect(mapStateToProps)(RouterIndex)