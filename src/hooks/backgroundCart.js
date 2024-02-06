// import { useState, useEffect, useContext } from 'react';


// import { PostAddToCart } from '../api/cart';
// import CartContext from '../context/cart';
// import { useMutation } from 'react-query';
// import { useAppState } from './appStateManagement';



// function useAddToCartInBackground() {
    
//     const AppState = useAppState();

//     const { cartItems, setCartItems } = useContext(CartContext)


//     const [mutate, postsubrefetch] = useMutation({
//         mutationKey: 'addToCart_query',
//         mutationFn: PostAddToCart,
//         onSuccess: (data) => {
//             console.log('app called in background');
//             const myStructure = data?.data?.data?.product.map((res) => ({
//                 _id: res?._id,
//                 qty: res?.qty,
//                 unit_id: res?.unit?.id,
//                 varientname: res?.variant?.name,
//                 item: { ...res },
//             }));
//             setCartItems(myStructure);
//         },
//     });

//     useEffect(() => {
//         if (AppState === 'background') {
//             const updatedData = cartItems.map((item) => ({
//                 ...item.item,
//                 qty: item.qty,
//             }));
//             mutate({ product: updatedData });
//         }
//     }, [AppState, cartItems, mutate]);

//     return { cartItems, postsubrefetch };
// }

// export default useAddToCartInBackground;
