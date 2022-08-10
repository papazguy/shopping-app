import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CategoriesPreview from "../categories-preview/categories-preview.component"
import Category from '../category/category.component'; 
import "./shop.styles.scss";
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategories } from '../../store/categories/categories.action';
const Shop = () => {
  const dispatch = useDispatch();
    //any async thing you need to do in a useEffect, wrap it into an async function
    useEffect(() =>{
      //addCollectionAndDocuments('categories', SHOP_DATA);
     const getCategories = async () => {
      const categoriesArray = await getCategoriesAndDocuments();
      dispatch(setCategories(categoriesArray));
     } 
     getCategories();

     
    },[])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;